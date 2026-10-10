import React, { useState } from 'react';
import { X, ThumbsUp, Send } from 'lucide-react';

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

/**
 * Adverb Mode - Challenge the person.
 * Styled to look exactly like the broken pencil / verb faceoff feature card,
 * with the question, WINNER vs LOSER, preference estimate, avatars, voting bars,
 * double yellow lines, plus writing area to challenge the person online and submit!
 */
export const ChallengePostModal: React.FC<ChallengePostModalProps> = ({
  isOpen,
  onClose,
  onPublishChallenge,
  opponentName,
  opponentHandle = '@opponent',
  opponentAvatar = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  currentUser = {
    name: 'Freda Da. pepper',
    handle: '@freda_pepper',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
}) => {
  const [battleQuestion, setBattleQuestion] = useState(
    `Who looks Hotter between me ${currentUser.name} or this loser ${opponentName}`
  );
  const [captionText, setCaptionText] = useState(
    `I am officially challenging ${opponentName} to an online fight! Cast your votes on who wins this battle! 🔥⚔️`
  );

  const [userVote, setUserVote] = useState<'red' | 'blue' | null>(null);
  const [likes, setLikes] = useState<number>(234095);
  const [dislikes, setDislikes] = useState<number>(90000);
  const [redPct, setRedPct] = useState<number>(52.0);
  const [bluePct, setBluePct] = useState<number>(48.0);

  if (!isOpen) return null;

  const handleVote = (side: 'red' | 'blue') => {
    if (userVote === side) {
      setUserVote(null);
      if (side === 'red') {
        setLikes((prev) => Math.max(234095, prev - 1));
      } else {
        setDislikes((prev) => Math.max(90000, prev - 1));
      }
      setRedPct(52.0);
      setBluePct(48.0);
    } else {
      if (side === 'red') {
        setLikes((prev) => prev + 1);
        if (userVote === 'blue') {
          setDislikes((prev) => Math.max(90000, prev - 1));
        }
        setRedPct(52.5);
        setBluePct(47.5);
      } else {
        setDislikes((prev) => prev + 1);
        if (userVote === 'red') {
          setLikes((prev) => Math.max(234095, prev - 1));
        }
        setRedPct(51.5);
        setBluePct(48.5);
      }
      setUserVote(side);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captionText.trim()) return;

    onPublishChallenge({
      caption: captionText.trim(),
      battleQuestion: battleQuestion.trim(),
      mediaUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80',
      tags: ['#brokenpencil', '#faceoff', '#onlinefight'],
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3.5 sm:p-4 relative select-none animate-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer z-10"
          aria-label="Close"
          title="Close"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Mode Tag */}
        <div className="inline-block px-2 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-black rounded-md mb-2 uppercase tracking-wide">
          Adverb &bull; Challenge Person Online
        </div>

        {/* 1. Header Question (Editable so you can write the challenge headline) */}
        <div className="pr-6">
          <input
            type="text"
            value={battleQuestion}
            onChange={(e) => setBattleQuestion(e.target.value)}
            className="w-full text-[14px] sm:text-[15px] font-black text-slate-900 leading-snug tracking-tight bg-slate-50/80 hover:bg-slate-100/80 focus:bg-white rounded-lg px-2 py-1 border border-slate-200 focus:border-purple-500 outline-none transition-colors"
            placeholder="Write challenge question..."
          />
        </div>

        {/* 2. WINNER vs LOSER Header */}
        <div className="flex items-center justify-between mt-2.5 mb-0.5">
          <span className="text-[20px] sm:text-[22px] font-black text-[#E51E2B] tracking-tight leading-none">
            WINNER
          </span>
          <span className="text-[20px] sm:text-[22px] font-black text-[#1D3D8F] tracking-tight leading-none">
            LOSER
          </span>
        </div>

        {/* 3. Sub-heading: Preference estimate */}
        <div className="text-[11.5px] font-extrabold text-slate-900 mb-1.5">
          Preference estimate
        </div>

        {/* 4. Faces & Percentages Row */}
        <div className="flex items-center justify-between px-0.5">
          {/* Challenger Left / Red */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shadow-2xs ring-1 ring-slate-200"
            />
            <span className="text-[13.5px] sm:text-[14.5px] font-black text-slate-900 tabular-nums">
              {redPct.toFixed(1)}%
            </span>
          </div>

          {/* Center Timer */}
          <div className="text-[12px] font-bold text-slate-900 tabular-nums px-1">
            0:00:00
          </div>

          {/* Opponent Right / Blue */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[13.5px] sm:text-[14.5px] font-black text-slate-900 tabular-nums">
              {bluePct.toFixed(1)}%
            </span>
            <img
              src={opponentAvatar}
              alt={opponentName}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shadow-2xs ring-1 ring-slate-200"
            />
          </div>
        </div>

        {/* 5. Names Row */}
        <div className="flex items-center justify-between mt-1 px-0.5 text-[11px] font-bold text-slate-900">
          <span>{currentUser.name}</span>
          <span>{opponentName}</span>
        </div>

        {/* 6. Interaction Row (Red button + Likes | Dislikes + Blue button) */}
        <div className="w-full flex items-center justify-between gap-2 mt-2.5">
          {/* Red Like Button */}
          <button
            type="button"
            onClick={() => handleVote('red')}
            className={`cursor-pointer w-[68px] sm:w-[74px] h-[33px] rounded-[9px] flex items-center justify-center transition-all active:scale-90 ${
              userVote === 'red'
                ? 'bg-[#E51E2B] ring-2 ring-red-400 ring-offset-1'
                : 'bg-[#E51E2B] hover:bg-[#D41825]'
            }`}
            title="Vote Red"
          >
            <ThumbsUp className="w-4.5 h-4.5 text-white fill-white" />
          </button>

          {/* Likes & Dislikes Counters */}
          <div className="flex items-center justify-center gap-2 shrink-0">
            <div className="text-center min-w-[50px]">
              <div className="text-[12px] sm:text-[12.5px] font-bold text-black tabular-nums leading-none">
                {likes.toLocaleString()}
              </div>
              <div className="text-[10px] font-medium text-slate-700 leading-tight mt-0.5">
                Likes
              </div>
            </div>

            <div className="w-[1px] h-6 bg-slate-300 shrink-0" />

            <div className="text-center min-w-[50px]">
              <div className="text-[12px] sm:text-[12.5px] font-bold text-black tabular-nums leading-none">
                {dislikes.toLocaleString()}
              </div>
              <div className="text-[10px] font-medium text-slate-700 leading-tight mt-0.5">
                Dislikes
              </div>
            </div>
          </div>

          {/* Blue Like Button */}
          <button
            type="button"
            onClick={() => handleVote('blue')}
            className={`cursor-pointer w-[68px] sm:w-[74px] h-[33px] rounded-[9px] flex items-center justify-center transition-all active:scale-90 ${
              userVote === 'blue'
                ? 'bg-[#1D3D8F] ring-2 ring-blue-400 ring-offset-1'
                : 'bg-[#1D3D8F] hover:bg-[#183275]'
            }`}
            title="Vote Blue"
          >
            <ThumbsUp className="w-4.5 h-4.5 text-white fill-white" />
          </button>
        </div>

        {/* 7. Split Color Progress Bar */}
        <div className="w-full mt-3">
          <div className="w-full flex items-center gap-[3px]">
            <div
              className="h-[6px] bg-[#E51E2B] rounded-full transition-all duration-300"
              style={{ width: `${redPct}%` }}
            />
            <div
              className="h-[6px] bg-[#1D3D8F] rounded-full transition-all duration-300"
              style={{ width: `${bluePct}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10.5px] font-bold mt-0.5 px-0.5">
            <span className="text-[#E51E2B]">Red</span>
            <span className="text-[#1D3D8F]">Blue</span>
          </div>
        </div>

        {/* 8. Bottom Double Yellow Line with Upward Triangle */}
        <div className="w-full mt-2.5 relative pt-1">
          <div className="w-full flex flex-col gap-[2.5px]">
            <div className="w-full h-[3px] bg-[#F5C21B] rounded-full" />
            <div className="w-full h-[3px] bg-[#F5C21B] rounded-full" />
          </div>

          <div
            className="absolute -top-[5.5px] -translate-x-1/2 pointer-events-none transition-all duration-300"
            style={{ left: `${redPct}%` }}
          >
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[9px] border-b-[#F5C21B]" />
          </div>
        </div>

        {/* 9. Writing & Post Creation for the Challenge */}
        <form onSubmit={handleSubmit} className="mt-4 pt-3 border-t border-slate-200/80">
          <label className="block text-[11px] font-black text-slate-800 mb-1">
            Write your challenge post:
          </label>
          <textarea
            rows={2}
            value={captionText}
            onChange={(e) => setCaptionText(e.target.value)}
            placeholder="Write to challenge the person to a fight online..."
            className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-200 text-xs text-slate-900 outline-none resize-none leading-snug"
            required
          />

          <button
            type="submit"
            className="w-full mt-2.5 py-2.5 px-4 bg-[#E51E2B] hover:bg-[#D41825] active:scale-98 text-white font-black text-xs rounded-xl shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Challenge Post</span>
          </button>
        </form>
      </div>
    </div>
  );
};
