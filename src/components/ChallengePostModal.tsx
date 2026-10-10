import React, { useState } from 'react';
import {
  X,
  Swords,
  Sparkles,
  Flame,
  CheckCircle2,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { BrokenPencilIcon } from './BrokenPencilIcon';
import { FaceoffBattleModal } from './FaceoffBattleModal';

export interface ChallengePostPayload {
  caption: string;
  battleQuestion: string;
  mediaUrl: string;
  tags: string[];
  opponentName: string;
  opponentHandle: string;
  opponentAvatar: string;
  challengerName: string;
  challengerAvatar: string;
}

interface ChallengePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishChallenge: (payload: ChallengePostPayload) => void;
  opponentName: string;
  opponentHandle?: string;
  opponentAvatar?: string;
  currentUser?: {
    name: string;
    handle: string;
    avatar: string;
  };
}

const PRESET_CHALLENGE_TEMPLATES = [
  'Calling out for a head-to-head faceoff! Who really runs this arena? Cast your votes below! 🥊🔥',
  'Think you can outshine my craft? Putting our skills to the ultimate public vote right now. Let the battle begin!',
  'Online showdown challenge! Red vs Blue — the community decides the true winner today! ⚔️✨',
];

export const ChallengePostModal: React.FC<ChallengePostModalProps> = ({
  isOpen,
  onClose,
  onPublishChallenge,
  opponentName,
  opponentHandle = '@opponent',
  opponentAvatar = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  currentUser = {
    name: 'Elena Vance',
    handle: '@elena_aeri',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
}) => {
  const [battleQuestion, setBattleQuestion] = useState(
    `Who reigns supreme between ${currentUser.name} and ${opponentName}?`
  );
  const [caption, setCaption] = useState(
    `⚔️ Official Faceoff Challenge against ${opponentName} (${opponentHandle})! Who brings the better aesthetic and craft? Vote in the broken pencil battle card below!`
  );
  const [selectedTag, setSelectedTag] = useState('#faceoffbattle');
  const [selectedImage, setSelectedImage] = useState(
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim() || !battleQuestion.trim()) return;

    onPublishChallenge({
      caption,
      battleQuestion,
      mediaUrl: selectedImage,
      tags: ['#faceoffbattle', '#onlinefight', '#brokenpencil', selectedTag],
      opponentName,
      opponentHandle,
      opponentAvatar,
      challengerName: currentUser.name,
      challengerAvatar: currentUser.avatar,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[500px] max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden flex flex-col relative select-none animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-800 via-indigo-700 to-pink-600 px-4 py-3.5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
              <Swords className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-pink-200 flex items-center gap-1.5">
                <span>Adverb Mode</span>
                <span>&bull;</span>
                <span>Broken Pencil Challenge</span>
              </div>
              <h2 className="text-base font-black text-white leading-tight">
                Challenge {opponentName} to an Online Fight
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {/* Matchup Header Card */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-3.5 flex items-center justify-between shadow-xs">
            {/* Challenger (You) */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-[#E51E2B] shadow-sm"
                />
                <span className="absolute -bottom-1 -left-1 px-1.5 py-0.2 bg-[#E51E2B] text-white text-[9px] font-black rounded-md uppercase">
                  RED
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-red-300 uppercase tracking-wider block">
                  Challenger (You)
                </span>
                <span className="text-xs font-black text-white leading-tight block">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {currentUser.handle}
                </span>
              </div>
            </div>

            {/* VS Badge */}
            <div className="px-2.5 py-1 rounded-xl bg-white/10 border border-white/20 flex flex-col items-center">
              <span className="text-[11px] font-black text-amber-300">VS</span>
              <span className="text-[9px] font-bold text-slate-300">FIGHT</span>
            </div>

            {/* Opponent */}
            <div className="flex items-center gap-2.5 flex-row-reverse text-right">
              <div className="relative">
                <img
                  src={opponentAvatar}
                  alt={opponentName}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-[#1D3D8F] shadow-sm"
                />
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-[#1D3D8F] text-white text-[9px] font-black rounded-md uppercase">
                  BLUE
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">
                  Challenged
                </span>
                <span className="text-xs font-black text-white leading-tight block">
                  {opponentName}
                </span>
                <span className="text-[10px] text-slate-400">
                  {opponentHandle}
                </span>
              </div>
            </div>
          </div>

          {/* Broken Pencil Battle Question Field */}
          <div>
            <label className="text-[12px] font-black text-slate-900 flex items-center justify-between mb-1">
              <span className="flex items-center gap-1.5">
                <BrokenPencilIcon className="w-5 h-auto" />
                <span>Battle Question / Stakes</span>
              </span>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                Broken Pencil Card Title
              </span>
            </label>
            <input
              type="text"
              value={battleQuestion}
              onChange={(e) => setBattleQuestion(e.target.value)}
              placeholder="e.g. Who looks Hotter between me or this loser?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-xs font-bold text-slate-900 transition-all outline-none"
              required
            />
          </div>

          {/* Post Caption / Writing Area */}
          <div>
            <label className="text-[12px] font-black text-slate-900 flex items-center justify-between mb-1">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                <span>Challenge Post Caption</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400">
                Writing your challenge
              </span>
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write your public callout to challenge this person online..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 text-xs font-medium text-slate-900 transition-all outline-none resize-none"
              required
            />

            {/* Quick preset templates */}
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {PRESET_CHALLENGE_TEMPLATES.map((tmpl, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCaption(tmpl)}
                  className="text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-800 transition-colors cursor-pointer text-left line-clamp-1"
                >
                  Template #{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Integrated Live Preview of Broken Pencil Feature */}
          <div className="border border-purple-200/90 rounded-2xl p-3 bg-purple-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center p-0.5">
                  <BrokenPencilIcon className="w-4 h-auto" />
                </div>
                <span className="text-[11.5px] font-black text-purple-950">
                  Live Broken Pencil Card Preview
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-500">
                Attached to post on submit
              </span>
            </div>

            <div className="w-full flex justify-center pt-1">
              <FaceoffBattleModal
                battleQuestion={battleQuestion}
                redParticipant={{
                  name: currentUser.name,
                  avatar: currentUser.avatar,
                }}
                blueParticipant={{
                  name: opponentName,
                  avatar: opponentAvatar,
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-black text-sm tracking-wide shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
            >
              <Swords className="w-4.5 h-4.5 stroke-[2.5]" />
              <span>Submit Challenge Post & Start Battle</span>
            </button>
            <p className="text-center text-[10.5px] text-slate-500 font-medium mt-2">
              This post will be published to the feed with the interactive broken pencil card popped out ready for voting.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
