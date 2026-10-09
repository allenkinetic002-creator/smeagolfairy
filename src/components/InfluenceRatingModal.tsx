import React, { useState } from 'react';
import { X, Star, Info, ChevronDown, CheckCircle2 } from 'lucide-react';

interface InfluenceRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfluenceRatingModal({ isOpen, onClose }: InfluenceRatingModalProps) {
  // Selected rating (default 8.9 as in screenshot)
  const [rating, setRating] = useState<number>(8.9);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [activeFace, setActiveFace] = useState<number>(4); // 0: Fail, 1: Poor, 2: Fair, 3: Good, 4: Very good

  if (!isOpen) return null;

  const ratingOptions = [8.5, 8.6, 8.7, 8.8, 8.9, 9.0];

  const handleSelectRating = (val: number) => {
    setRating(val);
    if (val >= 8.9) setActiveFace(4);
    else if (val >= 8.7) setActiveFace(3);
    else if (val >= 8.5) setActiveFace(2);
    else if (val >= 7.0) setActiveFace(1);
    else setActiveFace(0);
  };

  const handleSelectFace = (faceIndex: number) => {
    setActiveFace(faceIndex);
    if (faceIndex === 4) setRating(8.9);
    else if (faceIndex === 3) setRating(8.7);
    else if (faceIndex === 2) setRating(8.5);
    else if (faceIndex === 1) setRating(7.2);
    else setRating(5.4);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[500px] bg-white rounded-[26px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh]"
      >
        {/* Header bar with close button */}
        <div className="px-5 pt-3.5 pb-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
              Fairy Influence Metrics
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content matching the screenshot exactly */}
        <div className="px-5 sm:px-6 pb-6 pt-1 overflow-y-auto space-y-4.5 overscroll-contain">
          {/* Top Blue-tinted Overall Ratings & Completion Rates Card */}
          <div className="bg-[#EEF3FD] rounded-[20px] p-4 sm:p-5 flex items-start justify-between shadow-xs border border-[#E0E9FA]">
            {/* Left: Overall ratings */}
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[26px] sm:text-[30px] font-black text-slate-900 leading-none tracking-tight">
                  {rating.toFixed(1)}
                </span>
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 -mt-0.5" />
                <span className="text-[15px] sm:text-[17px] font-black text-[#15803D] leading-none">
                  {rating >= 8.8 ? 'Very good' : rating >= 8.6 ? 'Good' : rating >= 8.0 ? 'Fair' : 'Poor'}
                </span>
              </div>
              <h4 className="font-extrabold text-xs sm:text-[13px] text-slate-900 mt-2 leading-tight">
                Overall ratings
              </h4>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                1.3M ratings
              </p>
            </div>

            {/* Right: Completion rates */}
            <div className="text-left pl-3 border-l border-slate-200/60">
              <span className="text-[26px] sm:text-[30px] font-black text-slate-900 leading-none tracking-tight">
                97%
              </span>
              <h4 className="font-extrabold text-xs sm:text-[13px] text-slate-900 mt-2 leading-tight flex items-center gap-1">
                <span>Completion rates</span>
                <Info className="w-3 h-3 text-slate-400" />
              </h4>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                400K check-ins
              </p>
            </div>
          </div>

          {/* Row of 5 Emotional Faces */}
          <div className="flex items-center justify-between px-1 sm:px-2 pt-1">
            {/* 1. Red Fail (X X eyes, wavy mouth) */}
            <button
              type="button"
              onClick={() => handleSelectFace(0)}
              className={`transition-all active:scale-95 cursor-pointer rounded-full p-0.5 ${
                activeFace === 0 ? 'ring-3 ring-rose-400 ring-offset-2 scale-110' : 'opacity-85 hover:opacity-100 hover:scale-105'
              }`}
              title="Fail"
            >
              <svg className="w-10 h-10 sm:w-11 sm:h-11 text-[#E11D48]" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="2.8" fill="white" />
                {/* Left X eye */}
                <line x1="14" y1="14" x2="18" y2="18" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                <line x1="18" y1="14" x2="14" y2="18" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                {/* Right X eye */}
                <line x1="26" y1="14" x2="30" y2="18" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                <line x1="30" y1="14" x2="26" y2="18" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                {/* Squiggly mouth */}
                <path d="M14 30 Q17 26 21 29 T29 27" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              </svg>
            </button>

            {/* 2. Orange Poor (Dot eyes, sad frown) */}
            <button
              type="button"
              onClick={() => handleSelectFace(1)}
              className={`transition-all active:scale-95 cursor-pointer rounded-full p-0.5 ${
                activeFace === 1 ? 'ring-3 ring-orange-400 ring-offset-2 scale-110' : 'opacity-85 hover:opacity-100 hover:scale-105'
              }`}
              title="Poor"
            >
              <svg className="w-10 h-10 sm:w-11 sm:h-11 text-[#EA580C]" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="2.8" fill="white" />
                <circle cx="16" cy="17" r="2" fill="currentColor" />
                <circle cx="28" cy="17" r="2" fill="currentColor" />
                <path d="M14 30 Q22 23 30 30" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              </svg>
            </button>

