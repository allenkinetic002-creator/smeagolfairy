import React, { useState } from 'react';
import { AeriCommentIcon } from './AeriCommentIcon';
import { AeriDoubleTriangleIcon } from './AeriDoubleTriangleIcon';
import { AeriFlameIcon } from './AeriFlameIcon';
import { AeriHandPhoneIcon } from './AeriHandPhoneIcon';
import { AeriMaskedEyesIcon } from './AeriMaskedEyesIcon';
import { AeriMessageBubbleIcon } from './AeriMessageBubbleIcon';
import { BrokenPencilIcon } from './BrokenPencilIcon';
import { FaceoffBattleModal } from './FaceoffBattleModal';
import { PhoneReactionPopup } from './PhoneReactionPopup';

export interface TweetPostItem {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  isVerified?: boolean;
  timeAgo: string;
  location?: string;
  mediaType?: 'image' | 'video' | 'tweet';
  isTweet?: boolean;
  tweetContent?: string;
  mediaUrl?: string;
  caption?: string;
  tags?: string[];
  audioTitle?: string;
  likeCount: number;
  isLiked: boolean;
  isTrending?: boolean;
  retweetCount?: number;
  isRetweeted?: boolean;
  replyCount?: number;
  viewCount?: string;
  isBookmarked?: boolean;
  faceoffConfig?: {
    battleQuestion?: string;
    redParticipant?: {
      name: string;
      avatar: string;
      title?: string;
    };
    blueParticipant?: {
      name: string;
      avatar: string;
      title?: string;
    };
  };
}

interface TweetPostCardProps {
  post: TweetPostItem;
  onToggleLike: (id: string) => void;
  onOpenComments: () => void;
  onOpenSendMessage: (person: { id: string; name: string; handle: string; avatarUrl: string }) => void;
  onTogglePhoneReaction: (id: string) => void;
  onToggleInfluenceRating: (id: string) => void;
  isPhoneReactionActive: boolean;
  isFaceoffOpen: boolean;
  isMorphed: boolean;
  onToggleFaceoff: (id: string) => void;
  onCloseFaceoff: (id: string) => void;
  onMorphPencil: (id: string) => void;
}

