import React, { useState, useRef } from 'react';
import {
  X,
  Image as ImageIcon,
  Smile,
  Hash,
  Globe,
  Sparkles,
  CheckCircle2,
  Trash2,
  Repeat2,
  Heart,
  BarChart2,
  Bookmark,
  MessageCircle,
} from 'lucide-react';
import { FairyPotIcon } from './FairyPotIcon';

export interface NewTweetPayload {
  text: string;
  mediaUrl?: string;
  tags?: string[];
}

interface CreateTweetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishTweet: (payload: NewTweetPayload) => void;
  authorAvatar: string;
  authorName?: string;
  authorHandle?: string;
}

const SAMPLE_TWEET_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80',
    title: 'Autumn Twilight',
  },
  {
    url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=900&auto=format&fit=crop&q=80',
    title: 'Mystical Woods',
  },
  {
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=900&auto=format&fit=crop&q=80',
    title: 'Neon Horizon',
  },
];

const PRESET_HASHTAGS = ['#fairy', '#honeyjar', '#vibes', '#creative', '#goldenhive', '#art'];
const PRESET_EMOJIS = ['🍯', '🧚', '✨', '💜', '🔥', '🍂', '💬', '⚡'];

export const CreateTweetModal: React.FC<CreateTweetModalProps> = ({
  isOpen,
  onClose,
  onPublishTweet,
  authorAvatar,
  authorName = 'Elena Vance',
  authorHandle = '@elena_aeri',
}) => {
  const [tweetText, setTweetText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const MAX_CHARS = 280;
  const charsLeft = MAX_CHARS - tweetText.length;
  const progressRatio = Math.min(1, tweetText.length / MAX_CHARS);
  const isOverLimit = charsLeft < 0;
  const canPost = (tweetText.trim().length > 0 || Boolean(selectedImage)) && !isOverLimit;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setShowImagePicker(false);
    }
  };

  const handleAddEmoji = (emoji: string) => {
    setTweetText((prev) => prev + emoji);
  };

  const handleAddHashtag = (tag: string) => {
    setTweetText((prev) => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed} ${tag} ` : `${tag} `;
    });
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canPost) return;

    // Extract tags from text or defaults
    const extractedTags = tweetText.match(/#[a-z0-9_]+/gi) || [];

    onPublishTweet({
      text: tweetText.trim(),
      mediaUrl: selectedImage || undefined,
      tags: extractedTags,
    });

    // Reset and close
    setTweetText('');
    setSelectedImage(null);
    setShowPreview(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn select-none">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header bar */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              aria-label="Close tweet composer"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
              <FairyPotIcon size={14} className="text-purple-600 stroke-purple-600 stroke-[2]" />
              <span className="text-xs font-bold tracking-tight">Honey Jar Tweet</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPreview((prev) => !prev)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                showPreview
                  ? 'bg-purple-100 text-purple-700 border-purple-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {showPreview ? 'Edit mode' : 'Preview tweet'}
            </button>

            <button
              onClick={handlePost}
              disabled={!canPost}
              className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
                canPost
                  ? 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white active:scale-95'
                  : 'bg-purple-200 text-purple-400 cursor-not-allowed'
              }`}
            >
              <span>Post</span>
              <FairyPotIcon size={12} className="text-white stroke-white stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="p-4 overflow-y-auto space-y-3">
          {showPreview ? (
            /* Tweet Preview mode */
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={12} className="text-purple-500" />
                Live Feed Preview
              </div>

              {/* Twitter card header */}
              <div className="flex items-start gap-2.5">
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-600/30"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-black text-slate-900">{authorName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 fill-purple-100" />
                    <span className="text-xs text-slate-400 font-medium">{authorHandle}</span>
                    <span className="text-xs text-slate-300">&middot;</span>
                    <span className="text-xs text-purple-600 font-semibold">Just now</span>
                  </div>

                  {/* Body text */}
                  <p className="text-[14px] leading-relaxed text-slate-900 mt-1 whitespace-pre-wrap">
                    {tweetText || <span className="italic text-slate-400">Your tweet text will appear here...</span>}
                  </p>

                  {/* Attached media */}
                  {selectedImage && (
                    <div className="mt-2.5 rounded-xl overflow-hidden border border-slate-200 bg-black max-h-56">
                      <img
                        src={selectedImage}
                        alt="Attached media"
                        className="w-full h-full object-cover object-center max-h-56"
                      />
                    </div>
                  )}

                  {/* Twitter fake interactions row */}
                  <div className="flex items-center justify-between text-slate-400 text-xs mt-3 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1 hover:text-blue-500">
                      <MessageCircle size={14} /> 0
                    </span>
                    <span className="flex items-center gap-1 hover:text-emerald-500">
                      <Repeat2 size={14} /> 0
                    </span>
                    <span className="flex items-center gap-1 hover:text-rose-500">
                      <Heart size={14} /> 0
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart2 size={14} /> 1
                    </span>
                    <span className="flex items-center gap-1">
                      <Bookmark size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Tweet Edit mode */
            <>
              {/* Author & Audience */}
              <div className="flex items-start gap-3">
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-600/30 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 leading-tight">
                    <span className="text-sm font-bold text-slate-900">{authorName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 fill-purple-100" />
                    <span className="text-xs text-slate-400">{authorHandle}</span>
                  </div>

                  <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-semibold border border-purple-200/60">
                    <Globe size={11} />
                    <span>Everyone can reply</span>
                  </div>
                </div>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={tweetText}
                  onChange={(e) => setTweetText(e.target.value)}
                  placeholder="What's happening? Buzz your thoughts into the fairy jar... 🍯"
                  rows={4}
                  className="w-full text-base placeholder:text-slate-400 text-slate-900 focus:outline-none resize-none bg-transparent py-1 border-0 leading-relaxed font-normal"
                  autoFocus
                />
              </div>

              {/* Attached image preview */}
              {selectedImage && (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group">
                  <img
                    src={selectedImage}
                    alt="Selected attachment"
                    className="w-full h-44 object-cover object-center"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white transition-all cursor-pointer shadow-md"
                    title="Remove attached photo"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              {/* Quick Hashtags */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-0.5">
                  <Hash size={11} /> Tags:
                </span>
                {PRESET_HASHTAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddHashtag(tag)}
                    className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-600 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Emoji Picker row */}
              {showEmojiPicker && (
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-purple-50/70 border border-purple-100 flex-wrap animate-fadeIn">
                  <span className="text-[11px] font-bold text-purple-700 mr-1">Tap emoji:</span>
                  {PRESET_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleAddEmoji(emoji)}
                      className="text-lg hover:scale-125 transition-transform p-1 cursor-pointer active:scale-95"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              {/* Photo presets drawer */}
              {showImagePicker && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Select an image for your Tweet</span>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-purple-600 hover:underline cursor-pointer"
                    >
                      Upload custom file
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {SAMPLE_TWEET_IMAGES.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSelectedImage(img.url);
                          setShowImagePicker(false);
                        }}
                        className="group relative rounded-lg overflow-hidden border border-slate-200 aspect-video hover:ring-2 hover:ring-purple-600 transition-all cursor-pointer"
                      >
                        <img
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 px-1 py-0.5 text-[10px] text-white truncate font-medium">
                          {img.title}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom toolbar */}
        <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-purple-600">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            {/* Media button */}
            <button
              type="button"
              onClick={() => setShowImagePicker((prev) => !prev)}
              className="p-2 rounded-full hover:bg-purple-100 text-purple-600 transition-colors cursor-pointer"
              title="Add image"
              aria-label="Add image"
            >
              <ImageIcon size={18} />
            </button>

            {/* Emoji button */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="p-2 rounded-full hover:bg-purple-100 text-purple-600 transition-colors cursor-pointer"
              title="Add emoji"
              aria-label="Add emoji"
            >
              <Smile size={18} />
            </button>
          </div>

          {/* Right side: Character counter indicator ring & Post CTA */}
          <div className="flex items-center gap-3">
            {/* Circular progress counter */}
            <div className="flex items-center gap-1.5">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    className="stroke-slate-200"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    className={`transition-all duration-200 ${
                      isOverLimit
                        ? 'stroke-rose-500'
                        : charsLeft < 20
                        ? 'stroke-amber-500'
                        : 'stroke-purple-600'
                    }`}
                    strokeWidth="2.5"
                    strokeDasharray={56.5}
                    strokeDashoffset={56.5 * (1 - progressRatio)}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
              <span
                className={`text-[11px] font-bold tabular-nums ${
                  isOverLimit
                    ? 'text-rose-600'
                    : charsLeft < 20
                    ? 'text-amber-600'
                    : 'text-slate-400'
                }`}
              >
                {charsLeft}
              </span>
            </div>

            <button
              type="button"
              onClick={handlePost}
              disabled={!canPost}
              className={`px-5 py-1.5 rounded-full text-xs font-black tracking-wide uppercase transition-all shadow-sm cursor-pointer flex items-center gap-1.5 ${
                canPost
                  ? 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white active:scale-95'
                  : 'bg-purple-200 text-purple-400 cursor-not-allowed'
              }`}
            >
              <span>Tweet</span>
              <FairyPotIcon size={12} className="text-white stroke-white stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
