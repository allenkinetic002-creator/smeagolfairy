import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AeriBattleThumbsUpIcon } from './AeriBattleThumbsUpIcon';

interface PastChallengeData {
  title: string;
  redParticipant: {
    name: string;
    avatar: string;
  };
  blueParticipant: {
    name: string;
    avatar: string;
  };
  likes: number;
  dislikes: number;
  redPct: number;
  bluePct: number;
  date: string;
}

interface PastChallengesModalProps {
  isOpen: boolean;
  onClose: () => void;
  personName: string;
  personAvatar?: string;
}

const SAMPLE_PAST_CHALLENGES: PastChallengeData[] = [
  {
    title: 'Who looks Hotter between me Freda pepper or this loser Slimy sticky',
    redParticipant: {
      name: 'Freda Da. pepper',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    blueParticipant: {
      name: 'Heather Slime',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    },
    likes: 234095,
    dislikes: 90000,
    redPct: 52.0,
    bluePct: 48.0,
    date: 'Previous Challenge &bull; Finished',
  },
  {
    title: 'Who has better aesthetics: Elena Rostova or Milo Sterling',
    redParticipant: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    blueParticipant: {
      name: 'Milo Sterling',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    likes: 184500,
    dislikes: 102000,
    redPct: 54.2,
    bluePct: 45.8,
    date: 'Previous Challenge &bull; Finished',
  },
];

/**
 * Verb Mode - Shows the person's past / previous challenge(s) in the exact
 * broken pencil feature card style.
 */
export const PastChallengesModal: React.FC<PastChallengesModalProps> = ({
  isOpen,
  onClose,
  personName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const current = SAMPLE_PAST_CHALLENGES[currentIndex] || SAMPLE_PAST_CHALLENGES[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3.5 sm:p-4 relative select-none animate-in zoom-in-95 duration-150"
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

        {/* Top Tag & Switcher */}
        <div className="flex items-center justify-between mb-2 pr-6">
          <div className="inline-block px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-black rounded-md uppercase tracking-wide">
            Verb &bull; Past Challenge ({currentIndex + 1}/{SAMPLE_PAST_CHALLENGES.length})
          </div>

          {SAMPLE_PAST_CHALLENGES.length > 1 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev > 0 ? prev - 1 : SAMPLE_PAST_CHALLENGES.length - 1
                  )
                }
                className="p-1 rounded-md hover:bg-slate-100 text-slate-600 cursor-pointer"
                title="Previous past challenge"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev < SAMPLE_PAST_CHALLENGES.length - 1 ? prev + 1 : 0
                  )
                }
                className="p-1 rounded-md hover:bg-slate-100 text-slate-600 cursor-pointer"
                title="Next past challenge"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* 1. Header Question */}
        <h2 className="text-[14px] sm:text-[15px] font-black text-slate-900 leading-snug tracking-tight pr-4">
          {current.title}
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
          {/* Winner Left / Red */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <img
              src={current.redParticipant.avatar}
              alt={current.redParticipant.name}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shadow-2xs ring-1 ring-slate-200"
            />
            <span className="text-[13.5px] sm:text-[14.5px] font-black text-slate-900 tabular-nums">
              {current.redPct.toFixed(1)}%
            </span>
          </div>

          {/* Center Timer */}
          <div className="text-[12px] font-bold text-slate-900 tabular-nums px-1">
            0:00:00
          </div>

          {/* Loser Right / Blue */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[13.5px] sm:text-[14.5px] font-black text-slate-900 tabular-nums">
              {current.bluePct.toFixed(1)}%
            </span>
            <img
              src={current.blueParticipant.avatar}
              alt={current.blueParticipant.name}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shadow-2xs ring-1 ring-slate-200"
            />
          </div>
        </div>

        {/* 5. Names Row */}
        <div className="flex items-center justify-between mt-1 px-0.5 text-[11px] font-bold text-slate-900">
          <span>{current.redParticipant.name}</span>
          <span>{current.blueParticipant.name}</span>
        </div>

        {/* 6. Interaction Row (Blue button + Likes | Dislikes + Red button) */}
        <div className="w-full flex items-center justify-between gap-2 mt-2.5">
          {/* Blue Like Button (switched to left, facing left) */}
          <button
            type="button"
            className="cursor-default w-[56px] sm:w-[62px] h-[28px] rounded-[8px] flex items-center justify-center bg-[#1D3D8F]"
          >
            <AeriBattleThumbsUpIcon className="w-3.5 h-3.5" contrastColor="#1D3D8F" facing="left" />
          </button>

          <div className="flex items-center justify-center gap-2 shrink-0">
            <div className="text-center min-w-[50px]">
              <div className="text-[12px] sm:text-[12.5px] font-bold text-black tabular-nums leading-none">
                {current.likes.toLocaleString()}
              </div>
              <div className="text-[10px] font-medium text-slate-700 leading-tight mt-0.5">
                Likes
              </div>
            </div>

            <div className="w-[1px] h-6 bg-slate-300 shrink-0" />

            <div className="text-center min-w-[50px]">
              <div className="text-[12px] sm:text-[12.5px] font-bold text-black tabular-nums leading-none">
                {current.dislikes.toLocaleString()}
              </div>
              <div className="text-[10px] font-medium text-slate-700 leading-tight mt-0.5">
                Dislikes
              </div>
            </div>
          </div>

          {/* Red Like Button (switched to right, facing right) */}
          <button
            type="button"
            className="cursor-default w-[56px] sm:w-[62px] h-[28px] rounded-[8px] flex items-center justify-center bg-[#E51E2B]"
          >
            <AeriBattleThumbsUpIcon className="w-3.5 h-3.5" contrastColor="#E51E2B" facing="right" />
          </button>
        </div>

        {/* 7. Split Color Progress Bar */}
        <div className="w-full mt-3">
          <div className="w-full flex items-center gap-[3px]">
            <div
              className="h-[6px] bg-[#E51E2B] rounded-full transition-all duration-300"
              style={{ width: `${current.redPct}%` }}
            />
            <div
              className="h-[6px] bg-[#1D3D8F] rounded-full transition-all duration-300"
              style={{ width: `${current.bluePct}%` }}
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
            style={{ left: `${current.redPct}%` }}
          >
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[9px] border-b-[#F5C21B]" />
          </div>
        </div>
      </div>
    </div>
  );
};
