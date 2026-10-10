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
 * Only:
 * - Red pill button with white thumbs up
 * - 230,789 Likes | 90,099 Dislikes
 * - Blue pill button with white thumbs down
 * - Double yellow horizontal lines with upward yellow triangle in center
 * No modals, no popover boxes, no extra borders.
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
    <div className={`w-full max-w-[310px] mx-auto flex flex-col items-center select-none py-1.5 px-2 ${className}`}>
      {/* Top row: Red Like button, writing (Likes | Dislikes), Blue Dislike button */}
      <div className="w-full flex items-center justify-between gap-2.5">
        {/* Red Like Button with Thumbs Up */}
        <button
          type="button"
          onClick={() => handleVote('like')}
          className={`cursor-pointer w-[74px] h-[35px] rounded-[9px] flex items-center justify-center transition-transform active:scale-90 ${
            userVote === 'like' ? 'bg-[#E51E2B] ring-2 ring-red-400' : 'bg-[#E51E2B] hover:bg-[#D41825]'
          }`}
          title="Likes"
          aria-label="Like"
        >
          <ThumbsUp className="w-5 h-5 text-white fill-white" />
        </button>

        {/* Writing: 230,789 Likes | 90,099 Dislikes */}
        <div className="flex items-center justify-center gap-2.5 shrink-0">
          <div className="text-center min-w-[56px]">
            <div className="text-[14px] font-bold text-black tabular-nums leading-none">
              {likes.toLocaleString()}
            </div>
            <div className="text-[11px] font-medium text-slate-700 leading-tight mt-0.5">
              Likes
            </div>
          </div>

          <div className="w-[1px] h-7 bg-slate-300 shrink-0" />

          <div className="text-center min-w-[56px]">
            <div className="text-[14px] font-bold text-black tabular-nums leading-none">
              {dislikes.toLocaleString()}
            </div>
            <div className="text-[11px] font-medium text-slate-700 leading-tight mt-0.5">
              Dislikes
            </div>
          </div>
        </div>

        {/* Blue Dislike Button with Thumbs Down */}
        <button
          type="button"
          onClick={() => handleVote('dislike')}
          className={`cursor-pointer w-[74px] h-[35px] rounded-[9px] flex items-center justify-center transition-transform active:scale-90 ${
            userVote === 'dislike' ? 'bg-[#1E3A8A] ring-2 ring-blue-400' : 'bg-[#1E3A8A] hover:bg-[#193278]'
          }`}
          title="Dislikes"
          aria-label="Dislike"
        >
          <ThumbsDown className="w-5 h-5 text-white fill-white" />
        </button>
      </div>

      {/* Yellow stuff: Double yellow line with upward yellow triangle */}
      <div className="w-full mt-2 relative">
        {/* Double yellow lines */}
        <div className="w-full flex flex-col gap-[2px]">
          <div className="w-full h-[2.5px] bg-[#F5C21B] rounded-full" />
          <div className="w-full h-[2.5px] bg-[#F5C21B] rounded-full" />
        </div>

        {/* Center upward yellow triangle */}
        <div className="absolute left-1/2 -top-[7px] -translate-x-1/2 pointer-events-none">
          <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[9px] border-b-[#F5C21B]" />
        </div>
      </div>
    </div>
  );
}

export default PhoneReactionPopup;