export const TweetPostCard: React.FC<TweetPostCardProps> = ({
  post,
  onToggleLike,
  onOpenComments,
  onOpenSendMessage,
  onTogglePhoneReaction,
  onToggleInfluenceRating,
  isPhoneReactionActive,
  isFaceoffOpen,
  isMorphed,
  onToggleFaceoff,
  onCloseFaceoff,
  onMorphPencil,
}) => {
  const [isRetweeted, setIsRetweeted] = useState(Boolean(post.isRetweeted));
  const [retweetCount, setRetweetCount] = useState(post.retweetCount ?? 14);

  const handleToggleRetweet = () => {
    setIsRetweeted((prev) => {
      const next = !prev;
      setRetweetCount((count) => (next ? count + 1 : count - 1));
      return next;
    });
  };

  const displayText = post.tweetContent || post.caption || '';

  // Function to highlight hashtags and handles in tweet text
  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/([#@][\w_]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span key={index} className="text-purple-600 hover:text-purple-700 font-semibold cursor-pointer">
            {part}
          </span>
        );
      }
      if (part.startsWith('@')) {
        return (
          <span key={index} className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="w-full rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all duration-200 p-3.5 space-y-2.5 relative">
      {/* Top phone reaction popup if active */}
      {isPhoneReactionActive && (
        <div className="w-full flex justify-center pb-1">
          <PhoneReactionPopup />
        </div>
      )}

      {/* Top Faceoff Battle card if active */}
      {isFaceoffOpen && (
        <div className="w-full flex justify-center pb-2">
          <FaceoffBattleModal
            onClose={() => onCloseFaceoff(post.id)}
            battleQuestion={post.faceoffConfig?.battleQuestion}
            redParticipant={post.faceoffConfig?.redParticipant}
            blueParticipant={post.faceoffConfig?.blueParticipant}
          />
        </div>
      )}

      {/* Tweet Author & Profile Header */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative shrink-0">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              onClick={() => onTogglePhoneReaction(post.id)}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-600/30 p-0.5 shadow-xs cursor-pointer hover:ring-purple-600/60 transition-all"
            />
          </div>

          <div className="flex flex-col min-w-0 leading-tight">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[14px] font-black text-slate-900 tracking-tight hover:underline cursor-pointer">
                {post.authorName}
              </span>
              <span className="text-xs text-slate-400 font-medium">{post.authorHandle}</span>
              <span className="text-xs text-slate-300">&middot;</span>
              <span className="text-xs text-slate-400 font-medium">{post.timeAgo}</span>
            </div>
            {post.location && (
              <span className="text-[10.5px] text-slate-400 font-normal">{post.location}</span>
            )}
          </div>
        </div>

        {/* Right side: Trending badge & Broken pencil / Follow */}
        <div className="flex items-center gap-1.5 shrink-0">
          {post.isTrending && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFF0F5] border border-pink-100/80 shadow-2xs">
              <AeriFlameIcon filled className="w-3 h-3 text-[#FF5722]" />
              <span className="text-[10px] font-black text-[#8B2FC9] tracking-tight">Trending</span>
            </div>
          )}

          {/* Follow or broken pencil toggle */}
          {Boolean(post.faceoffConfig) || Boolean(isMorphed) ? (
            <button
              onClick={() => onToggleFaceoff(post.id)}
              title="Click to toggle faceoff battle"
              className="cursor-pointer -translate-y-0.5 hover:opacity-80 transition-transform active:scale-95"
            >
              <BrokenPencilIcon className="w-[46px] h-auto" />
            </button>
          ) : (
            <button
              onClick={() => onMorphPencil(post.id)}
              className="px-2.5 py-0.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-[10px] transition-colors cursor-pointer active:scale-95"
            >
              Follow
            </button>
          )}
        </div>
      </div>

      {/* Main Tweet Body Text */}
      <div className="text-[14.5px] leading-relaxed text-slate-900 font-normal whitespace-pre-wrap break-words pl-0.5">
        {renderFormattedText(displayText)}
      </div>

      {/* Attached Tweet Photo / Media if exists */}
      {post.mediaUrl && (
        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 max-h-72 shadow-2xs">
          <img
            src={post.mediaUrl}
            alt="Tweet attachment"
            className="w-full h-full max-h-72 object-cover object-center"
          />
        </div>
      )}

      {/* User's Own Action Icons Bar (Flame, Comment, Message, Phone, Masked Eyes) */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-slate-700">
        <div className="flex items-center gap-3.5 sm:gap-4.5">
          {/* 1. Like with AeriFlameIcon */}
          <button
            onClick={() => onToggleLike(post.id)}
            className="cursor-pointer transition-transform active:scale-90 flex items-center gap-1.5 group py-1"
            title="Like"
            aria-label="Like post"
          >
            <AeriFlameIcon
              filled={post.isLiked}
              className={`w-5 h-5 transition-colors ${
                post.isLiked ? 'text-[#FF6D00]' : 'text-slate-700 stroke-[1.8] group-hover:text-[#FF6D00]'
              }`}
            />
            <span
              className={`text-xs tabular-nums font-semibold ${
                post.isLiked ? 'text-[#FF6D00]' : 'text-slate-500'
              }`}
            >
              {post.likeCount}
            </span>
          </button>

          {/* 2. Comment / Reply with AeriCommentIcon */}
          <button
            onClick={onOpenComments}
            className="cursor-pointer transition-transform active:scale-90 hover:opacity-80 flex items-center gap-1.5 group py-1"
            title="Reply"
            aria-label="Reply"
          >
            <AeriCommentIcon className="w-5 h-5 text-slate-700 stroke-[1.8] group-hover:text-black" />
            <span className="text-xs text-slate-500 tabular-nums font-semibold">
              {post.replyCount ?? 18}
            </span>
          </button>

          {/* 3. Message icon (replaces 3rd icon, remove send me message pill) */}
          <button
            onClick={() =>
              onOpenSendMessage({
                id: 'p-' + post.authorHandle,
                name: post.authorName,
                handle: post.authorHandle,
                avatarUrl: post.authorAvatar,
              })
            }
            className="cursor-pointer transition-transform active:scale-90 hover:opacity-80 flex items-center gap-1.5 group py-1 text-slate-700"
            title="Direct Message"
            aria-label="Direct Message"
          >
            <AeriMessageBubbleIcon className="w-5 h-5 text-slate-700 group-hover:text-black" color="#334155" />
          </button>

          {/* 4. Phone reaction with AeriHandPhoneIcon */}
          <button
            onClick={() => onTogglePhoneReaction(post.id)}
            className="cursor-pointer transition-transform active:scale-90 hover:opacity-75 flex items-center justify-center py-1 text-slate-700"
            title="Phone Reaction"
            aria-label="Phone Reaction"
          >
            <AeriHandPhoneIcon className="w-5 h-5 text-slate-700 stroke-[1.8] hover:text-black" />
          </button>

          {/* 5. Masked eyes rating with AeriMaskedEyesIcon */}
          <button
            onClick={() => onToggleInfluenceRating(post.id)}
            className="cursor-pointer transition-transform active:scale-90 hover:opacity-75 flex items-center justify-center py-1 text-slate-700"
            title="Overall ratings & Social reach"
            aria-label="Overall ratings & Social reach"
          >
            <AeriMaskedEyesIcon className="w-6 h-4 text-slate-700 hover:text-black shrink-0" />
          </button>
        </div>

        {/* Retweet / Repost counter */}
        <button
          onClick={handleToggleRetweet}
          className="cursor-pointer transition-transform active:scale-90 hover:opacity-80 flex items-center gap-1.5 group py-1 text-slate-500 hover:text-emerald-600"
          title="Repost"
          aria-label="Repost"
        >
          <AeriDoubleTriangleIcon
            size={18}
            className={`w-4.5 h-4.5 transition-colors ${
              isRetweeted ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-600'
            }`}
          />
          <span
            className={`text-xs tabular-nums font-semibold ${
              isRetweeted ? 'text-emerald-600 font-bold' : 'text-slate-400'
            }`}
          >
            {retweetCount}
          </span>
        </button>
      </div>
    </div>
  );
};
