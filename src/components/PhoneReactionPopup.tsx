import React, { useState, useEffect, useRef } from 'react';
import { X, ThumbsUp, ThumbsDown } from 'lucide-react';

export interface PhoneReactionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  postAuthor?: string;
  initialLikes?: number;
  initialDislikes?: number;
  className?: string;
}

export function PhoneReactionPopup({
  isOpen,
  onClose,
  initialLikes = 230789,
  initialDislikes = 90099,
  className = '',
}: PhoneReactionPopupProps) {
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [likes, setLikes] = useState<number>(initialLikes);
  const [dislikes, setDislikes] = useState<number>(initialDislikes);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Add listener slightly delayed to prevent triggering by the click that opened it
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 50);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleVote = (type: 'like' | 'dislike') => {
    if (userVote === type) {
      // Toggle off
      setUserVote(null);
      if (type === 'like') {
        setLikes((prev) => Math.max(initialLikes, prev - 1));
      } else {
        setDislikes((prev) => Math.max(initialDislikes, prev - 1));
      }
    } else {
      // Switch or new vote
      if (type === 'like') {
        setLikes((prev) => prev + 1);
        if (userVote === 'dislike') {
          setDislikes((prev) => Math.max(initialDislikes, prev - 1));
        }
      } else {
        setDislikes((prev) => prev + 1);
        if (userVote === 'like') {
          setLikes((prev) => Math.max(initialLikes, prev - 1));
        }
      }
      setUserVote(type);
    }
  };

  const totalVotes = likes + dislikes;
  const likeRatio = totalVotes > 0 ? (likes / totalVotes) * 100 : 50;

  return (
    <div
      ref={containerRef}
      role="tooltip"
      aria-label="Community Reaction Rating"
      onClick={(e) => e.stopPropagation()}
      className={`absolute left-0 bottom-[calc(100%+8px)] z-50 w-[278px] sm:w-[292px] bg-white rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3),0_8px_10px_-6px_rgba(0,0,0,0.2)] border border-slate-200/90 pt-2.5 pb-1 px-3 select-none animate-in fade-in zoom-in-95 duration-150 ${className}`}
    >
      {/* Top subtle close button */}
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-800 hover:bg-slate-900 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform active:scale-90"
        title="Close"
        aria-label="Close"
      >
        <X className="w-3 h-3 stroke-[2.5]" />
      </button>

      {/* Main Interaction Row matching user screenshot */}
      <div className="flex items-center justify-between gap-2">
        {/* Left: Red Like Button */}
        <button
          onClick={() => handleVote('like')}
          className={`cursor-pointer group w-[72px] sm:w-[76px] h-9 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-90 shadow-2xs shrink-0 ${
            userVote === 'like'
              ? 'bg-[#E51E2B] ring-2 ring-red-400 ring-offset-1 scale-102'
              : 'bg-[#E51E2B] hover:bg-[#D41825]'
          }`}
          title="Likes"
          aria-label="Thumbs up"
        >
          <ThumbsUp
            className={`w-5 h-5 text-white transition-transform group-active:scale-110 ${
              userVote === 'like' ? 'fill-white stroke-white' : 'stroke-[2.2]'
            }`}
          />
        </button>

        {/* Middle: Counters with Vertical Divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 shrink-0 px-0.5">
          {/* Likes count */}
          <div className="text-center min-w-[54px]">
            <div className="text-[13px] sm:text-[14px] font-black text-slate-900 tabular-nums leading-none">
              {likes.toLocaleString()}
            </div>
            <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-500 leading-tight mt-0.5">
              Likes
            </div>
          </div>

          {/* Thin vertical separator */}
          <div className="w-[1.2px] h-7 bg-slate-300 rounded-full shrink-0" />

          {/* Dislikes count */}
          <div className="text-center min-w-[54px]">
            <div className="text-[13px] sm:text-[14px] font-black text-slate-900 tabular-nums leading-none">
              {dislikes.toLocaleString()}
            </div>
            <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-500 leading-tight mt-0.5">
              Dislikes
            </div>
          </div>
        </div>

        {/* Right: Blue Dislike Button */}
        <button
          onClick={() => handleVote('dislike')}
          className={`cursor-pointer group w-[72px] sm:w-[76px] h-9 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-90 shadow-2xs shrink-0 ${
            userVote === 'dislike'
              ? 'bg-[#1E3A8A] ring-2 ring-blue-400 ring-offset-1 scale-102'
              : 'bg-[#1E3A8A] hover:bg-[#193278]'
          }`}
          title="Dislikes"
          aria-label="Thumbs down"
        >
          <ThumbsDown
            className={`w-5 h-5 text-white transition-transform group-active:scale-110 ${
              userVote === 'dislike' ? 'fill-white stroke-white' : 'stroke-[2.2]'
            }`}
          />
        </button>
      </div>

      {/* Bottom element: Double Yellow Line with Upward Triangle */}
      <div className="w-full mt-2 relative pb-1">
        {/* Double yellow lines */}
        <div className="w-full flex flex-col gap-[2px]">
          <div className="w-full h-[2.5px] bg-[#F5C21B] rounded-full" />
          <div className="w-full h-[2.5px] bg-[#F5C21B] rounded-full" />
        </div>

        {/* Center upward yellow triangle indicator */}
        <div
          className="absolute -top-[7px] -translate-x-1/2 transition-all duration-300 pointer-events-none"
          style={{
            // Keep centered on the separator or slightly dynamically responsive
            left: `${Math.min(65, Math.max(35, likeRatio))}%`,
          }}
        >
          <div
            className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[10px] border-b-[#F5C21B] filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]"
            title={`${likeRatio.toFixed(1)}% Ratio`}
          />
        </div>
      </div>
    </div>
  );
}