            {/* 3. Yellow Fair (Dot eyes, straight flat mouth) */}
            <button
              type="button"
              onClick={() => handleSelectFace(2)}
              className={`transition-all active:scale-95 cursor-pointer rounded-full p-0.5 ${
                activeFace === 2 ? 'ring-3 ring-amber-400 ring-offset-2 scale-110' : 'opacity-85 hover:opacity-100 hover:scale-105'
              }`}
              title="Fair"
            >
              <svg className="w-10 h-10 sm:w-11 sm:h-11 text-[#CA8A04]" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="2.8" fill="white" />
                <circle cx="16" cy="17" r="2" fill="currentColor" />
                <circle cx="28" cy="17" r="2" fill="currentColor" />
                <line x1="16" y1="28" x2="28" y2="28" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
              </svg>
            </button>

            {/* 4. Light Green Good (Dot eyes, smiling mouth) */}
            <button
              type="button"
              onClick={() => handleSelectFace(3)}
              className={`transition-all active:scale-95 cursor-pointer rounded-full p-0.5 ${
                activeFace === 3 ? 'ring-3 ring-emerald-400 ring-offset-2 scale-110' : 'opacity-85 hover:opacity-100 hover:scale-105'
              }`}
              title="Good"
            >
              <svg className="w-10 h-10 sm:w-11 sm:h-11 text-[#16A34A]" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="2.8" fill="white" />
                <circle cx="16" cy="17" r="2" fill="currentColor" />
                <circle cx="28" cy="17" r="2" fill="currentColor" />
                <path d="M14 26 Q22 34 30 26" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              </svg>
            </button>

            {/* 5. Rich Green Very Good (Happy eyes, wide open grin) */}
            <button
              type="button"
              onClick={() => handleSelectFace(4)}
              className={`transition-all active:scale-95 cursor-pointer rounded-full p-0.5 ${
                activeFace === 4 ? 'ring-3 ring-emerald-600 ring-offset-2 scale-110' : 'opacity-85 hover:opacity-100 hover:scale-105'
              }`}
              title="Very good"
            >
              <svg className="w-10 h-10 sm:w-11 sm:h-11 text-[#059669]" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="2.8" fill="white" />
                {/* Happy curved eyes ^ ^ */}
                <path d="M13 18 Q16 13 19 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" fill="none" />
                <path d="M25 18 Q28 13 31 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" fill="none" />
                {/* Big open smile */}
                <path d="M14 25 Q22 36 30 25 Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Color Rating Progress Bar & Labels */}
          <div className="space-y-1.5 pt-1">
            {/* Multi-color segment bar */}
            <div className="w-full h-1.5 rounded-full overflow-hidden flex">
              <div className="flex-1 bg-[#E11D48]" />
              <div className="flex-1 bg-[#EA580C]" />
              <div className="flex-1 bg-[#EAB308]" />
              <div className="flex-1 bg-[#22C55E]" />
              <div className="flex-1 bg-[#059669]" />
            </div>

            {/* Labels across zones */}
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold text-slate-500 px-0.5">
              <span className="text-[#E11D48]">- Fail</span>
              <span className="text-[#EA580C]">Poor</span>
              <span className="text-[#CA8A04]">Fair</span>
              <span className="text-[#16A34A]">Good</span>
              <span className="text-[#059669]">Very good +</span>
            </div>

