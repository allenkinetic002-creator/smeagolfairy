import React, { useState } from 'react';
import { X, Trophy, History, ThumbsUp, Calendar, ChevronRight, Sparkles } from 'lucide-react';
import { BrokenPencilIcon } from './BrokenPencilIcon';
import { FaceoffBattleModal } from './FaceoffBattleModal';

export interface PastChallengeItem {
  id: string;
  title: string;
  opponentName: string;
  opponentHandle: string;
  opponentAvatar: string;
  personName: string;
  personAvatar: string;
  personScore: number;
  opponentScore: number;
  totalVotes: number;
  date: string;
  outcome: 'WIN' | 'LOSS' | 'ACTIVE';
}

interface PastChallengesModalProps {
  isOpen: boolean;
  onClose: () => void;
  personName: string;
  personAvatar?: string;
}

const DEFAULT_PAST_CHALLENGES: PastChallengeItem[] = [
  {
    id: 'pc-1',
    title: 'Who looks Hotter between me Freda pepper or this loser Slimy sticky',
    personName: 'Freda Da. pepper',
    personAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    opponentName: 'Heather Slime',
    opponentHandle: '@heatherslime',
    opponentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    personScore: 52.0,
    opponentScore: 48.0,
    totalVotes: 324095,
    date: 'Yesterday &middot; Finished',
    outcome: 'WIN',
  },
  {
    id: 'pc-2',
    title: 'Autumn Aesthetics Faceoff: Pure Photography vs Mixed Surrealism',
    personName: 'Elena Rostova',
    personAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    opponentName: 'Milo Sterling',
    opponentHandle: '@milo_sculpt',
    opponentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    personScore: 54.2,
    opponentScore: 45.8,
    totalVotes: 184500,
    date: '3 days ago',
    outcome: 'WIN',
  },
  {
    id: 'pc-3',
    title: 'Speed Painting 30min Showdown: Midnight Tokyo vs Cyberpunk Neon',
    personName: 'Elena Rostova',
    personAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    opponentName: 'Sora Takahashi',
    opponentHandle: '@sora_canvas',
    opponentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    personScore: 49.1,
    opponentScore: 50.9,
    totalVotes: 219800,
    date: 'Last week',
    outcome: 'LOSS',
  },
];

export const PastChallengesModal: React.FC<PastChallengesModalProps> = ({
  isOpen,
  onClose,
  personName,
  personAvatar,
}) => {
  const [expandedBattleId, setExpandedBattleId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[460px] max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative select-none animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center p-1.5 shadow-inner">
              <BrokenPencilIcon className="w-8 h-auto" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-amber-100 flex items-center gap-1">
                <span>Verb Mode</span>
                <span>&bull;</span>
                <span>Challenge Records</span>
              </div>
              <h2 className="text-base font-black text-white leading-tight">
                Past Challenges: {personName}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Stats summary bar */}
        <div className="px-4 py-2.5 bg-amber-50/70 border-b border-amber-100 flex items-center justify-between shrink-0 text-slate-800">
          <div className="flex items-center gap-2">
            {personAvatar && (
              <img
                src={personAvatar}
                alt={personName}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-amber-400"
              />
            )}
            <span className="text-[12px] font-extrabold text-slate-900">
              Total Battles: <span className="text-amber-800">3 Fights</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-black">
            <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              2 Wins
            </span>
            <span className="text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
              1 Loss
            </span>
          </div>
        </div>

        {/* Scrollable list of battles */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {DEFAULT_PAST_CHALLENGES.map((challenge) => {
            const isExpanded = expandedBattleId === challenge.id;
            return (
              <div
                key={challenge.id}
                className="border border-slate-200 hover:border-amber-300 rounded-2xl bg-white shadow-2xs hover:shadow-xs transition-all overflow-hidden"
              >
                <div
                  className="p-3.5 cursor-pointer"
                  onClick={() =>
                    setExpandedBattleId(isExpanded ? null : challenge.id)
                  }
                >
                  {/* Top row: Outcome badge + Date */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        challenge.outcome === 'WIN'
                          ? 'bg-[#E51E2B]/10 text-[#E51E2B] border border-[#E51E2B]/20'
                          : 'bg-[#1D3D8F]/10 text-[#1D3D8F] border border-[#1D3D8F]/20'
                      }`}
                    >
                      {challenge.outcome === 'WIN' ? 'WINNER (RED)' : 'DEFEAT'}
                    </span>
                    <span
                      className="text-[10.5px] font-semibold text-slate-400"
                      dangerouslySetInnerHTML={{ __html: challenge.date }}
                    />
                  </div>

                  {/* Challenge Title */}
                  <h3 className="text-[13px] font-black text-slate-900 leading-snug line-clamp-2">
                    {challenge.title}
                  </h3>

                  {/* Faceoff Opponents comparison */}
                  <div className="mt-2.5 flex items-center justify-between bg-slate-50 p-2 rounded-xl">
                    <div className="flex items-center gap-2">
                      <img
                        src={challenge.personAvatar}
                        alt={challenge.personName}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300"
                      />
                      <div className="text-left">
                        <div className="text-[11px] font-black text-slate-900 leading-none">
                          {challenge.personName}
                        </div>
                        <div className="text-[10px] font-bold text-[#E51E2B] mt-0.5">
                          {challenge.personScore.toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] font-black text-slate-400">
                      VS
                    </div>

                    <div className="flex items-center gap-2 flex-row-reverse text-right">
                      <img
                        src={challenge.opponentAvatar}
                        alt={challenge.opponentName}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300"
                      />
                      <div>
                        <div className="text-[11px] font-black text-slate-900 leading-none">
                          {challenge.opponentName}
                        </div>
                        <div className="text-[10px] font-bold text-[#1D3D8F] mt-0.5">
                          {challenge.opponentScore.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar split */}
                  <div className="w-full flex items-center gap-[2px] mt-2">
                    <div
                      className="h-1.5 bg-[#E51E2B] rounded-full"
                      style={{ width: `${challenge.personScore}%` }}
                    />
                    <div
                      className="h-1.5 bg-[#1D3D8F] rounded-full"
                      style={{ width: `${challenge.opponentScore}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[10.5px] text-slate-500 font-semibold">
                    <span>
                      {challenge.totalVotes.toLocaleString()} community votes
                    </span>
                    <span className="text-amber-600 font-bold flex items-center gap-0.5">
                      {isExpanded ? 'Hide faceoff card' : 'View faceoff card'} &rarr;
                    </span>
                  </div>
                </div>

                {/* Expanded full broken pencil faceoff battle card */}
                {isExpanded && (
                  <div className="p-3 bg-slate-50 border-t border-slate-200">
                    <FaceoffBattleModal
                      battleQuestion={challenge.title}
                      redParticipant={{
                        name: challenge.personName,
                        avatar: challenge.personAvatar,
                      }}
                      blueParticipant={{
                        name: challenge.opponentName,
                        avatar: challenge.opponentAvatar,
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 font-medium">
            Broken pencil past challenges archive
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
