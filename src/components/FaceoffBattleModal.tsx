import React, { useState, useEffect } from 'react';
import { X, ThumbsUp } from 'lucide-react';

export interface FaceoffBattleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FaceoffBattleModal({ isOpen, onClose }: FaceoffBattleModalProps) {
  const [userVote, setUserVote] = useState<'red' | 'blue' | null>(null);
  const [likes, setLikes] = useState<number>(234095);
  const [dislikes, setDislikes] = useState<number>(90000);
  const [redPct, setRedPct] = useState<number>(52.0);
  const [bluePct, setBluePct] = useState<number>(48.0);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleVote = (side: 'red' | 'blue') => {
    if (userVote === side) {
      // Toggle off vote
      setUserVote(null);
      if (side === 'red') {
        setLikes((prev) => Math.max(234095, prev - 1));
      } else {
        setDislikes((prev) => Math.max(90000, prev - 1));
      }
      setRedPct(52.0);
      setBluePct(48.0);
    } else {
      // Cast or switch vote
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
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[340px] sm:max-w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4.5 relative animate-in zoom-in-95 duration-150"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* 1. Header Question */}
        <h2 className="text-[15px] sm:text-[16px] font-black text-slate-900 leading-snug tracking-tight pr-6">
          Who looks Hotter between me Freda pepper or this loser Slimy sticky
        </h2>

        {/* 2. WINNER vs LOSER Header */}
        <div className="flex items-center justify-between mt-3 mb-1">
          <span className="text-[22px] sm:text-[24px] font-black text-[#E51E2B] tracking-tight leading-none">
            WINNER
          </span>
          <span className="text-[22px] sm:text-[24px] font-black text-[#1D3D8F] tracking-tight leading-none">
            LOSER
          </span>
        </div>

        {/* 3. Sub-heading: Preference estimate */}
        <div className="text-[12px] font-extrabold text-slate-900 mb-2">
          Preference estimate
        </div>

        {/* 4. Faces & Percentages Row */}
        <div className="flex items-center justify-between px-1">
          {/* Freda Left */}
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Freda Da. pepper"
              className="w-10 h-10 rounded-full object-cover shadow-2xs ring-1 ring-slate-200"
            />
            <span className="text-[14px] sm:text-[15px] font-black text-slate-900 tabular-nums">
              {redPct.toFixed(1)}%
            </span>
          </div>

          {/* Center Timer */}
          <div className="text-[12.5px] font-bold text-slate-900 tabular-nums px-1">
            0:00:00
          </div>

          {/* Heather Right */}
          <div className="flex items-center gap-2">
            <span className="text-[14px] sm:text-[15px] font-black text-slate-900 tabular-nums">
              {bluePct.toFixed(1)}%
            </span>
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
              alt="Heather Slime"
              className="w-10 h-10 rounded-full object-cover shadow-2xs ring-1 ring-slate-200"
            />
          </div>
        </div>

        {/* 5. Names Row */}
        <div className="flex items-center justify-between mt-1 px-1 text-[11px] font-bold text-slate-900">
          <span>Freda Da. pepper</span>
          <span>Heather Slime</span>
        </div>

        {/* 6. Interaction Row (Red button + Likes | Dislikes + Blue button) */}
        <div className="w-full flex items-center justify-between gap-2 mt-3">
          {/* Red Like Button */}
          <button
            type="button"
            onClick={() => handleVote('red')}
            className={`cursor-pointer w-[72px] sm:w-[76px] h-[34px] rounded-[9px] flex items-center justify-center transition-all active:scale-90 ${
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
            <div className="text-center min-w-[52px]">
              <div className="text-[12.5px] font-bold text-black tabular-nums leading-none">
                {likes.toLocaleString()}
              </div>
              <div className="text-[10px] font-medium text-slate-700 leading-tight mt-0.5">
                Likes
              </div>
            </div>

            <div className="w-[1px] h-6 bg-slate-300 shrink-0" />

            <div className="text-center min-w-[52px]">
              <div className="text-[12.5px] font-bold text-black tabular-nums leading-none">
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
            className={`cursor-pointer w-[72px] sm:w-[76px] h-[34px] rounded-[9px] flex items-center justify-center transition-all active:scale-90 ${
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
        <div className="w-full mt-3.5">
          <div className="w-full flex items-center gap-[3px]">
            <div
              className="h-[6.5px] bg-[#E51E2B] rounded-full transition-all duration-300"
              style={{ width: `${redPct}%` }}
            />
            <div
              className="h-[6.5px] bg-[#1D3D8F] rounded-full transition-all duration-300"
              style={{ width: `${bluePct}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-bold mt-1 px-0.5">
            <span className="text-[#E51E2B]">Red</span>
            <span className="text-[#1D3D8F]">Blue</span>
          </div>
        </div>

        {/* 8. Bottom Double Yellow Line with Upward Triangle */}
        <div className="w-full mt-3 relative pt-1">
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
    </div>
  );
}

export default FaceoffBattleModal;
