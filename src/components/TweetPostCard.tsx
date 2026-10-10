import React, { useState } from 'react';
import {
  MessageCircle,
  Repeat2,
  Heart,
  BarChart2,
  Bookmark,
  Share,
  CheckCircle2,
  MoreHorizontal,
  Sparkles,
  Flame,
} from 'lucide-react';
import { FairyPotIcon } from './FairyPotIcon';
import { AeriMessageBubbleIcon } from './AeriMessageBubbleIcon';
import { AeriHandPhoneIcon } from './AeriHandPhoneIcon';
import { AeriMaskedEyesIcon } from './AeriMaskedEyesIcon';
import { AeriFlameIcon } from './AeriFlameIcon';
import { BrokenPencilIcon } from './BrokenPencilIcon';
import { FaceoffBattleModal } from './FaceoffBattleModal';
import { PhoneReactionPopup } from './PhoneReactionPopup';

export interface TweetPostItem {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  isVerified: boolean;
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
  const [isBookmarked, setIsBookmarked] = useState(Boolean(post.isBookmarked));
  const [copiedToast, setCopiedToast] = useState(false);

  const handleToggleRetweet = () => {
    setIsRetweeted((prev) => {
      const next = !prev;
      setRetweetCount((count) => (next ? count + 1 : count - 1));
      return next;
    });
  };

  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handleShare = () => {
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
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
    <div className="w-full rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all duration-200 p-3.5 space-y-2.5 relative">
      {/* Toast message if share clicked */}
      {copiedToast && (
        <div className="absolute top-2 right-4 bg-black text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-20 animate-fadeIn font-semibold">
          Tweet link copied!
        </div>
      )}

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

      {/* Tweet Type / Honey Jar Header Pill */}
      <div className="flex items-center justify-between text-xs text-slate-500 pb-0.5">
        <div className="flex items-center gap-1.5 font-bold">
          <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-2xs">
            <FairyPotIcon size={12} className="text-white stroke-white stroke-[2.2]" />
          </div>
          <span className="text-purple-700 font-extrabold tracking-tight">Tweet &middot; Fairy Jar</span>
          <span className="text-slate-300">&bull;</span>
          <span className="text-[11px] text-slate-400 font-medium">Verified Stream</span>
        </div>

        {/* Right side trending or pencil */}
        <div className="flex items-center gap-1.5">
          {post.isTrending && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-black border border-rose-100">
              <Flame size={11} className="text-rose-500" /> Trending
            </span>
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
              className="px-2.5 py-0.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-[10px] transition-colors cursor-pointer"
            >
              Follow
            </button>
          )}

