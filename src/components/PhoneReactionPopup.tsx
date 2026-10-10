import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export interface PhoneReactionWidgetProps {
  initialLikes?: number;
  initialDislikes?: number;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  postAuthor?: string;
}

/**
 * Pure Reaction Widget from user inspiration image:
 * - Red pill button at the left end
 * - Centered writing: 230,789 Likes | 90,099 Dislikes
 * - Blue pill button at the right end
 * - Wide double yellow horizontal line spanning across with upward yellow triangle
 */
export function PhoneReactionPopup({
  initialLikes = 230789,
  initialDislikes = 90099,
  className = '',
}: PhoneReactionWidgetProps) {
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [likes, setLikes] = useState<number>(initialLikes);
  const [dislikes, setDislikes] = useState<number>(initialDislikes);

  const handleVote = (type: 'like' | 'dislike') => {
    if (userVote === type) {
      setUserVote(null);
      if (type === 'like') {
        setLikes((prev) => Math.max(initialLikes, prev - 1));
      } else {
        setDislikes((prev) => Math.max(initialDislikes, prev - 1));
      }
    } else {
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

  return (
    <div className={`w-full max-w-[420px] mx-auto flex flex-col items-center select-none pt-0.5 pb-2 px-1 sm:px-2 ${className}`}>
      {/* Top row: Red Like button at left end, centered writing, Blue Dislike button at right end */}
      <div className="w-full flex items-center justify-between">
        {/* Red Like Button pushed towards the left end */}
        <button
          type="button"
          onClick={() => handleVote('like')}
          className={`cursor-pointer w-[76px] sm:w-[84px] h-[36px] rounded-[10px] flex items-center justify-center transition-transform active:scale-90 shrink-0 ${
            userVote === 'like' ? 'bg-[#E51E2B] ring-2 ring-red-400' : 'bg-[#E51E2B] hover:bg-[#D41825]'
          }`}
          title="Likes"
          aria-label="Like"
        >
          <ThumbsUp className="w-5 h-5 text-white fill-white" />
        </button>

        {/* Centered Writing: 230,789 Likes | 90,099 Dislikes */}
        <div className="flex-1 flex items-center justify-center gap-2.5 sm:gap-3.5 shrink-0 px-1">
          <div className="text-center min-w-[56px]">
            <div className="text-[14px] sm:text-[15px] font-bold text-black tabular-nums leading-none">
              {likes.toLocaleString()}
            </div>
            <div className="text-[11px] font-medium text-slate-700 leading-tight mt-0.5">
              Likes
            </div>
          </div>

          <div className="w-[1px] h-7 bg-slate-300 shrink-0" />

          <div className="text-center min-w-[56px]">
            <div className="text-[14px] sm:text-[15px] font-bold text-black tabular-nums leading-none">
              {dislikes.toLocaleString()}
            </div>
            <div className="text-[11px] font-medium text-slate-700 leading-tight mt-0.5">
              Dislikes
            </div>
          </div>
        </div>

        {/* Blue Dislike Button pushed towards the right end */}
        <button
          type="button"
          onClick={() => handleVote('dislike')}
          className={`cursor-pointer w-[76px] sm:w-[84px] h-[36px] rounded-[10px] flex items-center justify-center transition-transform active:scale-90 shrink-0 ${
            userVote === 'dislike' ? 'bg-[#1E3A8A] ring-2 ring-blue-400' : 'bg-[#1E3A8A] hover:bg-[#193278]'
          }`}
          title="Dislikes"
          aria-label="Dislike"
        >
          <ThumbsDown className="w-5 h-5 text-white fill-white" />
        </button>
      </div>

      {/* Yellow stuff: Increased width of the line, spanning wide under the buttons with upward yellow triangle */}
      <div className="w-full mt-2.5 relative">
        {/* Wide double yellow lines */}
        <div className="w-full flex flex-col gap-[2.5px]">
          <div className="w-full h-[3.5px] bg-[#F5C21B] rounded-full" />
          <div className="w-full h-[3.5px] bg-[#F5C21B] rounded-full" />
        </div>

        {/* Center upward yellow triangle indicator */}
        <div className="absolute left-1/2 -top-[8px] -translate-x-1/2 pointer-events-none">
          <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[10px] border-b-[#F5C21B]" />
        </div>
      </div>
    </div>
  );
}

export default PhoneReactionPopup;
