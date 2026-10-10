import React, { useState, useId } from 'react';
import { X, ThumbsUp, ThumbsDown, Check, Share2, Sparkles, Smartphone, Eye } from 'lucide-react';

export interface PhoneReactionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  postAuthor?: string;
  initialLikes?: number;
  initialDislikes?: number;
}

export function PhoneReactionPopup({
  isOpen,
  onClose,
  postAuthor = 'Elena Vance',
  initialLikes = 230789,
  initialDislikes = 90099,
}: PhoneReactionPopupProps) {
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [likes, setLikes] = useState<number>(initialLikes);
  const [dislikes, setDislikes] = useState<number>(initialDislikes);
  const [copiedLink, setCopiedLink] = useState(false);

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

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 1800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[75] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[96%] sm:w-full max-w-[430px] bg-white rounded-[26px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header bar */}
        <div className="px-5 pt-3.5 pb-2.5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-amber-100 text-amber-700">
              <Smartphone className="w-3.5 h-3.5 stroke-[2.2]" />
            </span>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                Phone Reach & Reaction
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">
                {postAuthor} • Public Community Verdict
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Core Screenshot-Inspired Reaction Widget */}
        <div className="p-5 sm:p-6 bg-gradient-to-b from-slate-50/60 to-white flex flex-col items-center">
          {/* Main Horizontal Interaction Bar */}
          <div className="w-full flex items-center justify-between gap-2.5 sm:gap-3 py-2 px-1">
            {/* Left: Red Like Button */}
            <button
              onClick={() => handleVote('like')}
              className={`cursor-pointer group flex-1 max-w-[100px] sm:max-w-[110px] h-12 rounded-[14px] flex items-center justify-center transition-all duration-150 active:scale-95 shadow-sm ${
                userVote === 'like'
                  ? 'bg-[#E51E2B] ring-3 ring-red-300 ring-offset-1 shadow-md scale-102'
                  : 'bg-[#E51E2B] hover:bg-[#D41825] hover:shadow-md'
              }`}
              title="I Like this"
              aria-label="Like post"
            >
              <ThumbsUp
                className={`w-6 h-6 text-white transition-transform group-active:scale-110 ${
                  userVote === 'like' ? 'fill-white stroke-white' : 'stroke-[2.2]'
                }`}
              />
            </button>

            {/* Middle: Stats Counter with Divider */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 shrink-0 px-1">
              {/* Likes Stat */}
              <div className="text-center min-w-[68px]">
                <div className="text-[15px] sm:text-[17px] font-black text-slate-900 tabular-nums leading-tight">
                  {likes.toLocaleString()}
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-500 leading-tight mt-0.5">
                  Likes
                </div>
              </div>

              {/* Vertical divider */}
              <div className="w-[1.5px] h-9 bg-slate-300/80 rounded-full shrink-0" />

              {/* Dislikes Stat */}
              <div className="text-center min-w-[68px]">
                <div className="text-[15px] sm:text-[17px] font-black text-slate-900 tabular-nums leading-tight">
                  {dislikes.toLocaleString()}
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-500 leading-tight mt-0.5">
                  Dislikes
                </div>
              </div>
            </div>

            {/* Right: Blue Dislike Button */}
            <button
              onClick={() => handleVote('dislike')}
              className={`cursor-pointer group flex-1 max-w-[100px] sm:max-w-[110px] h-12 rounded-[14px] flex items-center justify-center transition-all duration-150 active:scale-95 shadow-sm ${
                userVote === 'dislike'
                  ? 'bg-[#1E3A8A] ring-3 ring-blue-300 ring-offset-1 shadow-md scale-102'
                  : 'bg-[#1E3A8A] hover:bg-[#193278] hover:shadow-md'
              }`}
              title="I Dislike this"
              aria-label="Dislike post"
            >
              <ThumbsDown
                className={`w-6 h-6 text-white transition-transform group-active:scale-110 ${
                  userVote === 'dislike' ? 'fill-white stroke-white' : 'stroke-[2.2]'
                }`}
              />
            </button>
          </div>

          {/* User Feedback Status */}
          {userVote && (
            <div className="mt-2 text-[11px] font-bold text-center animate-in fade-in slide-in-from-top-1 duration-150">
              {userVote === 'like' ? (
                <span className="text-red-600 flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> You voted Likes (+1)
                </span>
              ) : (
                <span className="text-blue-700 flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> You voted Dislikes (+1)
                </span>
              )}
            </div>
          )}

          {/* Double Yellow Line with Center Upward Triangle Indicator */}
          <div className="w-full mt-4 sm:mt-5 pt-1 relative">
            {/* The iconic double yellow line */}
            <div className="w-full flex flex-col gap-[2.5px]">
              <div className="w-full h-[3px] bg-[#F5C21B] rounded-full" />
              <div className="w-full h-[3px] bg-[#F5C21B] rounded-full" />
            </div>

            {/* Center upward yellow triangle indicator */}
            <div
              className="absolute left-1/2 -top-[9px] -translate-x-1/2 transition-all duration-300"
              style={{
                // Subtle slider shift based on sentiment ratio (keeping it cleanly centered around the divider)
                left: `${Math.min(78, Math.max(22, likeRatio))}%`,
              }}
            >
              {/* Upward yellow triangle pointer */}
              <div
                className="w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-b-[13px] border-b-[#F5C21B] filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
                title={`${likeRatio.toFixed(1)}% Approval Rate`}
              />
            </div>
          </div>

          {/* Ratio & Community Verdict details */}
          <div className="w-full mt-4 pt-3 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-800">
                {likeRatio.toFixed(1)}% Positive Reception
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>{(totalVotes * 1.4).toFixed(0).toLocaleString()} Impressions</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Updated in real-time</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Stat'}</span>
            </button>
            <button
              onClick={onClose}
              className="cursor-pointer text-xs font-bold px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