            {/* Ruler with tick marks & selector circle */}
            <div className="relative py-2.5 flex items-center justify-center">
              {/* Horizontal deep blue line */}
              <div className="w-full h-[5px] bg-[#1E40AF] rounded-full relative flex items-center justify-between px-2">
                {/* 11 vertical ticks */}
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-[3px] h-3.5 bg-[#1E40AF] rounded-full shrink-0" />
                ))}

                {/* Circular slider thumb at the 8.9 position (around 88% width) */}
                <div
                  className="absolute w-5.5 h-5.5 rounded-full border-[3px] border-[#1E40AF] bg-white shadow-md transition-all duration-200 pointer-events-none"
                  style={{
                    left: `${Math.min(94, Math.max(4, ((rating - 7.5) / 2) * 100))}%`,
                    transform: 'translateX(-50%)',
                  }}
                />
              </div>
            </div>

            {/* Stepper minus & plus row */}
            <div className="flex items-center justify-between px-1 text-slate-400">
              <button
                type="button"
                onClick={() => setRating((prev) => Math.max(7.0, parseFloat((prev - 0.1).toFixed(1))))}
                className="hover:text-slate-800 transition-colors cursor-pointer text-lg font-bold leading-none p-1"
                title="Decrease rating"
              >
                &minus;
              </button>
              <button
                type="button"
                onClick={() => setRating((prev) => Math.min(10.0, parseFloat((prev + 0.1).toFixed(1))))}
                className="hover:text-slate-800 transition-colors cursor-pointer text-lg font-bold leading-none p-1"
                title="Increase rating"
              >
                &#43;
              </button>
            </div>
          </div>

          {/* Social Reach Text + Retro Pixel Art Thumbs Up */}
          <div className="flex items-center justify-between pt-1 gap-3">
            <div className="space-y-0.5">
              <p className="font-extrabold text-[13.5px] sm:text-[15px] text-slate-900 leading-snug">
                Max out your social reach.
              </p>
              <p className="font-extrabold text-[13.5px] sm:text-[15px] text-slate-900 leading-snug">
                500X your presence.
              </p>
              <p className="font-medium text-xs sm:text-[12.5px] text-slate-700 pt-1 flex items-center gap-1">
                <span>Only on Fairy where Influence gets real.</span>
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 inline" />
              </p>
            </div>

            {/* Pixel Art Thumbs Up Hand Graphic (as in f1.png) */}
            <div className="shrink-0 p-1">
              <svg
                className="w-11 h-11 text-black"
                viewBox="0 0 32 32"
                fill="none"
                style={{ shapeRendering: 'crispEdges' }}
              >
                {/* Black pixel outline of thumbs up */}
                <path
                  d="
                    M14 2h4v8h2v2h2v2h2v2h2v10h-2v2H12v-2h-2v-8h2v-2h2V8h-2V2h2z
                    M6 16h4v12H6z
                  "
                  fill="black"
                />
                {/* White / light fill */}
                <path
                  d="
                    M14 4h2v6h2v2h2v2h2v2h2v6h-2v2h-8v-2h-2v-8h2v-2h2V4z
                    M8 18h2v8H8z
                  "
                  fill="white"
                />
                {/* Finger crease pixel lines */}
                <rect x="18" y="18" width="4" height="1" fill="black" />
                <rect x="18" y="21" width="4" height="1" fill="black" />
                <rect x="18" y="24" width="4" height="1" fill="black" />
              </svg>
            </div>
          </div>

          {/* Rating Number Selector Chips: 8.5, 8.6, 8.7, 8.8, 8.9, 9.0 */}
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scrollbar-none py-1">
            {ratingOptions.map((val) => {
              const isSelected = rating === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleSelectRating(val)}
                  className={`flex-1 min-w-[50px] py-2 rounded-xl text-center font-extrabold text-[13px] sm:text-[14px] transition-all cursor-pointer shadow-2xs ${
                    isSelected
                      ? 'bg-[#16A34A] text-white shadow-md scale-102 ring-2 ring-emerald-300'
                      : 'bg-[#F1F5F9] text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {val.toFixed(1)}
                </button>
              );
            })}
          </div>

          {/* Expandable Accordion: "Unlock the Rest...." */}
          <div className="pt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsUnlocked(!isUnlocked)}
              className="w-full flex items-center justify-between py-1 text-slate-900 font-extrabold text-sm sm:text-base hover:text-purple-700 transition-colors cursor-pointer group"
            >
              <span className="group-hover:translate-x-0.5 transition-transform">
                Unlock the Rest....
              </span>
              <ChevronDown
                className={`w-5 h-5 text-slate-700 transition-transform duration-200 ${
                  isUnlocked ? 'rotate-180 text-purple-600' : ''
                }`}
              />
            </button>

            {isUnlocked && (
              <div className="mt-2.5 p-3.5 bg-gradient-to-r from-purple-50/70 to-pink-50/50 rounded-2xl border border-purple-200/80 space-y-2 text-xs animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between text-slate-800 font-bold">
                  <span>Viral Reach Multiplier:</span>
                  <span className="font-mono text-purple-700 font-black">500X Boost</span>
                </div>
                <div className="flex items-center justify-between text-slate-800 font-bold">
                  <span>Creator Audience Check-in:</span>
                  <span className="font-mono text-emerald-700 font-black">Top 3% Global</span>
                </div>
                <div className="flex items-center justify-between text-slate-800 font-bold">
                  <span>Fairy Verified Checkmark:</span>
                  <span className="text-purple-600 font-black">Unlocked with &ge; 8.8</span>
                </div>
                <p className="text-[10.5px] text-slate-500 pt-1 leading-relaxed border-t border-purple-100">
                  By submitting with this rating, your posts on Fairy enter prioritized algorithmic distribution across trending vibe coder channels.
                </p>
              </div>
            )}
          </div>

          {/* Bottom Submit Button Row */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitted}
              className="px-8 py-3 rounded-full bg-[#D900FF] hover:bg-[#C000E0] active:scale-95 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-purple-500/25 transition-all cursor-pointer flex items-center gap-2"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Submitted!</span>
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