          <button
            aria-label="More options"
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full cursor-pointer transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Tweet Author & Profile Header */}
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            onClick={() => onTogglePhoneReaction(post.id)}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-600/30 p-0.5 shadow-xs cursor-pointer hover:ring-purple-600/60 transition-all"
          />
          <div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center ring-1.5 ring-white shadow-2xs"
            title="Honey Jar Creator"
          >
            <FairyPotIcon size={10} className="text-white stroke-white stroke-[2.2]" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap leading-tight">
            <span className="text-[14px] font-black text-slate-900 tracking-tight hover:underline cursor-pointer">
              {post.authorName}
            </span>
            {post.isVerified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 fill-purple-100 shrink-0" />
            )}
            <span className="text-xs text-slate-500 font-normal">{post.authorHandle}</span>
            <span className="text-xs text-slate-300">&middot;</span>
            <span className="text-xs text-slate-400 font-medium">{post.timeAgo}</span>
          </div>

          {/* Main Tweet Body Text */}
          <div className="mt-1 text-[14.5px] leading-relaxed text-slate-900 font-normal whitespace-pre-wrap break-words">
            {renderFormattedText(displayText)}
          </div>

          {/* Attached Tweet Photo / Media if exists */}
          {post.mediaUrl && (
            <div className="mt-2.5 rounded-xl overflow-hidden border border-slate-200 bg-slate-950 max-h-72 shadow-2xs">
              <img
                src={post.mediaUrl}
                alt="Tweet attachment"
                className="w-full h-full max-h-72 object-cover object-center"
              />
            </div>
          )}

          {/* Twitter Engagement Icons Bar (Reply, Repost, Like, Views, Bookmark, Share) */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-slate-500 text-xs">
            {/* Reply / Comment */}
            <button
              onClick={onOpenComments}
              className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer group py-1"
              title="Reply"
            >
              <div className="p-1 rounded-full group-hover:bg-blue-50 transition-colors">
                <MessageCircle size={15} />
              </div>
              <span className="tabular-nums font-semibold">{post.replyCount ?? 18}</span>
            </button>

            {/* Repost / Retweet */}
            <button
              onClick={handleToggleRetweet}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer group py-1 ${
                isRetweeted ? 'text-emerald-600 font-bold' : 'hover:text-emerald-600'
              }`}
              title="Repost / Retweet"
            >
              <div className="p-1 rounded-full group-hover:bg-emerald-50 transition-colors">
                <Repeat2 size={16} />
              </div>
              <span className="tabular-nums font-semibold">{retweetCount}</span>
            </button>

            {/* Like (Heart & Flame) */}
            <button
              onClick={() => onToggleLike(post.id)}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer group py-1 ${
                post.isLiked ? 'text-rose-600 font-bold' : 'hover:text-rose-600'
              }`}
              title="Like"
            >
              <div className="p-1 rounded-full group-hover:bg-rose-50 transition-colors">
                <Heart size={15} className={post.isLiked ? 'fill-current text-rose-600' : ''} />
              </div>
              <span className="tabular-nums font-semibold">{post.likeCount}</span>
            </button>

            {/* Impressions / Views */}
            <div className="flex items-center gap-1 text-slate-400 py-1" title="Views">
              <BarChart2 size={15} />
              <span className="tabular-nums font-medium">{post.viewCount || '1.8K'}</span>
            </div>

            {/* Bookmark & Share */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleToggleBookmark}
                className={`p-1 rounded-full transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-slate-400 hover:text-purple-600 hover:bg-slate-100'
                }`}
                title="Bookmark"
              >
                <Bookmark size={15} className={isBookmarked ? 'fill-current' : ''} />
              </button>

              <button
                onClick={handleShare}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Share Tweet"
              >
                <Share size={15} />
              </button>
            </div>
          </div>

          {/* Fairy Hybrid Actions Pill (Send me message + Phone Reaction + Masked Eyes Rating) */}
          <div className="mt-2.5 pt-2 border-t border-dashed border-slate-100 flex items-center justify-between">
            <button
              onClick={() =>
                onOpenSendMessage({
                  id: 'p-' + post.authorHandle,
                  name: post.authorName,
                  handle: post.authorHandle,
                  avatarUrl: post.authorAvatar,
                })
              }
              className="cursor-pointer px-3 py-1 bg-slate-100 hover:bg-purple-100 text-slate-800 hover:text-purple-900 rounded-full text-[10.5px] font-bold flex items-center gap-1.5 transition-colors border border-slate-200/70"
            >
              <AeriMessageBubbleIcon className="w-3 h-3 text-purple-600 shrink-0" color="#7C3AED" />
              <span>Send me message</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onTogglePhoneReaction(post.id)}
                className="cursor-pointer transition-transform active:scale-90 hover:opacity-75 flex items-center justify-center p-0.5 text-slate-600"
                title="Phone Reaction"
              >
                <AeriHandPhoneIcon className="w-4.5 h-4.5 text-black stroke-[1.8]" />
              </button>

              <button
                onClick={() => onToggleInfluenceRating(post.id)}
                className="cursor-pointer transition-transform active:scale-90 hover:opacity-75 flex items-center justify-center p-0.5 text-slate-600"
                title="Overall ratings & Social reach"
              >
                <AeriMaskedEyesIcon className="w-6 h-4 text-black shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
