import React, { useState } from 'react';
import { X, ThumbsUp } from 'lucide-react';

export interface FaceoffBattleModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

/**
 * FaceoffBattleModal - In-post card placed directly on top of the profile pic attached to its post.
 * Features:
 * - "Who looks Hotter between me Freda pepper or this loser Slimy sticky"
 * - WINNER (Red) vs LOSER (Blue)
 * - Preference estimate
 * - Freda 52.0% | 0:00:00 | 48.0% Heather
 * - Red & Blue Voting Buttons with live Likes / Dislikes counters
 * - Split Progress Bar (Red vs Blue)
 * - Bottom double yellow lines with upward triangle
 */
export function FaceoffBattleModal({
  isOpen = true,
  onClose,
  className = '',
}: FaceoffBattleModalProps) {
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

  return (
    <div
      className={`w-full max-w-[420px] bg-white rounded-2xl shadow-sm border border-slate-200/90 p-3.5 sm:p-4 relative select-none animate-in fade-in duration-150 ${className}`}
    >
      {/* Optional Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
          title="Close faceoff card"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>
      )}

      {/* 1. Header Question */}
      <h2 className="text-[14px] sm:text-[15px] font-black text-slate-900 leading-snug tracking-tight pr-6">
        Who looks Hotter between me Freda pepper or this loser Slimy sticky
      </h2>

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
        {/* Freda Left */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            alt="Freda Da. pepper"
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

        {/* Heather Right */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[13.5px] sm:text-[14.5px] font-black text-slate-900 tabular-nums">
            {bluePct.toFixed(1)}%
          </span>
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
            alt="Heather Slime"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shadow-2xs ring-1 ring-slate-200"
          />
        </div>
      </div>

      {/* 5. Names Row */}
      <div className="flex items-center justify-between mt-1 px-0.5 text-[11px] font-bold text-slate-900">
        <span>Freda Da. pepper</span>
        <span>Heather Slime</span>
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
          title="Vote for Freda (Red)"
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
          title="Vote for Heather (Blue)"
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

        {/* Upward yellow triangle pointer */}
        <div
          className="absolute -top-[5.5px] -translate-x-1/2 pointer-events-none transition-all duration-300"
          style={{ left: `${redPct}%` }}
        >
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[9px] border-b-[#F5C21B]" />
        </div>
      </div>
    </div>
  );
}

export default FaceoffBattleModal;
