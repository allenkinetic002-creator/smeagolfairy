import React from 'react';
import { X, Swords, History, Zap, ShieldAlert } from 'lucide-react';
import { AeriRaygunIcon } from './AeriRaygunIcon';
import { BrokenPencilIcon } from './BrokenPencilIcon';

interface RaygunActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPersonName: string;
  targetPersonAvatar?: string;
  onSelectVerb: () => void;
  onSelectAdverb: () => void;
}

/**
 * Small modal triggered by clicking the Raygun icon.
 * Offers:
 * - "Verb": View past challenges / previous challenge history (Broken Pencil feature records)
 * - "Adverb": Challenge this person to an online fight / create challenge post with broken pencil faceoff
 */
export const RaygunActionModal: React.FC<RaygunActionModalProps> = ({
  isOpen,
  onClose,
  targetPersonName,
  targetPersonAvatar,
  onSelectVerb,
  onSelectAdverb,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[340px] bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden relative select-none animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 px-4 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
              <AeriRaygunIcon className="w-5 h-5 text-white stroke-[1.8]" />
            </div>
            <div>
              <div className="text-[10px] font-black tracking-widest uppercase text-pink-200">
                Raygun Arena
              </div>
              <h3 className="text-sm font-black leading-tight text-white flex items-center gap-1.5">
                <span>Battle Actions</span>
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/90 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Target Profile Subheader */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {targetPersonAvatar && (
              <img
                src={targetPersonAvatar}
                alt={targetPersonName}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-purple-300"
              />
            )}
            <span className="text-[12px] font-extrabold text-slate-800">
              Target: <span className="text-purple-700">{targetPersonName}</span>
            </span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
            Select Mode
          </span>
        </div>

        {/* Options: Verb & Adverb */}
        <div className="p-4 space-y-3">
          {/* VERB: Past Challenges */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectVerb();
            }}
            className="w-full text-left p-3.5 rounded-2xl border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all group flex items-start gap-3 cursor-pointer active:scale-98 shadow-xs"
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-100 group-hover:bg-amber-200/80 flex items-center justify-center shrink-0 transition-colors p-1">
              <BrokenPencilIcon className="w-8 h-auto" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-black text-slate-900 group-hover:text-amber-800 tracking-tight">
                  Verb
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Past Challenges
                </span>
              </div>
              <p className="text-[11.5px] text-slate-600 mt-0.5 leading-snug">
                Review previous faceoffs, fight records, broken pencil battles and voting history for {targetPersonName}.
              </p>
            </div>
          </button>

          {/* ADVERB: Challenge This Person */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectAdverb();
            }}
            className="w-full text-left p-3.5 rounded-2xl border-2 border-purple-200 hover:border-purple-600 hover:bg-purple-50/60 transition-all group flex items-start gap-3 cursor-pointer active:scale-98 shadow-xs"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Swords className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-black text-purple-950 group-hover:text-purple-700 tracking-tight">
                  Adverb
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-600 text-white shadow-2xs">
                  Challenge Person
                </span>
              </div>
              <p className="text-[11.5px] text-slate-600 mt-0.5 leading-snug">
                Challenge this person to an online fight. Write your post callout and attach the Broken Pencil faceoff card!
              </p>
            </div>
          </button>
        </div>

        {/* Footer info tip */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="font-semibold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Arena matchmaking
          </span>
          <span className="text-[10px] text-purple-700 font-bold">
            Interactive Battles
          </span>
        </div>
      </div>
    </div>
  );
};
