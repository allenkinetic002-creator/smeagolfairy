import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Zap,
  Flame,
  MessageSquare,
  Search,
  X,
  Filter,
  ThumbsUp,
  ThumbsDown,
  FileCheck,
  Plus,
} from 'lucide-react';
import {
  SharedPerson,
  INITIAL_SHARED_PEOPLE,
  loadSharedPeople,
  saveSharedPeople,
  loadSharedTimers,
  saveSharedTimers,
  FIVE_HOURS_MS,
} from '../data/sharedPeople';
import { TrustReceipt, loadTrustReceipts } from '../data/trustReceipts';
import { TrustReceiptsView } from './TrustReceiptsView';
import { CreateTrustReceiptModal } from './CreateTrustReceiptModal';

export type Person = SharedPerson;

export interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

interface MatchesScreenProps {
  onBackToFeed: () => void;
}

export function MatchesScreen({ onBackToFeed }: MatchesScreenProps) {
  // People list state (paired directly with chat screen)
  const [people, setPeople] = useState<SharedPerson[]>(() => loadSharedPeople());

  // Timers state: Map of personId -> startedAt (timestamp in ms, synchronized across both screens)
  const [timers, setTimers] = useState<Record<string, number>>(() => loadSharedTimers());

  // Listen to cross-screen live synchronization
  useEffect(() => {
    const handleSync = () => {
      const updatedPeople = loadSharedPeople();
      setPeople((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(updatedPeople)) return prev;
        return updatedPeople;
      });
      const updatedTimers = loadSharedTimers();
      setTimers((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(updatedTimers)) return prev;
        return updatedTimers;
      });
    };
    window.addEventListener('vibe_shared_sync', handleSync);
    return () => window.removeEventListener('vibe_shared_sync', handleSync);
  }, []);

  // Chats state: Map of personId -> ChatMessage[]
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>(() => {
    const initialHistories: Record<string, ChatMessage[]> = {};
    const loadedPeople = loadSharedPeople();
    loadedPeople.forEach((p) => {
      if (p.messages && p.messages.length > 0) {
        initialHistories[p.id] = p.messages;
      }
    });
    return initialHistories;
  });

  // Active navigation: null = Matches List, personId = Chat Screen with that person
  const [activeChatPersonId, setActiveChatPersonId] = useState<string | null>(null);

  // Time's up modal state
  const [showTimesUpDialog, setShowTimesUpDialog] = useState(false);
  const [dialogPerson, setDialogPerson] = useState<SharedPerson | null>(null);

  // Live timer tick state (updates every 1 second)
  const [now, setNow] = useState<number>(Date.now());
  const [inputMessage, setInputMessage] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const lastActiveChatIdRef = useRef<string | null>(null);
  const lastMsgCountRef = useRef<number>(0);

  // Search & Filter state for matches
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'high' | 'chatting'>('all');

  // Score feedback toast state
  const [scoreToast, setScoreToast] = useState<{
    type: 'good' | 'bad';
    message: string;
  } | null>(null);

  // Sub-tab: 'matches' or 'receipts'
  const [matchScreenTab, setMatchScreenTab] = useState<'matches' | 'receipts'>('matches');

  // Trust Receipt creation modal
  const [showCreateReceiptModal, setShowCreateReceiptModal] = useState(false);
  const [createReceiptPersonId, setCreateReceiptPersonId] = useState<string | null>(null);
  const [createReceiptQuote, setCreateReceiptQuote] = useState<string>('');
  const [trustReceiptsCount, setTrustReceiptsCount] = useState<number>(() => loadTrustReceipts().length);

  // Sync receipts count across components
  useEffect(() => {
    const handleReceiptsSync = () => {
      setTrustReceiptsCount(loadTrustReceipts().length);
    };
    window.addEventListener('fairy_receipts_sync', handleReceiptsSync);
    return () => window.removeEventListener('fairy_receipts_sync', handleReceiptsSync);
  }, []);

  const handleOpenCreateReceiptForPerson = (personId: string, quote?: string) => {
    setCreateReceiptPersonId(personId);
    setCreateReceiptQuote(quote || '');
    setShowCreateReceiptModal(true);
  };

  useEffect(() => {
    if (scoreToast) {
      const t = setTimeout(() => setScoreToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [scoreToast]);

  // 1-second interval for countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check if active chat has expired timer
  useEffect(() => {
    if (!activeChatPersonId) return;

    const startedAt = timers[activeChatPersonId];
    if (startedAt) {
      const remainingMs = startedAt + FIVE_HOURS_MS - now;
      if (remainingMs <= 0 && !showTimesUpDialog) {
        const p = people.find((item) => item.id === activeChatPersonId);
        if (p) {
          setDialogPerson(p);
          setShowTimesUpDialog(true);
        }
      }
    }
  }, [now, activeChatPersonId, timers, people, showTimesUpDialog]);

  // Scroll to bottom only when chat is opened or a new message arrives (allows free scrolling up)
  useEffect(() => {
    if (!activeChatPersonId) return;
    const msgs = chatHistories[activeChatPersonId] || [];
    const isNewChat = lastActiveChatIdRef.current !== activeChatPersonId;
    const isNewMessage = msgs.length > lastMsgCountRef.current;

    if (isNewChat || isNewMessage) {
      lastActiveChatIdRef.current = activeChatPersonId;
      lastMsgCountRef.current = msgs.length;
      chatBottomRef.current?.scrollIntoView({ behavior: isNewChat ? 'auto' : 'smooth' });
    }
  }, [activeChatPersonId, chatHistories]);

  // Handle open chat & start timer
  const handleOpenChat = (person: Person) => {
    // 1. Starting the timer
    // The first time opening a given person's chat, start 5-hour countdown.
    // Reopening the same chat must NOT reset the timer.
    setTimers((prev) => {
      if (prev[person.id]) {
        return prev;
      }
      const next = {
        ...prev,
        [person.id]: Date.now(),
      };
      saveSharedTimers(next);
      return next;
    });

    // Seed default chat messages if first time opening
    if (!chatHistories[person.id]) {
      const initialMsgs: ChatMessage[] = (person.messages && person.messages.length > 0)
        ? person.messages
        : [
            {
              id: `msg-${person.id}-0`,
              sender: 'them',
              text: 'Hey! Nice to connect.',
              time: 'Just now',
            },
          ];
      setChatHistories((prev) => ({
        ...prev,
        [person.id]: initialMsgs,
      }));
    }

    // Check if 5 hours already passed while app was closed
    const existingStart = timers[person.id];
    if (existingStart && existingStart + FIVE_HOURS_MS - Date.now() <= 0) {
      setDialogPerson(person);
      setShowTimesUpDialog(true);
    }

    setActiveChatPersonId(person.id);
  };

  // Helper to format remaining time HH:MM:SS
  const getRemainingTimeFormatted = (personId: string): string => {
    const startedAt = timers[personId];
    if (!startedAt) return '05:00:00';
    const remainingMs = Math.max(0, startedAt + FIVE_HOURS_MS - now);
    const totalSecs = Math.floor(remainingMs / 1000);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Check if person has active timer running
  const hasActiveTimer = (personId: string): boolean => {
    const startedAt = timers[personId];
    if (!startedAt) return false;
    return startedAt + FIVE_HOURS_MS - now > 0;
  };

  // Good reply action:
  // ADD to their score (+5%, max 100%), increase approval, clear timer, stay in chat
  const handleGoodReply = (customTargetId?: string) => {
    const targetId = customTargetId || dialogPerson?.id || activeChatPersonId;
    if (!targetId) return;
    const targetPerson = people.find((p) => p.id === targetId);
    if (!targetPerson) return;
    const oldPercent = targetPerson.percent;
    const newPercent = Math.min(100, oldPercent + 5);

    // Update score in people list
    const updatedPeople = people.map((p) => {
      if (p.id === targetId) {
        const currentAppr = parseInt(p.approval.replace('+', '')) || 50;
        return {
          ...p,
          percent: newPercent,
          matchPercent: newPercent,
          approval: `${currentAppr + 1}+`,
        };
      }
      return p;
    });
    setPeople(updatedPeople);
    saveSharedPeople(updatedPeople);

    // Clear timer
    const updatedTimers = { ...timers };
    delete updatedTimers[targetId];
    setTimers(updatedTimers);
    saveSharedTimers(updatedTimers);

    // Show score added feedback toast
    setScoreToast({
      type: 'good',
      message: `Score Boosted! +5% ADDED to ${targetPerson.name} (${oldPercent}% → ${newPercent}%)`,
    });

    // Add celebration message to chat
    setChatHistories((prev) => ({
      ...prev,
      [targetId]: [
        ...(prev[targetId] || []),
        {
          id: `good-${Date.now()}`,
          sender: 'them',
          text: `Good reply! 🌟 Match score ADDED by +5% (${oldPercent}% → ${newPercent}%). Let's keep collaborating!`,
          time: 'Just now',
        },
      ],
    }));

    setShowTimesUpDialog(false);
    setDialogPerson(null);
  };

  // Bad reply action:
  // SUBTRACT from their score (-50%, min 0%), decrease approval, clear timer
  const handleBadReply = (customTargetId?: string) => {
    const targetId = customTargetId || dialogPerson?.id || activeChatPersonId;
    if (!targetId) return;
    const targetPerson = people.find((p) => p.id === targetId);
    if (!targetPerson) return;
    const oldPercent = targetPerson.percent;
    const newPercent = Math.max(0, oldPercent - 50);

    // Subtract score in people list
    const updatedPeople = people.map((p) => {
      if (p.id === targetId) {
        const currentAppr = Math.max(0, parseInt(p.approval.replace('+', '')) - 1) || 20;
        return {
          ...p,
          percent: newPercent,
          matchPercent: newPercent,
          approval: `${currentAppr}+`,
        };
      }
      return p;
    });
    setPeople(updatedPeople);
    saveSharedPeople(updatedPeople);

    // Clear timer
    const updatedTimers = { ...timers };
    delete updatedTimers[targetId];
    setTimers(updatedTimers);
    saveSharedTimers(updatedTimers);

    // Show score subtracted feedback toast
    setScoreToast({
      type: 'bad',
      message: `Score Penalized! -50% SUBTRACTED from ${targetPerson.name} (${oldPercent}% → ${newPercent}%)`,
    });

    // Add penalty message to chat
    setChatHistories((prev) => ({
      ...prev,
      [targetId]: [
        ...(prev[targetId] || []),
        {
          id: `bad-${Date.now()}`,
          sender: 'them',
          text: `Bad reply rated. ⚠️ Match score SUBTRACTED by -50% (${oldPercent}% → ${newPercent}%).`,
          time: 'Just now',
        },
      ],
    }));

    setShowTimesUpDialog(false);
    setDialogPerson(null);
  };

  // Fast-forward / Test Timer trigger
  const handleTestExpireTimer = (personId: string) => {
    const expiredTimers = {
      ...timers,
      [personId]: Date.now() - FIVE_HOURS_MS - 1000,
    };
    setTimers(expiredTimers);
    saveSharedTimers(expiredTimers);

    const p = people.find((item) => item.id === personId);
    if (p) {
      setDialogPerson(p);
      setShowTimesUpDialog(true);
    }
  };

  // Send message in chat
  const handleSendMessage = () => {
    if (!inputMessage.trim() || !activeChatPersonId) return;
    const newMsg: ChatMessage = {
      id: `my-${Date.now()}`,
      sender: 'me',
      text: inputMessage.trim(),
      time: 'Just now',
    };
    setChatHistories((prev) => ({
      ...prev,
      [activeChatPersonId]: [...(prev[activeChatPersonId] || []), newMsg],
    }));
    setInputMessage('');

    // Simulate reply after 1.5s
    setTimeout(() => {
      const replies = [
        'Totally agree! Let’s code this out.',
        'Brilliant concept. I’m pushing a commit to review now.',
        'Sounds like a vibe! What libraries are you pulling in?',
        'Super clean! Let’s sync up on the next sprint.',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setChatHistories((prev) => ({
        ...prev,
        [activeChatPersonId]: [
          ...(prev[activeChatPersonId] || []),
          {
            id: `reply-${Date.now()}`,
            sender: 'them',
            text: randomReply,
            time: 'Just now',
          },
        ],
      }));
    }, 1200);
  };

  // Reset people list if emptied
  const handleResetPeople = () => {
    setPeople(INITIAL_SHARED_PEOPLE);
    setTimers({});
    setChatHistories({});
    saveSharedPeople(INITIAL_SHARED_PEOPLE);
    saveSharedTimers({});
  };

  const activePerson = people.find((p) => p.id === activeChatPersonId);

  // =========================================================================
  // VIEW: CHAT SCREEN
  // =========================================================================
  if (activeChatPersonId && activePerson) {
    const isTimerActive = hasActiveTimer(activePerson.id);
    const countdown = getRemainingTimeFormatted(activePerson.id);

    return (
      <div className="w-full h-full flex flex-col bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans">
        {/* Toast notification inside chat */}
        {scoreToast && (
          <div
            className={`w-full px-4 py-2 text-xs font-bold flex items-center justify-between z-20 shadow-xs animate-in slide-in-from-top-2 duration-200 ${
              scoreToast.type === 'good'
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              {scoreToast.type === 'good' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{scoreToast.message}</span>
            </div>
            <button
              onClick={() => setScoreToast(null)}
              className="text-white/80 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Chat App Bar (Material 3 style) */}
        <header className="w-full bg-white border-b border-slate-200/80 px-4 py-3 flex items-center justify-between shrink-0 shadow-xs z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveChatPersonId(null)}
              className="p-1.5 -ml-1 rounded-full text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Back to matches list"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full ${activePerson.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-xs overflow-hidden`}
              >
                {activePerson.avatarUrl ? (
                  <img
                    src={activePerson.avatarUrl}
                    alt={activePerson.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  activePerson.avatarInitial
                )}
              </div>
              {isTimerActive && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-200 animate-pulse" />
              )}
            </div>
            <div className="leading-tight">
              <h2 className="font-extrabold text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>{activePerson.name}</span>
                <span
                  className={`text-[10px] font-black px-1.5 py-0.5 rounded-full transition-all ${
                    activePerson.percent >= 50
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                  title="Match rating percentage"
                >
                  {activePerson.percent}%
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Vibe coder &middot; {activePerson.city}
              </p>
            </div>
          </div>

          {/* Right: Live Timer Badge & Simulate Zero trigger */}
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider shadow-2xs border ${
                isTimerActive
                  ? 'bg-amber-50 text-amber-900 border-amber-200/80 animate-pulse'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title="5-hour reply countdown"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
              <span>{countdown}</span>
            </div>

            {/* End Timer Lightning Trigger */}
            <button
              onClick={() => handleTestExpireTimer(activePerson.id)}
              className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-[10px] font-extrabold rounded-full transition-all flex items-center gap-1 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              title="End timer (fast-forward to 0 to trigger Good/Bad reply popup)"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400 animate-pulse" />
              <span>End Timer</span>
            </button>

            {/* Create Trust Receipt Button in Chat */}
            <button
              onClick={() => handleOpenCreateReceiptForPerson(activePerson.id)}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-extrabold rounded-full transition-all flex items-center gap-1 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              title="Record a commitment from this chat into a Trust Receipt"
            >
              <FileCheck className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Trust Receipt</span>
            </button>
          </div>
        </header>

        {/* Chat message stream */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 overscroll-contain touch-pan-y">
          <div className="text-center my-2">
            <span className="inline-block px-3 py-1 bg-slate-200/70 text-slate-600 text-[10px] font-semibold rounded-full">
              5-hour reply window active &middot; Reply on time!
            </span>
          </div>

          {(chatHistories[activePerson.id] || []).map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs font-medium leading-relaxed shadow-xs ${
                  msg.sender === 'me'
                    ? 'bg-black text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200/70 rounded-bl-xs'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.time}</span>
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="bg-white border-t border-slate-200 p-3 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 max-w-2xl mx-auto"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Message ${activePerson.name}...`}
              className="flex-1 bg-slate-100 rounded-full px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="w-9 h-9 rounded-full bg-black hover:bg-slate-800 text-white flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Time's Up Dialog */}
        {renderTimesUpDialog()}
      </div>
    );
  }

  // Computed filtered list for search & chips
  const filteredPeople = people.filter((person) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      person.name.toLowerCase().includes(query) ||
      person.city.toLowerCase().includes(query) ||
      'vibe coder'.includes(query);

    if (!matchesSearch) return false;

    if (selectedFilter === 'high') {
      return person.percent >= 80;
    }
    if (selectedFilter === 'chatting') {
      return hasActiveTimer(person.id);
    }
    return true;
  });

  // =========================================================================
  // VIEW: MATCHES LIST SCREEN ("See for your matches")
  // =========================================================================
  return (
    <div className="w-full h-full flex flex-col bg-white text-slate-900 overflow-hidden font-sans select-none">
      {/* Score Notification Toast Banner */}
      {scoreToast && (
        <div
          className={`w-full px-4 py-2 text-xs font-black flex items-center justify-between text-white shrink-0 shadow-md animate-in slide-in-from-top duration-200 z-30 ${
            scoreToast.type === 'good' ? 'bg-emerald-600' : 'bg-rose-600'
          }`}
        >
          <div className="flex items-center gap-2">
            {scoreToast.type === 'good' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            <span>{scoreToast.message}</span>
          </div>
          <button
            onClick={() => setScoreToast(null)}
            className="text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Material 3 App Bar with SafeArea */}
      <header className="w-full px-4 pt-3 pb-2.5 bg-white border-b border-slate-100 flex items-center justify-between shrink-0 shadow-2xs z-10">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBackToFeed}
            className="p-1.5 -ml-1 rounded-full text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Back to Fairy feed"
            title="Back to Fairy Feed"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-900 leading-none">
              See for your matches
            </h1>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              5-hour reply countdown &middot; Vibe coder community
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {people.length < INITIAL_SHARED_PEOPLE.length && (
            <button
              onClick={handleResetPeople}
              className="px-2.5 py-1 text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
              title="Reset removed people"
            >
              <RotateCcw className="w-3 h-3" />
              Reset List
            </button>
          )}
          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-extrabold rounded-full">
            {filteredPeople.length} / {people.length}
          </span>
        </div>
      </header>

      {/* Sub-tab switcher: Matches vs Trust Receipts */}
      <div className="w-full bg-slate-50 border-b border-slate-200/80 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl">
          <button
            onClick={() => setMatchScreenTab('matches')}
            className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              matchScreenTab === 'matches'
                ? 'bg-black text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Matches</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                matchScreenTab === 'matches' ? 'bg-white/20 text-white' : 'bg-slate-300 text-slate-700'
              }`}
            >
              {filteredPeople.length}
            </span>
          </button>

          <button
            onClick={() => setMatchScreenTab('receipts')}
            className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              matchScreenTab === 'receipts'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Trust Receipts</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                matchScreenTab === 'receipts'
                  ? 'bg-white/20 text-white'
                  : 'bg-purple-100 text-purple-900'
              }`}
            >
              {trustReceiptsCount}
            </span>
          </button>
        </div>

        <button
          onClick={() => {
            setCreateReceiptPersonId(null);
            setCreateReceiptQuote('');
            setShowCreateReceiptModal(true);
          }}
          className="px-3 py-1.5 bg-black hover:bg-slate-800 text-white text-[11px] font-extrabold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 text-amber-400" />
          <span>New Receipt</span>
        </button>
      </div>

      {matchScreenTab === 'receipts' ? (
        <TrustReceiptsView
          availablePeople={people}
          onOpenCreateModal={() => {
            setCreateReceiptPersonId(null);
            setCreateReceiptQuote('');
            setShowCreateReceiptModal(true);
          }}
          onOpenCreateModalForPerson={(personId) => {
            handleOpenCreateReceiptForPerson(personId);
          }}
          onOpenChatWithPerson={(personId) => {
            setMatchScreenTab('matches');
            setActiveChatPersonId(personId);
          }}
          onBackToMatches={() => setMatchScreenTab('matches')}
        />
      ) : (
        <>
          {/* Search Bar for Matches Screen */}
          <div className="px-4 pt-2.5 pb-2 bg-white border-b border-slate-100 shrink-0 space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search matches by name or city (e.g. San Francisco, Berlin)..."
            className="w-full bg-slate-100 rounded-full pl-9 pr-9 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 text-[10.5px]">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer shrink-0 ${
              selectedFilter === 'all'
                ? 'bg-black text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({people.length})
          </button>
          <button
            onClick={() => setSelectedFilter('high')}
            className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1 ${
              selectedFilter === 'high'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Top Ratings (&ge;80%)</span>
          </button>
          <button
            onClick={() => setSelectedFilter('chatting')}
            className={`px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1 ${
              selectedFilter === 'chatting'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Clock className="w-2.5 h-2.5" />
            <span>Chatting (Active)</span>
          </button>
        </div>
      </div>

      {/* Main List Area (SafeArea container) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-thin">
        {people.length === 0 ? (
          /* Empty State: "No one left" in center of list screen */
          <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3 text-2xl shadow-inner">
              ✨
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-1">
              No one left
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mb-4">
              All matches have been evaluated or removed after the 5-hour reply timer.
            </p>
            <button
              onClick={handleResetPeople}
              className="px-4 py-2 bg-black hover:bg-slate-800 text-white font-bold text-xs rounded-full shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restore Matches
            </button>
          </div>
        ) : filteredPeople.length === 0 ? (
          /* Search Empty State */
          <div className="h-full min-h-[250px] flex flex-col items-center justify-center text-center p-6">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3 text-xl shadow-inner">
              <Search className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              No matches found
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mb-4">
              No results found for "{searchQuery}". Try searching for another name or city.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-full transition-colors cursor-pointer"
            >
              Clear Search & Filters
            </button>
          </div>
        ) : (
          filteredPeople.map((person) => {
            const isChatting = hasActiveTimer(person.id);
            const isGreenPercent = person.percent >= 50;

            return (
              <div
                key={person.id}
                className="w-full bg-white rounded-2xl p-3 border border-slate-100 shadow-xs hover:border-slate-300 transition-all flex items-center justify-between gap-3"
              >
                {/* Left: Circular Avatar & Details */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-full ${person.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs overflow-hidden`}
                  >
                    {person.avatarUrl ? (
                      <img
                        src={person.avatarUrl}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      person.avatarInitial
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-sm text-slate-900 truncate leading-tight">
                      {person.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-semibold mt-0.5">
                      Vibe coder
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium truncate">
                      {person.city}
                    </p>
                  </div>
                </div>

                {/* Right: Match Percentage (NO 'Match' word!), Approval, and Button */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Match percentage: green, or red if under 50% - REMOVED the word 'Match' */}
                  <div className="flex flex-col items-end">
                    <span
                      className={`text-xs font-black px-2 py-0.5 rounded-full ${
                        isGreenPercent
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                      title={`${person.percent}% rating`}
                    >
                      {person.percent}%
                    </span>
                    {/* Approval count (e.g. '54+') */}
                    <span className="text-[10px] text-slate-400 font-bold mt-1">
                      {person.approval}
                    </span>
                  </div>

                  {/* Create Trust Receipt button on person card */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenCreateReceiptForPerson(person.id);
                    }}
                    className="p-2 rounded-full bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 text-xs font-bold transition-all flex items-center justify-center cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
                    title={`Create Trust Receipt with ${person.name}`}
                  >
                    <FileCheck className="w-4 h-4 text-amber-600" />
                  </button>

                  {/* Black pill button: 'Message' or 'Chatting' */}
                  <button
                    onClick={() => handleOpenChat(person)}
                    className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all active:scale-95 cursor-pointer shadow-xs ${
                      isChatting
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-300 flex items-center gap-1.5'
                        : 'bg-black hover:bg-slate-800 text-white'
                    }`}
                  >
                    {isChatting ? (
                      <>
                        <Clock className="w-3 h-3 text-emerald-200 animate-spin-slow" />
                        Chatting
                      </>
                    ) : (
                      'Message'
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
        </>
      )}

      {/* Create Trust Receipt Modal */}
      <CreateTrustReceiptModal
        isOpen={showCreateReceiptModal}
        onClose={() => setShowCreateReceiptModal(false)}
        availablePeople={people}
        initialPersonId={createReceiptPersonId}
        initialQuote={createReceiptQuote}
        onReceiptCreated={(r) => {
          setScoreToast({
            type: 'good',
            message: `Trust Receipt #${r.receiptNumber} issued to ${r.promiserName}! Awaiting acknowledgement.`,
          });
          setMatchScreenTab('receipts');
        }}
      />

      {/* Render Time's Up Dialog if triggered on list view */}
      {renderTimesUpDialog()}
    </div>
  );

  // =========================================================================
  // TIME'S UP DIALOG
  // Centered dialog, dimmed barrier, white card, radius ~20, soft shadow, barrierDismissible: false
  // Title: "Time's up!"
  // Text: "How was [name]'s reply?"
  // Two full-width buttons:
  // - "Good reply" (green): keep person, clear timer, stay in chat
  // - "Bad reply" (red): REMOVE that person completely, clear timer, navigate to list
  // =========================================================================
  function renderTimesUpDialog() {
    if (!showTimesUpDialog || !dialogPerson) return null;

    return (
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowTimesUpDialog(false);
            setDialogPerson(null);
          }
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      >
        <div
          role="dialog"
          aria-modal="true"
          className="w-full max-w-[340px] bg-white rounded-[20px] p-6 shadow-2xl text-center border border-slate-100 transform transition-all scale-100"
        >
          {/* Dismiss button */}
          <button
            onClick={() => {
              setShowTimesUpDialog(false);
              setDialogPerson(null);
            }}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Icon */}
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">
            Time's up!
          </h3>

          {/* Text */}
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            How was <strong className="text-slate-900 font-extrabold">{dialogPerson.name}</strong>'s reply?
          </p>

          {/* Current Score vs Expected Outcome */}
          <div className="mb-5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-around text-xs">
            <div>
              <span className="text-slate-400 block text-[9.5px] font-bold">CURRENT</span>
              <span className="font-black text-slate-900 text-sm">{dialogPerson.percent}%</span>
            </div>
            <div className="text-slate-300 font-bold">&rarr;</div>
            <div>
              <span className="text-emerald-600 block text-[9.5px] font-bold">GOOD (+5% ADD)</span>
              <span className="font-black text-emerald-700 text-sm">{Math.min(100, dialogPerson.percent + 5)}%</span>
            </div>
            <div className="text-slate-300 font-bold">&middot;</div>
            <div>
              <span className="text-rose-600 block text-[9.5px] font-bold">BAD (-50% SUBTRACT)</span>
              <span className="font-black text-rose-700 text-sm">{Math.max(0, dialogPerson.percent - 50)}%</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            {/* Good reply (green) - adds +5% score */}
            <button
              onClick={() => handleGoodReply(dialogPerson.id)}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Good reply (+5% Score ADDED)</span>
            </button>

            {/* Bad reply (red) - subtracts -50% score */}
            <button
              onClick={() => handleBadReply(dialogPerson.id)}
              className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-extrabold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              <span>Bad reply (-50% Score SUBTRACTED)</span>
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => {
                setShowTimesUpDialog(false);
                setDialogPerson(null);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-extrabold text-sm transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
