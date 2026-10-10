import React, { useState } from 'react';
import {
  Home,
  TrendingUp,
  User,
  Search,
  X,
  Music,
  Heart,
  CornerDownRight,
  Smile,
  Trophy,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Mic,
  Camera,
  Gamepad2,
  Lightbulb,
  Laugh,
  MapPin,
  FlameKindling,
  SlidersHorizontal,
  Clock,
  Plus,
  Video,
} from 'lucide-react';
import postImage from './assets/images/fairy_post_image_1791012530319.jpg';
import elenaAvatar from './assets/images/creator_portrait_elena_1791014499312.jpg';
import topPostPhoto from './assets/images/creator_top_post_1791014513929.jpg';
import charDesignPhoto from './assets/images/char_design_concept_1791018302239.jpg';
import { DMControl } from './components/DMControl';
import { FairyControl } from './components/FairyControl';
import { MatchesScreen } from './components/MatchesScreen';
import { NormalMessagesScreen } from './components/NormalMessagesScreen';
import { InfluenceRatingModal } from './components/InfluenceRatingModal';
import { FairyPotIcon } from './components/FairyPotIcon';
import { AeriFrogIcon } from './components/AeriFrogIcon';
import { AeriFlameIcon } from './components/AeriFlameIcon';
import { AeriHydrantIcon } from './components/AeriHydrantIcon';
import { AeriCommentIcon } from './components/AeriCommentIcon';
import { AeriPhoneIcon } from './components/AeriPhoneIcon';
import { AeriHandPhoneIcon } from './components/AeriHandPhoneIcon';
import { AeriMessageBubbleIcon } from './components/AeriMessageBubbleIcon';
import { AeriDiggingDogIcon } from './components/AeriDiggingDogIcon';
import { AeriGuacamoleBowlIcon } from './components/AeriGuacamoleBowlIcon';
import { AeriMaskedEyesIcon } from './components/AeriMaskedEyesIcon';
import { AeriOneEyeHatGuyIcon } from './components/AeriOneEyeHatGuyIcon';
import { AeriOneEyeGhostIcon } from './components/AeriOneEyeGhostIcon';
import { AeriRaygunIcon } from './components/AeriRaygunIcon';
import { AeriSearchIcon } from './components/AeriSearchIcon';
import { AeriConcentricCircleIcon } from './components/AeriConcentricCircleIcon';
import { AeriHappyFlameIcon } from './components/AeriHappyFlameIcon';
import { AeriStackedChairsIcon } from './components/AeriStackedChairsIcon';
import { AeriThumbsUpIcon } from './components/AeriThumbsUpIcon';
import { AeriMonoblocChairIcon } from './components/AeriMonoblocChairIcon';
import { AeriArrowKeysIcon } from './components/AeriArrowKeysIcon';
import { AeriMindProfileIcon } from './components/AeriMindProfileIcon';
import { AeriProfileUserIcon } from './components/AeriProfileUserIcon';
import { AeriBellIcon } from './components/AeriBellIcon';
import { AeriHorseIcon } from './components/AeriHorseIcon';
import { CreatePostModal, NewPostPayload } from './components/CreatePostModal';

export interface FeedPost {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  isVerified: boolean;
  timeAgo: string;
  location?: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  caption: string;
  tags: string[];
  audioTitle: string;
  likeCount: number;
  isLiked: boolean;
  isTrending?: boolean;
}

interface CommentItem {
  id: string;
  username: string;
  avatarBg: string;
  avatarText: string;
  text: string;
  time: string;
  likes: number;
  isLiked: boolean;
}

interface Creator {
  rank: number;
  name: string;
  handle: string;
  avatarUrl?: string;
  avatarBg: string;
  avatarInitial: string;
  role: string;
  location?: string;
  upvotes: number;
  isUpvoted: boolean;
  isFollowing: boolean;
  category: 'new_artists' | 'comedians' | 'photographers' | 'character_designers' | 'us_top' | 'innovators';
  topPost: {
    title: string;
    imageUrl?: string;
    gradientBg: string;
    likes: string;
    comments: string;
    hasAudio?: boolean;
    audioTitle?: string;
    tag?: string;
  };
}

const DEFAULT_COMMENTS: CommentItem[] = [
  {
    id: '1',
    username: 'maya_sky',
    avatarBg: 'bg-amber-500',
    avatarText: 'M',
    text: 'Where is that yellow coat from?! The lighting is immaculate 💛',
    time: '2h',
    likes: 42,
    isLiked: false,
  },
  {
    id: '2',
    username: 'alexander_v',
    avatarBg: 'bg-indigo-500',
    avatarText: 'A',
    text: "Fairy's feed algorithm is getting so good honestly 🔥",
    time: '4h',
    likes: 19,
    isLiked: true,
  },
  {
    id: '3',
    username: 'jordan.create',
    avatarBg: 'bg-emerald-500',
    avatarText: 'J',
    text: 'The bokeh depth in this shot is absolute perfection 🤌✨',
    time: '5h',
    likes: 8,
    isLiked: false,
  },
  {
    id: '4',
    username: 'charlie_lens',
    avatarBg: 'bg-rose-500',
    avatarText: 'C',
    text: 'Need this camera setting and color grading preset ASAP!',
    time: '6h',
    likes: 5,
    isLiked: false,
  },
];

// Rich datasets for all 6 categories requested by user
const ALL_TOP_CREATORS: Record<string, Creator[]> = {
  new_artists: [
    {
      rank: 1,
      name: 'Elena Rostova',
      handle: '@elena_art',
      avatarUrl: elenaAvatar,
      avatarBg: 'bg-amber-500',
      avatarInitial: 'E',
      role: 'Debut Oil & Mixed Media',
      location: 'Berlin / NYC',
      upvotes: 48290,
      isUpvoted: false,
      isFollowing: true,
      category: 'new_artists',
      topPost: {
        title: 'Twilight Pavilion — Light & brutalist geometry',
        imageUrl: topPostPhoto,
        gradientBg: 'from-amber-600 to-indigo-900',
        likes: '12.4k',
        comments: '640',
        hasAudio: true,
        audioTitle: 'Solitude Ambient No. 4',
        tag: 'Exhibition',
      },
    },
    {
      rank: 2,
      name: 'Milo Sterling',
      handle: '@milo_sculpt',
      avatarBg: 'bg-purple-600',
      avatarInitial: 'M',
      role: 'Kinetic Glass & Resin',
      upvotes: 41200,
      isUpvoted: false,
      isFollowing: false,
      category: 'new_artists',
      topPost: {
        title: 'Refracting Sunset Through 40 Hand-blown Spheres',
        gradientBg: 'from-purple-700 via-pink-600 to-amber-500',
        likes: '9.8k',
        comments: '430',
        tag: 'Sculpture',
      },
    },
    {
      rank: 3,
      name: 'Sora Takahashi',
      handle: '@sora_canvas',
      avatarBg: 'bg-sky-600',
      avatarInitial: 'S',
      role: 'Neo-Tokyo Acrylic Murals',
      upvotes: 38100,
      isUpvoted: false,
      isFollowing: false,
      category: 'new_artists',
      topPost: {
        title: '60ft Wall in Shibuya: Dragon of the Data Stream',
        gradientBg: 'from-blue-600 to-cyan-400',
        likes: '8.4k',
        comments: '390',
        tag: 'Mural',
      },
    },
    {
      rank: 4,
      name: 'Camille Laurent',
      handle: '@camille_gouache',
      avatarBg: 'bg-rose-500',
      avatarInitial: 'C',
      role: 'Botanical Gouache Studies',
      upvotes: 33400,
      isUpvoted: false,
      isFollowing: false,
      category: 'new_artists',
      topPost: {
        title: 'Midnight Orchids in Provence Gardens',
        gradientBg: 'from-emerald-700 to-rose-900',
        likes: '7.1k',
        comments: '280',
        tag: 'Gouache',
      },
    },
    {
      rank: 5,
      name: 'Arlo Vance',
      handle: '@arlo_ink',
      avatarBg: 'bg-stone-800',
      avatarInitial: 'A',
      role: 'Linocut & Hand-Press Prints',
      upvotes: 29800,
      isUpvoted: false,
      isFollowing: false,
      category: 'new_artists',
      topPost: {
        title: 'Sea of Thieves — 5-Layer Color Relief Print',
        gradientBg: 'from-stone-900 to-amber-800',
        likes: '6.5k',
        comments: '240',
      },
    },
    {
      rank: 6,
      name: 'Freja Lindholm',
      handle: '@freja_nordic',
      avatarBg: 'bg-teal-600',
      avatarInitial: 'F',
      role: 'Fjord Atmospheric Watercolors',
      upvotes: 26500,
      isUpvoted: false,
      isFollowing: false,
      category: 'new_artists',
      topPost: {
        title: 'Morning Fog Over Lofoten Peaks',
        gradientBg: 'from-teal-800 to-slate-900',
        likes: '5.9k',
        comments: '210',
      },
    },
    {
      rank: 7,
      name: 'Dante Ruiz',
      handle: '@dante_oil',
      avatarBg: 'bg-red-700',
      avatarInitial: 'D',
      role: 'Chiaroscuro Modern Portraiture',
      upvotes: 24100,
      isUpvoted: false,
      isFollowing: false,
      category: 'new_artists',
      topPost: {
        title: 'The Alchemist in Modern Denim',
        gradientBg: 'from-red-900 via-amber-900 to-black',
        likes: '5.2k',
        comments: '195',
      },
    },
    {
      rank: 8,
      name: 'Tara Bell',
      handle: '@tara_ceramics',
      avatarBg: 'bg-amber-700',
      avatarInitial: 'T',
      role: 'Raku-Fired Organic Ceramics',
      upvotes: 21900,
      isUpvoted: false,
      isFollowing: false,
      category: 'new_artists',
      topPost: {
        title: 'Smoked Copper Lustre Vessels Series',
        gradientBg: 'from-amber-800 to-stone-950',
        likes: '4.7k',
        comments: '172',
      },
    },
    {
      rank: 9,
      name: 'Zephyr Cole',
      handle: '@zephyr_mixed',
      avatarBg: 'bg-indigo-700',
      avatarInitial: 'Z',
      role: 'Textured Resin & Gold Leaf',
      upvotes: 19400,
      isUpvoted: false,
      isFollowing: false,
      category: 'new_artists',
      topPost: {
        title: 'Celestial Tides: 24k Gold on Raw Linen',
        gradientBg: 'from-indigo-950 to-blue-800',
        likes: '4.1k',
        comments: '150',
      },
    },
    {
      rank: 10,
      name: 'Nina Kostova',
      handle: '@nina_expression',
      avatarBg: 'bg-violet-600',
      avatarInitial: 'N',
      role: 'Large Scale Colorfield Panels',
      upvotes: 17200,
      isUpvoted: false,
      isFollowing: false,
      category: 'new_artists',
      topPost: {
        title: 'Magenta Overcast at 6 AM',
        gradientBg: 'from-fuchsia-800 to-purple-950',
        likes: '3.6k',
        comments: '135',
      },
    },
  ],

  comedians: [
    {
      rank: 1,
      name: "Dave 'Dice' Miller",
      handle: '@dicemiller',
      avatarBg: 'bg-yellow-500',
      avatarInitial: 'D',
      role: 'Stand-up & Crowd Work Virtuoso',
      location: 'New York, NY',
      upvotes: 56400,
      isUpvoted: false,
      isFollowing: true,
      category: 'comedians',
      topPost: {
        title: "Why adults literally cannot make new friends after 25 😂",
        gradientBg: 'from-yellow-600 to-red-800',
        likes: '28.4k',
        comments: '1.4k',
        hasAudio: true,
        audioTitle: 'Comedy Cellar Live Tape',
        tag: 'Standup',
      },
    },
    {
      rank: 2,
      name: 'Samira Watts',
      handle: '@samiracomedy',
      avatarBg: 'bg-pink-600',
      avatarInitial: 'S',
      role: 'Observational Satire & Podcasts',
      upvotes: 49100,
      isUpvoted: true,
      isFollowing: false,
      category: 'comedians',
      topPost: {
        title: "My therapist said stop doomscrolling so now I doom-shop instead",
        gradientBg: 'from-pink-600 to-purple-900',
        likes: '22.1k',
        comments: '980',
        tag: 'Sketch',
      },
    },
    {
      rank: 3,
      name: 'Tyler Cruz',
      handle: '@tyler_punchlines',
      avatarBg: 'bg-emerald-600',
      avatarInitial: 'T',
      role: 'Everyday Absurdity & Roasts',
      location: 'Philadelphia, PA',
      upvotes: 43200,
      isUpvoted: false,
      isFollowing: false,
      category: 'comedians',
      topPost: {
        title: "Airport TSA when you accidentally leave a half-full Poland Spring",
        gradientBg: 'from-emerald-700 to-cyan-900',
        likes: '19.8k',
        comments: '820',
        tag: 'Viral Clip',
      },
    },
    {
      rank: 4,
      name: 'Priya Patel',
      handle: '@priyastandup',
      avatarBg: 'bg-orange-600',
      avatarInitial: 'P',
      role: 'First-Gen Immigrant Stories',
      upvotes: 38500,
      isUpvoted: false,
      isFollowing: false,
      category: 'comedians',
      topPost: {
        title: "Telling my parents I want to do stand-up instead of med school",
        gradientBg: 'from-orange-600 to-amber-900',
        likes: '17.3k',
        comments: '710',
      },
    },
    {
      rank: 5,
      name: 'Liam Brody',
      handle: '@brody_improv',
      avatarBg: 'bg-blue-600',
      avatarInitial: 'L',
      role: 'Crowd Work & Unscripted Chaos',
      location: 'Boston, MA',
      upvotes: 34100,
      isUpvoted: false,
      isFollowing: false,
      category: 'comedians',
      topPost: {
        title: "Interviewing the couple in front row who met on Duolingo Klingon",
        gradientBg: 'from-blue-700 to-indigo-950',
        likes: '15.6k',
        comments: '640',
      },
    },
    {
      rank: 6,
      name: 'Chloe Sparks',
      handle: '@chloesparks',
      avatarBg: 'bg-purple-600',
      avatarInitial: 'C',
      role: 'Dating in 2026 Horror Parodies',
      location: 'Chicago, IL',
      upvotes: 30900,
      isUpvoted: false,
      isFollowing: false,
      category: 'comedians',
      topPost: {
        title: "He said 'I don't believe in labels' so I put a label maker on his forehead",
        gradientBg: 'from-purple-600 to-fuchsia-900',
        likes: '14.2k',
        comments: '580',
      },
    },
    {
      rank: 7,
      name: 'Marcus Chen',
      handle: '@marcusjoke',
      avatarBg: 'bg-cyan-600',
      avatarInitial: 'M',
      role: 'Tech Worker Existential Dread',
      upvotes: 27800,
      isUpvoted: false,
      isFollowing: false,
      category: 'comedians',
      topPost: {
        title: "Explaining to my grandmother what 'Cloud Solutions Architect' means",
        gradientBg: 'from-cyan-700 to-blue-900',
        likes: '12.9k',
        comments: '510',
      },
    },
    {
      rank: 8,
      name: "Sarah 'Sass' O'Neill",
      handle: '@sassoneill',
      avatarBg: 'bg-rose-600',
      avatarInitial: 'S',
      role: 'Dry Wit & Irish Irony',
      upvotes: 24500,
      isUpvoted: false,
      isFollowing: false,
      category: 'comedians',
      topPost: {
        title: "My dog has better wellness perks than my corporate health insurance",
        gradientBg: 'from-rose-700 to-stone-900',
        likes: '11.4k',
        comments: '460',
      },
    },
    {
      rank: 9,
      name: 'Benny Blanco-style',
      handle: '@bennylaughs',
      avatarBg: 'bg-amber-600',
      avatarInitial: 'B',
      role: 'Musical Comedy & Song Parodies',
      upvotes: 22100,
      isUpvoted: false,
      isFollowing: false,
      category: 'comedians',
      topPost: {
        title: "If Taylor Swift wrote songs about forgetting laundry in the washer",
        gradientBg: 'from-amber-600 to-orange-950',
        likes: '10.3k',
        comments: '410',
      },
    },
    {
      rank: 10,
      name: 'Zack & Zoe Duo',
      handle: '@zackandzoe',
      avatarBg: 'bg-teal-600',
      avatarInitial: 'Z',
      role: 'Rapid-fire Married Couple Skits',
      upvotes: 19800,
      isUpvoted: false,
      isFollowing: false,
      category: 'comedians',
      topPost: {
        title: "Deciding what to eat for dinner: A 5-act Shakespearean tragedy",
        gradientBg: 'from-teal-700 to-slate-900',
        likes: '9.1k',
        comments: '370',
      },
    },
  ],

  photographers: [
    {
      rank: 1,
      name: 'Marcus Vance',
      handle: '@marcus_vision',
      avatarBg: 'bg-indigo-600',
      avatarInitial: 'M',
      role: '35mm Film & Golden Hour Master',
      location: 'Austin, TX',
      upvotes: 52100,
      isUpvoted: true,
      isFollowing: true,
      category: 'photographers',
      topPost: {
        title: 'Golden Hour Drift in Desert Sand (Kodak Portra 400)',
        imageUrl: postImage,
        gradientBg: 'from-amber-500 to-teal-800',
        likes: '24.8k',
        comments: '812',
        hasAudio: true,
        audioTitle: 'Desert Wind Ambient',
        tag: 'Analog Film',
      },
    },
    {
      rank: 2,
      name: 'Alex Morgan',
      handle: '@amorgan_lens',
      avatarBg: 'bg-blue-600',
      avatarInitial: 'A',
      role: 'Cyberpunk Cyber-Street & Neon',
      location: 'Tokyo / SF',
      upvotes: 46800,
      isUpvoted: false,
      isFollowing: false,
      category: 'photographers',
      topPost: {
        title: 'Rain-soaked Neon Crosswalk in Shinjuku at 3 AM',
        imageUrl: topPostPhoto,
        gradientBg: 'from-cyan-600 to-indigo-900',
        likes: '21.5k',
        comments: '740',
        tag: 'Night City',
      },
    },
    {
      rank: 3,
      name: 'Liam O’Connor',
      handle: '@liam_wander',
      avatarBg: 'bg-cyan-700',
      avatarInitial: 'L',
      role: 'Nordic Explorer & Glacial Drone',
      location: 'Reykjavik',
      upvotes: 41900,
      isUpvoted: false,
      isFollowing: false,
      category: 'photographers',
      topPost: {
        title: 'Sub-Zero Fjord Ice Reflections under Aurora Borealis',
        gradientBg: 'from-cyan-600 to-blue-950',
        likes: '18.9k',
        comments: '630',
        tag: 'Landscape',
      },
    },
    {
      rank: 4,
      name: 'Noor Al-Mansoor',
      handle: '@noor_stories',
      avatarBg: 'bg-emerald-600',
      avatarInitial: 'N',
      role: 'Middle Eastern Cultural Documentary',
      location: 'Dubai / Cairo',
      upvotes: 37400,
      isUpvoted: false,
      isFollowing: false,
      category: 'photographers',
      topPost: {
        title: 'Historic Quarters at Twilight: Shadows and Frankincense',
        gradientBg: 'from-emerald-700 to-teal-950',
        likes: '16.4k',
        comments: '520',
      },
    },
    {
      rank: 5,
      name: 'Maya Chen',
      handle: '@mayachen_photo',
      avatarBg: 'bg-stone-700',
      avatarInitial: 'M',
      role: 'Monochrome Architectural Geometry',
      location: 'Chicago, IL',
      upvotes: 33800,
      isUpvoted: false,
      isFollowing: false,
      category: 'photographers',
      topPost: {
        title: 'Brutalist Curves in Black & White: Concrete Sonata',
        gradientBg: 'from-stone-800 to-black',
        likes: '14.8k',
        comments: '460',
      },
    },
    {
      rank: 6,
      name: 'Julian Rossi',
      handle: '@rossi_street',
      avatarBg: 'bg-amber-600',
      avatarInitial: 'J',
      role: 'Italian Neorealist Street Life',
      location: 'Naples, Italy',
      upvotes: 30200,
      isUpvoted: false,
      isFollowing: false,
      category: 'photographers',
      topPost: {
        title: 'Vespa Mechanics Arguing in Alleyway Golden Mist',
        gradientBg: 'from-amber-700 to-orange-950',
        likes: '13.1k',
        comments: '410',
      },
    },
    {
      rank: 7,
      name: 'Hannah Berg',
      handle: '@hannah_wild',
      avatarBg: 'bg-emerald-800',
      avatarInitial: 'H',
      role: 'Endangered Wildlife Conservation',
      location: 'Kenya / Norway',
      upvotes: 27100,
      isUpvoted: false,
      isFollowing: false,
      category: 'photographers',
      topPost: {
        title: 'Snow Leopard Mother and Cub in Himalayan Blizzard',
        gradientBg: 'from-emerald-900 to-slate-950',
        likes: '11.8k',
        comments: '380',
      },
    },
    {
      rank: 8,
      name: 'Diego Alvarez',
      handle: '@diego_film',
      avatarBg: 'bg-red-600',
      avatarInitial: 'D',
      role: 'Medium Format Cuban Portraits',
      location: 'Havana',
      upvotes: 24300,
      isUpvoted: false,
      isFollowing: false,
      category: 'photographers',
      topPost: {
        title: 'Hasselblad 500C: The Rooftop Cigar Craftsman',
        gradientBg: 'from-red-800 to-amber-950',
        likes: '10.5k',
        comments: '340',
      },
    },
    {
      rank: 9,
      name: 'Zoe Analog',
      handle: '@zoe_analog',
      avatarBg: 'bg-fuchsia-600',
      avatarInitial: 'Z',
      role: 'Harsh Flash & Rave Culture',
      location: 'London',
      upvotes: 21900,
      isUpvoted: false,
      isFollowing: false,
      category: 'photographers',
      topPost: {
        title: 'Basslines in the Basement: 28mm Direct Flash',
        gradientBg: 'from-fuchsia-900 to-black',
        likes: '9.4k',
        comments: '310',
      },
    },
    {
      rank: 10,
      name: 'Finn Taylor',
      handle: '@finn_aerial',
      avatarBg: 'bg-blue-800',
      avatarInitial: 'F',
      role: 'High-Altitude Volcanic Survey',
      location: 'New Zealand',
      upvotes: 19500,
      isUpvoted: false,
      isFollowing: false,
      category: 'photographers',
      topPost: {
        title: 'Active Crater Ridge at Sunrise: Sulfur & Clouds',
        gradientBg: 'from-blue-900 to-orange-950',
        likes: '8.7k',
        comments: '290',
      },
    },
  ],

  character_designers: [
    {
      rank: 1,
      name: 'Jin Kazama-art',
      handle: '@jin_concept',
      avatarBg: 'bg-red-600',
      avatarInitial: 'J',
      role: 'Cyberpunk & Mecha Character Lead',
      upvotes: 54800,
      isUpvoted: false,
      isFollowing: true,
      category: 'character_designers',
      topPost: {
        title: 'Cyberpunk Ronin & Exo-Katana Full Character Sheet',
        imageUrl: charDesignPhoto,
        gradientBg: 'from-red-600 to-indigo-900',
        likes: '25.6k',
        comments: '1.1k',
        tag: 'Model Sheet',
      },
    },
    {
      rank: 2,
      name: 'Aria Creature',
      handle: '@aria_creature',
      avatarBg: 'bg-purple-600',
      avatarInitial: 'A',
      role: 'Mythical Chimera & Studio Ghibli Style',
      upvotes: 48900,
      isUpvoted: true,
      isFollowing: false,
      category: 'character_designers',
      topPost: {
        title: 'Forest Spirit of the Lost Constellations (Turnaround)',
        gradientBg: 'from-purple-600 via-pink-700 to-amber-400',
        likes: '22.4k',
        comments: '890',
        tag: 'Creature Design',
      },
    },
    {
      rank: 3,
      name: 'Devontae Cole',
      handle: '@dcole_motion',
      avatarBg: 'bg-blue-600',
      avatarInitial: 'D',
      role: 'Sci-Fi Combat Suit & Hard Surface',
      upvotes: 43700,
      isUpvoted: false,
      isFollowing: false,
      category: 'character_designers',
      topPost: {
        title: 'Deep Void Salvage Specialist Armor Design',
        gradientBg: 'from-blue-700 to-cyan-900',
        likes: '19.2k',
        comments: '760',
      },
    },
    {
      rank: 4,
      name: 'Lyra Sterling',
      handle: '@lyra_anime',
      avatarBg: 'bg-pink-500',
      avatarInitial: 'L',
      role: 'Fantasy RPG Hero Party Lineup',
      upvotes: 39100,
      isUpvoted: false,
      isFollowing: false,
      category: 'character_designers',
      topPost: {
        title: 'The Alchemist Princess & Her Clockwork Familiar',
        gradientBg: 'from-pink-600 to-rose-900',
        likes: '17.1k',
        comments: '640',
      },
    },
    {
      rank: 5,
      name: 'Rex Holloway',
      handle: '@rexholloway',
      avatarBg: 'bg-amber-700',
      avatarInitial: 'R',
      role: 'Post-Apocalyptic Scavenger Costumes',
      upvotes: 35200,
      isUpvoted: false,
      isFollowing: false,
      category: 'character_designers',
      topPost: {
        title: 'Scrap-Armor Nomad Clan: Weapon & Gear Breakdown',
        gradientBg: 'from-amber-700 to-stone-900',
        likes: '15.3k',
        comments: '580',
      },
    },
    {
      rank: 6,
      name: 'Yuki Matsuoka',
      handle: '@yuki_mech',
      avatarBg: 'bg-teal-600',
      avatarInitial: 'Y',
      role: 'Modular Android Police Unit Design',
      upvotes: 31600,
      isUpvoted: false,
      isFollowing: false,
      category: 'character_designers',
      topPost: {
        title: 'Autonomous Enforcer Unit 09: Facial Expressions',
        gradientBg: 'from-teal-700 to-blue-950',
        likes: '13.8k',
        comments: '510',
      },
    },
    {
      rank: 7,
      name: 'Tanya Petrova',
      handle: '@tanya_fantasy',
      avatarBg: 'bg-emerald-700',
      avatarInitial: 'T',
      role: 'Dark Slavic Folklore Creatures',
      upvotes: 28400,
      isUpvoted: false,
      isFollowing: false,
      category: 'character_designers',
      topPost: {
        title: 'Baba Yaga in 2099: Cyber-Hut on Hydraulic Legs',
        gradientBg: 'from-emerald-800 to-stone-950',
        likes: '12.1k',
        comments: '460',
      },
    },
    {
      rank: 8,
      name: 'Caleb Shaw',
      handle: '@cshaw_pixel',
      avatarBg: 'bg-indigo-600',
      avatarInitial: 'C',
      role: '16-bit RPG Pixel Bosses & Animations',
      upvotes: 25300,
      isUpvoted: false,
      isFollowing: false,
      category: 'character_designers',
      topPost: {
        title: 'Pixel Dragon of Iron Mountain: 12-Frame Sprite Sheet',
        gradientBg: 'from-indigo-700 to-purple-950',
        likes: '10.9k',
        comments: '410',
      },
    },
    {
      rank: 9,
      name: 'Mira Vance',
      handle: '@mira_creatures',
      avatarBg: 'bg-cyan-600',
      avatarInitial: 'M',
      role: 'Deep Abyss Bioluminescent Humanoids',
      upvotes: 22800,
      isUpvoted: false,
      isFollowing: false,
      category: 'character_designers',
      topPost: {
        title: 'Abyssal Trench Siren: Phosphorescent Skin Texture',
        gradientBg: 'from-cyan-700 to-slate-950',
        likes: '9.8k',
        comments: '360',
      },
    },
    {
      rank: 10,
      name: 'Boris Wolfe',
      handle: '@boris_villains',
      avatarBg: 'bg-slate-700',
      avatarInitial: 'B',
      role: 'Dieselpunk Villain & Airship Commanders',
      upvotes: 20100,
      isUpvoted: false,
      isFollowing: false,
      category: 'character_designers',
      topPost: {
        title: 'Grand Admiral Vane: Heavy Trenchcoat & Bionic Monocle',
        gradientBg: 'from-slate-800 to-black',
        likes: '8.9k',
        comments: '320',
      },
    },
  ],

  us_top: [
    {
      rank: 1,
      name: 'Elena Rostova',
      handle: '@elena_art',
      avatarUrl: elenaAvatar,
      avatarBg: 'bg-amber-500',
      avatarInitial: 'E',
      role: 'Creative Director',
      location: 'Los Angeles, CA',
      upvotes: 48290,
      isUpvoted: false,
      isFollowing: true,
      category: 'us_top',
      topPost: {
        title: 'Twilight Pavilion in Joshua Tree',
        imageUrl: topPostPhoto,
        gradientBg: 'from-amber-600 to-indigo-900',
        likes: '12.4k',
        comments: '640',
        tag: 'LA Arts',
      },
    },
    {
      rank: 2,
      name: 'Marcus Vance',
      handle: '@marcus_vision',
      avatarBg: 'bg-indigo-600',
      avatarInitial: 'M',
      role: 'Cinematographer & 35mm',
      location: 'Austin, TX',
      upvotes: 39710,
      isUpvoted: true,
      isFollowing: false,
      category: 'us_top',
      topPost: {
        title: 'Golden Hour Drift in Desert Sand',
        imageUrl: postImage,
        gradientBg: 'from-amber-500 to-teal-800',
        likes: '10.8k',
        comments: '812',
        tag: 'Austin Film',
      },
    },
    {
      rank: 3,
      name: "Dave 'Dice' Miller",
      handle: '@dicemiller',
      avatarBg: 'bg-yellow-500',
      avatarInitial: 'D',
      role: 'Comedy Cellar Resident',
      location: 'New York, NY',
      upvotes: 37400,
      isUpvoted: false,
      isFollowing: false,
      category: 'us_top',
      topPost: {
        title: 'Late Night Sets in Greenwich Village',
        gradientBg: 'from-yellow-600 to-red-800',
        likes: '9.6k',
        comments: '710',
        tag: 'NYC Comedy',
      },
    },
    {
      rank: 4,
      name: 'Sofia Morales',
      handle: '@sofia_vibes',
      avatarBg: 'bg-rose-500',
      avatarInitial: 'S',
      role: 'Streetwear & Art Director',
      location: 'Miami, FL',
      upvotes: 34200,
      isUpvoted: false,
      isFollowing: false,
      category: 'us_top',
      topPost: {
        title: 'Art Basel Runway: Ochre & Terracotta Drop',
        gradientBg: 'from-orange-500 to-rose-700',
        likes: '8.8k',
        comments: '580',
        tag: 'Miami Fashion',
      },
    },
    {
      rank: 5,
      name: 'Devontae Cole',
      handle: '@dcole_motion',
      avatarBg: 'bg-blue-600',
      avatarInitial: 'D',
      role: 'Generative 3D Artist',
      location: 'Atlanta, GA',
      upvotes: 31500,
      isUpvoted: false,
      isFollowing: false,
      category: 'us_top',
      topPost: {
        title: 'Atlanta Creative Tech: Gravity Disconnect',
        gradientBg: 'from-blue-600 to-cyan-900',
        likes: '7.9k',
        comments: '490',
        tag: 'ATL Tech',
      },
    },
    {
      rank: 6,
      name: 'Kai Takahashi',
      handle: '@kai_minimal',
      avatarBg: 'bg-slate-800',
      avatarInitial: 'K',
      role: 'Typographer & UI Architect',
      location: 'San Francisco, CA',
      upvotes: 28900,
      isUpvoted: false,
      isFollowing: false,
      category: 'us_top',
      topPost: {
        title: 'SF Modernism: Fog & Raw Concrete',
        gradientBg: 'from-slate-700 to-slate-950',
        likes: '7.2k',
        comments: '410',
      },
    },
    {
      rank: 7,
      name: 'Chloe Sparks',
      handle: '@chloesparks',
      avatarBg: 'bg-purple-600',
      avatarInitial: 'C',
      role: 'The Second City Comedian',
      location: 'Chicago, IL',
      upvotes: 26100,
      isUpvoted: false,
      isFollowing: false,
      category: 'us_top',
      topPost: {
        title: 'Winter Survival Guide for Midwesterners',
        gradientBg: 'from-purple-600 to-fuchsia-900',
        likes: '6.5k',
        comments: '370',
      },
    },
    {
      rank: 8,
      name: 'Zephyr Cole',
      handle: '@zephyr_mixed',
      avatarBg: 'bg-emerald-700',
      avatarInitial: 'Z',
      role: 'Timber & Gold Artisan',
      location: 'Seattle, WA',
      upvotes: 23400,
      isUpvoted: false,
      isFollowing: false,
      category: 'us_top',
      topPost: {
        title: 'Pacific Rain Cedar Carvings Volume 4',
        gradientBg: 'from-emerald-800 to-teal-950',
        likes: '5.8k',
        comments: '320',
      },
    },
    {
      rank: 9,
      name: 'Tyler Cruz',
      handle: '@tyler_punchlines',
      avatarBg: 'bg-orange-600',
      avatarInitial: 'T',
      role: 'Comedy Podcaster',
      location: 'Philadelphia, PA',
      upvotes: 21200,
      isUpvoted: false,
      isFollowing: false,
      category: 'us_top',
      topPost: {
        title: 'Rittenhouse Square Crowd Roast Special',
        gradientBg: 'from-orange-600 to-amber-900',
        likes: '5.1k',
        comments: '290',
      },
    },
    {
      rank: 10,
      name: 'Liam Brody',
      handle: '@brody_improv',
      avatarBg: 'bg-blue-700',
      avatarInitial: 'L',
      role: 'Improv Coach & Creator',
      location: 'Boston, MA',
      upvotes: 18900,
      isUpvoted: false,
      isFollowing: false,
      category: 'us_top',
      topPost: {
        title: 'Boston Theater District Pop-up Show',
        gradientBg: 'from-blue-700 to-slate-900',
        likes: '4.6k',
        comments: '260',
      },
    },
  ],

  innovators: [
    {
      rank: 1,
      name: 'Dr. Aris Thorne',
      handle: '@aris_neuro',
      avatarBg: 'bg-violet-700',
      avatarInitial: 'A',
      role: 'Brain-Computer Sound Synthesis',
      location: 'MIT Media Lab',
      upvotes: 58200,
      isUpvoted: false,
      isFollowing: true,
      category: 'innovators',
      topPost: {
        title: 'Generating Ambient Harmonies from Real-Time Alpha Waves',
        imageUrl: topPostPhoto,
        gradientBg: 'from-violet-800 to-indigo-950',
        likes: '29.3k',
        comments: '1.2k',
        hasAudio: true,
        audioTitle: 'Neural Frequency No. 7',
        tag: 'Neurotech',
      },
    },
    {
      rank: 2,
      name: 'Sarah Lin',
      handle: '@slin_quantum',
      avatarBg: 'bg-cyan-600',
      avatarInitial: 'S',
      role: 'WebGPU Quantum Visualizer',
      location: 'CERN / Stanford',
      upvotes: 51700,
      isUpvoted: true,
      isFollowing: false,
      category: 'innovators',
      topPost: {
        title: 'Visualizing 64-Qubit Entanglement in 120 FPS WebAssembly',
        gradientBg: 'from-cyan-600 to-blue-900',
        likes: '24.1k',
        comments: '890',
        tag: 'Quantum Tech',
      },
    },
    {
      rank: 3,
      name: 'Victor Sterling',
      handle: '@victor_haptics',
      avatarBg: 'bg-emerald-600',
      avatarInitial: 'V',
      role: 'Micro-Fluidic Haptic Textiles',
      location: 'Tokyo Tech',
      upvotes: 46200,
      isUpvoted: false,
      isFollowing: false,
      category: 'innovators',
      topPost: {
        title: 'Gloves that Let You Feel Digital Textures Like Silk and Sandstone',
        gradientBg: 'from-emerald-700 to-teal-950',
        likes: '20.8k',
        comments: '780',
        tag: 'Haptics',
      },
    },
    {
      rank: 4,
      name: 'Amara Okafor',
      handle: '@amara_solar',
      avatarBg: 'bg-amber-600',
      avatarInitial: 'A',
      role: 'Transparent Perovskite Glass',
      location: 'Cambridge',
      upvotes: 42100,
      isUpvoted: false,
      isFollowing: false,
      category: 'innovators',
      topPost: {
        title: 'Skyscraper Windows that Generate 15% Power without Tint',
        gradientBg: 'from-amber-600 to-yellow-900',
        likes: '18.4k',
        comments: '670',
        tag: 'CleanTech',
      },
    },
    {
      rank: 5,
      name: 'Devontae Cole',
      handle: '@dcole_motion',
      avatarBg: 'bg-blue-600',
      avatarInitial: 'D',
      role: 'Neural Physics Engines',
      location: 'Atlanta',
      upvotes: 38600,
      isUpvoted: false,
      isFollowing: false,
      category: 'innovators',
      topPost: {
        title: 'Zero-Compute Cloth Simulation Running on Mobile Web Browsers',
        gradientBg: 'from-blue-600 to-indigo-900',
        likes: '16.2k',
        comments: '580',
      },
    },
    {
      rank: 6,
      name: 'Dr. Kenji Sato',
      handle: '@kenji_biomimic',
      avatarBg: 'bg-stone-700',
      avatarInitial: 'K',
      role: 'Mycelium Self-Healing Bio-Concrete',
      location: 'Kyoto',
      upvotes: 34900,
      isUpvoted: false,
      isFollowing: false,
      category: 'innovators',
      topPost: {
        title: 'Cracked Road Repairs Itself After 48h Rain Using Spore Network',
        gradientBg: 'from-stone-800 to-slate-950',
        likes: '14.5k',
        comments: '510',
      },
    },
    {
      rank: 7,
      name: 'Rachel Green-tech',
      handle: '@rachel_algae',
      avatarBg: 'bg-teal-600',
      avatarInitial: 'R',
      role: 'Bioluminescent Urban Light Columns',
      location: 'Amsterdam',
      upvotes: 31200,
      isUpvoted: false,
      isFollowing: false,
      category: 'innovators',
      topPost: {
        title: 'Zero-Electricity Park Illumination via Genetically Tuned Algae',
        gradientBg: 'from-teal-700 to-emerald-950',
        likes: '13.1k',
        comments: '460',
      },
    },
    {
      rank: 8,
      name: 'Theo Kinetic',
      handle: '@theo_kinetic',
      avatarBg: 'bg-orange-700',
      avatarInitial: 'T',
      role: 'Wind-Propelled Mechanical Automata',
      location: 'The Hague',
      upvotes: 27800,
      isUpvoted: false,
      isFollowing: false,
      category: 'innovators',
      topPost: {
        title: 'Giant 40-Legged Beach Walker Built Entirely of Recycled PVC',
        gradientBg: 'from-orange-700 to-amber-950',
        likes: '11.8k',
        comments: '410',
      },
    },
    {
      rank: 9,
      name: 'Mira Vance',
      handle: '@mira_audio_dsp',
      avatarBg: 'bg-purple-600',
      avatarInitial: 'M',
      role: 'Spatial Audio Raytracing on Edge Chips',
      location: 'London',
      upvotes: 24700,
      isUpvoted: false,
      isFollowing: false,
      category: 'innovators',
      topPost: {
        title: 'Full Acoustic Room Reverberation with 0.8ms Latency',
        gradientBg: 'from-purple-700 to-violet-950',
        likes: '10.3k',
        comments: '360',
      },
    },
    {
      rank: 10,
      name: 'Jax Cooper',
      handle: '@jax_exo',
      avatarBg: 'bg-slate-800',
      avatarInitial: 'J',
      role: 'Titanium SLS Pediatric Exoskeletons',
      location: 'Denver, CO',
      upvotes: 21900,
      isUpvoted: false,
      isFollowing: false,
      category: 'innovators',
      topPost: {
        title: 'Ultralight 2.2 lb Walking Assist for Children with Cerebral Palsy',
        gradientBg: 'from-slate-800 to-black',
        likes: '9.4k',
        comments: '330',
      },
    },
  ],
};

const CATEGORY_TABS = [
  { id: 'new_artists', label: 'New Artists', icon: Mic, emoji: '🎤' },
  { id: 'comedians', label: 'Comedians', icon: Laugh, emoji: '🎭' },
  { id: 'photographers', label: 'Photographers', icon: Camera, emoji: '📸' },
  { id: 'character_designers', label: 'Character Designers', icon: Gamepad2, emoji: '👾' },
  { id: 'us_top', label: 'Top 10 U.S.', icon: MapPin, emoji: '🇺🇸' },
  { id: 'innovators', label: 'Innovators', icon: Lightbulb, emoji: '💡' },
];

export default function App() {
  // Nav index: 0 = Home (Post Screen), 1 = Thumbs Up (Top 10 People Leaderboard), 2 = Comments, 3 = Trending, 4 = Profile
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([
    {
      id: 'post-default-elena',
      authorName: 'Elena Vance',
      authorHandle: '@elena_aeri',
      authorAvatar: elenaAvatar,
      isVerified: true,
      timeAgo: '2h ago',
      location: 'Kyoto, Japan',
      mediaType: 'image',
      mediaUrl: postImage,
      caption: 'Golden hour in the enchanted woods 🧚✨ Caught between autumn mist and warm amber light. Where should we wander next?',
      tags: ['#fairy', '#autumnlight', '#aeri', '#dreamscape'],
      audioTitle: 'Original Audio',
      likeCount: 2450,
      isLiked: false,
      isTrending: true,
    },
  ]);

  const handlePublishPost = (payload: NewPostPayload) => {
    const newPost: FeedPost = {
      id: 'post-' + Date.now(),
      authorName: 'Elena Vance',
      authorHandle: '@elena_aeri',
      authorAvatar: elenaAvatar,
      isVerified: true,
      timeAgo: 'Just now',
      location: payload.location,
      mediaType: payload.mediaType,
      mediaUrl: payload.mediaUrl,
      caption: payload.caption,
      tags: payload.tags,
      audioTitle: payload.audioTitle,
      likeCount: 1,
      isLiked: true,
      isTrending: true,
    };
    setFeedPosts((prev) => [newPost, ...prev]);
  };

  const handleTogglePostLike = (postId: string) => {
    setFeedPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextLiked = !p.isLiked;
          return {
            ...p,
            isLiked: nextLiked,
            likeCount: nextLiked ? p.likeCount + 1 : p.likeCount - 1,
          };
        }
        return p;
      })
    );
  };

  // Comments state
  const [commentType, setCommentType] = useState<'inline-feed' | 'discussion-card' | 'floating-drawer'>('inline-feed');
  const [comments, setComments] = useState<CommentItem[]>(DEFAULT_COMMENTS);
  const [inputComment, setInputComment] = useState('');
  const [totalComments, setTotalComments] = useState(812);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Top 10 Creators Categories
  const [selectedCategory, setSelectedCategory] = useState<string>('new_artists');
  const [creatorsData, setCreatorsData] = useState<Record<string, Creator[]>>(ALL_TOP_CREATORS);
  const [previewCreator, setPreviewCreator] = useState<Creator | null>(null);

  // 3rd Icon: Control Screen Sub-tab ('fairy-control' by default or 'dm-control' or 'matches')
  const [controlSubTab, setControlSubTab] = useState<'fairy-control' | 'dm-control' | 'matches'>('fairy-control');
  const [showMatchesScreen, setShowMatchesScreen] = useState(false);
  const [showNormalMessagesScreen, setShowNormalMessagesScreen] = useState(false);
  const [showInfluenceRatingModal, setShowInfluenceRatingModal] = useState(false);

  const currentCreators = creatorsData[selectedCategory] || creatorsData.new_artists;

  const handleToggleCommentLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = !c.isLiked;
          return {
            ...c,
            isLiked: next,
            likes: next ? c.likes + 1 : c.likes - 1,
          };
        }
        return c;
      })
    );
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputComment.trim()) return;

    const newComment: CommentItem = {
      id: Date.now().toString(),
      username: 'you',
      avatarBg: 'bg-purple-600',
      avatarText: 'Y',
      text: inputComment.trim(),
      time: 'Just now',
      likes: 0,
      isLiked: false,
    };

    setComments([newComment, ...comments]);
    setInputComment('');
    setTotalComments((prev) => prev + 1);
  };

  const handleToggleUpvoteCreator = (categoryKey: string, rank: number) => {
    setCreatorsData((prev) => {
      const list = prev[categoryKey] || [];
      const updatedList = list.map((c) => {
        if (c.rank === rank) {
          const nextUpvoted = !c.isUpvoted;
          return {
            ...c,
            isUpvoted: nextUpvoted,
            upvotes: nextUpvoted ? c.upvotes + 1 : c.upvotes - 1,
          };
        }
        return c;
      });
      return { ...prev, [categoryKey]: updatedList };
    });
  };

  const handleToggleFollow = (categoryKey: string, rank: number) => {
    setCreatorsData((prev) => {
      const list = prev[categoryKey] || [];
      const updatedList = list.map((c) => {
        if (c.rank === rank) {
          return {
            ...c,
            isFollowing: !c.isFollowing,
          };
        }
        return c;
      });
      return { ...prev, [categoryKey]: updatedList };
    });
  };

  return (
    <div className="w-full h-screen max-h-screen overflow-hidden bg-white flex flex-col justify-between text-slate-900 font-sans antialiased select-none">
      {showMatchesScreen ? (
        <div className="flex-1 min-h-0 w-full overflow-hidden">
          <MatchesScreen onBackToFeed={() => setShowMatchesScreen(false)} />
        </div>
      ) : showNormalMessagesScreen ? (
        <div className="flex-1 min-h-0 w-full overflow-hidden">
          <NormalMessagesScreen
            onBackToFeed={() => setShowNormalMessagesScreen(false)}
            onOpenExclusiveMatches={() => {
              setShowNormalMessagesScreen(false);
              setShowMatchesScreen(true);
            }}
          />
        </div>
      ) : (
        <>
          {/* ========================================================================= */}
          {/* SCREEN 1: POST SCREEN (TAB 0 - HOME) */}
          {/* ========================================================================= */}
          {activeNavIndex === 0 && (
        <>
          {/* Header */}
          <header className="w-full px-4 pt-2.5 pb-1 flex items-center justify-between shrink-0 bg-white z-10 border-b border-slate-50">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCreatePostModal(true)}
                aria-label="Camera · Create Post"
                title="Camera · Post video, photo & writing"
                className="hover:opacity-75 transition-all active:scale-90 cursor-pointer p-1 text-black flex items-center justify-center -ml-1"
              >
                <Camera className="w-5.5 h-5.5 text-black stroke-[1.9]" />
              </button>
              <div className="w-[24px] h-[24px] rounded-[6px] bg-black flex items-center justify-center shadow-xs">
                <svg
                  className="w-3.5 h-3.5 text-white fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h1 className="text-[21px] font-black tracking-tight text-black leading-none font-sans">
                Fairy
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* 1st header icon: Guacamole Bowl icon inspired by 61f6185e-7107-40ff-8eb6-0569d6090611.jpg.png */}
              <button
                aria-label="Guacamole & Nachos"
                title="Guacamole & Chips"
                className="hover:opacity-75 transition-opacity cursor-pointer p-0.5 flex items-center justify-center"
              >
                <AeriGuacamoleBowlIcon size={30} className="w-[30px] h-[30px]" />
              </button>

              {/* 2nd header icon: Concentric Circle icon inspired by Screenshot 2026-03-14 114918.png */}
              <button
                aria-label="Concentric Circle"
                title="Concentric Circle"
                className="hover:opacity-75 transition-opacity cursor-pointer p-0.5 flex items-center justify-center shrink-0"
              >
                <AeriConcentricCircleIcon className="w-[27px] h-[27px] text-black" />
              </button>

              {/* 3rd header icon: One-Eye Hat Guy icon beside Search inspired by unnamed (26).jpg */}
              <button
                aria-label="One-Eye Hat Guy"
                title="One-Eye Hat Guy"
                className="hover:opacity-75 transition-opacity cursor-pointer p-0.5 flex items-center justify-center"
              >
                <AeriOneEyeHatGuyIcon className="w-[33px] h-[33px] text-black" />
              </button>

              <button
                aria-label="Search"
                className="hover:opacity-75 transition-opacity cursor-pointer p-1 translate-y-1"
              >
                <AeriSearchIcon className="w-[23px] h-[23px] text-black" />
              </button>

              {/* Message icon (where user messages normal users) */}
              <button
                onClick={() => setShowNormalMessagesScreen(true)}
                aria-label="Messages"
                title="Messages · Direct messages with normal users"
                className="hover:opacity-75 transition-all active:scale-90 cursor-pointer p-1 relative text-black flex items-center justify-center -translate-x-1.5 mr-1 translate-y-1"
              >
                <AeriMessageBubbleIcon size={23} className="w-[23px] h-[23px] text-black" />
                <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              </button>
            </div>
          </header>

          {/* Quick Bar: Create Post Action & Comment Switcher */}
          <div className="w-full px-4 py-1.5 flex items-center justify-between shrink-0 bg-white z-10 border-b border-slate-100">
            <button
              onClick={() => setShowCreatePostModal(true)}
              aria-label="Camera · Create Post"
              title="Camera · Post video, photo & writing"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-full text-xs font-black transition-transform active:scale-95 cursor-pointer border border-purple-200/60 shadow-2xs"
            >
              <Camera className="w-3.5 h-3.5 text-purple-700" />
              <span>Camera</span>
            </button>

            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setCommentType('inline-feed')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                  commentType === 'inline-feed'
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Feed
              </button>
              <button
                onClick={() => setCommentType('discussion-card')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                  commentType === 'discussion-card'
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Discussion
              </button>
              <button
                onClick={() => {
                  setCommentType('floating-drawer');
                  setIsDrawerOpen(true);
                }}
                className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                  commentType === 'floating-drawer'
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sheet
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-h-0 w-full px-4 py-1 flex flex-col overflow-y-auto scrollbar-thin space-y-3 relative">
            {feedPosts.map((post) => (
              <div key={post.id} className="space-y-2 shrink-0">
                {/* 1. Trending Tag with Flame placed directly on top of the person profile pic */}
                {post.isTrending && (
                  <div className="flex items-center justify-between pt-1 pb-0.5 px-0.5 shrink-0">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FFF0F5] border border-pink-100/80 rounded-full shadow-2xs">
                      <AeriFlameIcon filled className="w-3.5 h-3.5 text-[#FF5722]" />
                      <span className="text-[11px] font-black text-[#8B2FC9] tracking-tight">
                        Trending #1 Post
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      Featured in Fairy Feed
                    </span>
                  </div>
                )}

                {/* 2. Post Author Header with Profile Picture */}
                <div className="flex items-center justify-between py-1 px-0.5 shrink-0 bg-white">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-600/30 p-0.5 shadow-xs"
                      />
                      {/* Flame Badge directly on top of the profile pic */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-tr from-[#FF5722] to-amber-400 flex items-center justify-center ring-1.5 ring-white shadow-2xs" title="Trending Creator">
                        <AeriFlameIcon filled className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 leading-none">
                        <span className="text-[13px] font-black text-slate-900 tracking-tight">
                          {post.authorName}
                        </span>
                        {post.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 fill-purple-100" />
                        )}
                      </div>
                      <span className="text-[10.5px] font-medium text-slate-500 mt-0.5">
                        {post.authorHandle} &middot; {post.timeAgo} {post.location ? `· ${post.location}` : ''}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      className="px-3 py-1 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-[11px] transition-colors cursor-pointer"
                    >
                      Follow
                    </button>
                    <button
                      aria-label="Post options"
                      className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      <span className="text-base font-bold leading-none">&middot;&middot;&middot;</span>
                    </button>
                  </div>
                </div>

                {/* 3. Post Card: Image or Video */}
                <div className="relative w-full h-[36vh] min-h-[190px] max-h-[290px] rounded-[18px] overflow-hidden bg-black shadow-xs shrink-0 group">
                  {post.mediaType === 'video' ? (
                    <video
                      src={post.mediaUrl}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <img
                      src={post.mediaUrl}
                      alt={post.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  )}

                  <div className="absolute right-3 bottom-3 bg-white/75 backdrop-blur-md px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-white/40 pointer-events-none">
                    <Music className="w-3 h-3 text-slate-800" />
                    <span className="text-[9.5px] font-semibold text-slate-900 tracking-tight">
                      {post.audioTitle || 'Original Audio'}
                    </span>
                  </div>
                </div>

                {/* 4. Action Row */}
                <div className="flex items-center justify-between pt-1.5 shrink-0 text-black">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleTogglePostLike(post.id)}
                      className="cursor-pointer transition-transform active:scale-90"
                      aria-label="Like post"
                    >
                      <AeriFlameIcon
                        filled={post.isLiked}
                        className={`w-5.5 h-5.5 transition-colors ${
                          post.isLiked
                            ? 'text-[#FF6D00]'
                            : 'text-[#FF6D00] stroke-[1.8]'
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => setIsDrawerOpen(true)}
                      className="cursor-pointer transition-transform active:scale-90 hover:opacity-75"
                      aria-label="Comments"
                    >
                      <AeriCommentIcon className="w-5.5 h-5.5 text-black stroke-[1.8]" />
                    </button>

                    {/* 3rd icon: Honey jar icon (Fairy Pot) */}
                    <button
                      onClick={() => {
                        setActiveNavIndex(2);
                        setShowMatchesScreen(false);
                      }}
                      className="cursor-pointer transition-transform active:scale-90 hover:opacity-75 flex items-center justify-center p-0.5"
                      aria-label="Honey Jar / Fairy Pot"
                      title="Honey Jar"
                    >
                      <FairyPotIcon className="w-5.5 h-5.5 text-black stroke-[1.8]" />
                    </button>

                    {/* 4th icon beside 5th frog icon: Hand holding smartphone inspired by icon fairyi png.jpg */}
                    <button
                      className="cursor-pointer transition-transform active:scale-90 hover:opacity-75 flex items-center justify-center p-0.5"
                      title="Smartphone / Social Reach"
                      aria-label="Smartphone"
                    >
                      <AeriHandPhoneIcon className="w-5.5 h-5.5 text-black stroke-[1.8]" />
                    </button>

                    <button
                      onClick={() => setShowInfluenceRatingModal(true)}
                      className="cursor-pointer transition-transform active:scale-90 hover:opacity-75 flex items-center justify-center p-0.5"
                      aria-label="View Fairy ratings and social reach"
                      title="Overall ratings & Social reach"
                    >
                      <AeriMaskedEyesIcon className="w-[33px] h-[23px] text-black shrink-0" />
                    </button>
                  </div>

                  <span className="text-[11px] font-bold text-slate-500 tabular-nums">
                    {post.likeCount.toLocaleString()} likes
                  </span>
                </div>

                {/* 5. Post Writing & Caption */}
                <div className="pt-0.5 pb-1 px-0.5 shrink-0">
                  <div className="flex items-start gap-2">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-5 h-5 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-purple-500/20"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] leading-snug text-slate-800">
                        <span className="font-extrabold text-slate-900 mr-1.5">
                          {post.authorHandle}
                        </span>
                        {post.caption}
                      </p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {post.tags.map((tag) => (
                            <span key={tag} className="text-[10.5px] font-bold text-purple-600 hover:underline cursor-pointer">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

                {/* Comments Section */}
                <div className="flex-1 min-h-0 w-full my-1 flex flex-col justify-between overflow-hidden">
                  {commentType === 'inline-feed' ? (
                    <div className="flex-1 min-h-0 bg-slate-50/70 rounded-xl p-2.5 border border-slate-100 flex flex-col justify-between overflow-hidden">
                      <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-200/60 shrink-0">
                        <span className="text-[11px] font-extrabold text-slate-800 flex items-center gap-1.5">
                          <AeriCommentIcon className="w-3.5 h-3.5 text-purple-600" />
                          Comments ({totalComments})
                        </span>
                        <button
                          onClick={() => setIsDrawerOpen(true)}
                          className="text-[10px] font-bold text-purple-600 hover:text-purple-800 cursor-pointer"
                        >
                          Expand all &rarr;
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                        {comments.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-start gap-2 text-xs">
                            <div
                              className={`w-5 h-5 rounded-full ${item.avatarBg} text-white font-bold text-[8.5px] flex items-center justify-center shrink-0 shadow-2xs`}
                            >
                              {item.avatarText}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] leading-tight text-slate-800">
                                <span className="font-extrabold text-slate-900 mr-1.5">
                                  @{item.username}
                                </span>
                                {item.text}
                              </p>
                              <span className="text-[9.5px] text-slate-400 mt-0.5 inline-block">
                                {item.time} &middot; Reply
                              </span>
                            </div>
                            <button
                              onClick={() => handleToggleCommentLike(item.id)}
                              className="flex items-center gap-0.5 text-slate-400 hover:text-red-500 pt-0.5 cursor-pointer shrink-0"
                            >
                              <Heart
                                className={`w-3 h-3 ${
                                  item.isLiked ? 'text-red-500 fill-red-500' : 'stroke-[1.8]'
                                }`}
                              />
                              <span className="text-[9px] tabular-nums font-semibold">
                                {item.likes}
                              </span>
                            </button>
                          </div>
                        ))}
                      </div>

                      <form
                        onSubmit={handlePostComment}
                        className="flex items-center gap-1.5 pt-1.5 mt-1 border-t border-slate-200/60 shrink-0"
                      >
                        <div className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                          Y
                        </div>
                        <input
                          type="text"
                          value={inputComment}
                          onChange={(e) => setInputComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="flex-1 bg-white border border-slate-200 rounded-full px-2.5 py-1 text-[11px] focus:outline-none focus:border-purple-500"
                        />
                        <button
                          type="submit"
                          disabled={!inputComment.trim()}
                          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white text-[10px] font-bold rounded-full transition-colors cursor-pointer"
                        >
                          Post
                        </button>
                      </form>
                    </div>
                  ) : commentType === 'discussion-card' ? (
                    <div className="flex-1 min-h-0 bg-purple-50/40 rounded-xl p-2.5 border border-purple-100/80 flex flex-col justify-between overflow-hidden">
                      <div className="flex items-center justify-between shrink-0 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[11px] font-extrabold text-slate-900">
                            Top Community Thread
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                          {totalComments} active
                        </span>
                      </div>

                      <div className="bg-white rounded-lg p-2 shadow-2xs border border-purple-100/60 my-auto">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <div className="w-4.5 h-4.5 rounded-full bg-amber-500 text-white text-[8px] font-bold flex items-center justify-center">
                              M
                            </div>
                            <span className="text-[10.5px] font-extrabold text-slate-900">
                              @maya_sky
                            </span>
                            <span className="text-[9px] text-slate-400">Featured</span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-rose-500 font-bold">
                            <Heart className="w-3 h-3 fill-rose-500" />
                            42
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-700 leading-snug">
                          &ldquo;Where is that yellow coat from?! The lighting is immaculate 💛&rdquo;
                        </p>
                      </div>

                      <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="w-full mt-1.5 py-1.5 px-3 bg-white border border-purple-200 hover:border-purple-400 rounded-full text-slate-500 text-[10.5px] flex items-center justify-between transition-colors shadow-2xs cursor-pointer shrink-0"
                      >
                        <span>Join the discussion...</span>
                        <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                          Reply &rarr;
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1 min-h-0 flex flex-col justify-center items-start">
                      <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="px-4 py-2 bg-[#9810FA] hover:bg-[#8B0EE5] active:scale-98 transition-all rounded-full text-white text-xs font-black tracking-tight shadow-xs cursor-pointer flex items-center gap-2"
                      >
                        <AeriCommentIcon className="w-3.5 h-3.5 fill-white/20" />
                        <span>{totalComments} comments &middot; View Thread</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Secondary Row: Fire Hydrant & Raygun */}
                <div className="flex items-center gap-4 pt-1 pb-1 shrink-0">
                  <button
                    className="flex items-center justify-center transition-transform active:scale-90 hover:scale-105 cursor-pointer"
                    title="Fire Hydrant"
                    aria-label="Fire Hydrant"
                  >
                    <AeriHydrantIcon size={26} className="w-[26px] h-[35px] drop-shadow-2xs" />
                  </button>

                  <button
                    className="flex items-center justify-center text-slate-800 hover:text-black transition-transform active:scale-90 hover:opacity-80 hover:scale-105 cursor-pointer"
                    title="Share post / Raygun"
                    aria-label="Share post"
                  >
                    <AeriRaygunIcon className="w-8.5 h-8.5 text-slate-800 stroke-[1.3]" />
                  </button>
                </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 2: TOP 10 CREATORS BY CATEGORY (TAB 1 - THUMBS UP) */}
      {/* ========================================================================= */}
      {activeNavIndex === 1 && (
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/60">
          {/* Top 10 Header */}
          <div className="px-4 pt-3 pb-2 bg-white border-b border-slate-100 shrink-0 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-600 shadow-2xs">
                  <Trophy className="w-4.5 h-4.5 fill-amber-500" />
                </div>
                <div>
                  <h2 className="text-[16px] font-black text-slate-900 leading-tight tracking-tight flex items-center gap-1.5">
                    Fairy Top 10
                    <span className="text-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold px-2 py-0.5 rounded-full shadow-2xs">
                      Leaderboard
                    </span>
                  </h2>
                  <p className="text-[10.5px] text-slate-500">
                    Highest upvoted profiles &amp; featured creations
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveNavIndex(0)}
                className="text-[11px] font-bold text-slate-600 hover:text-black px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Back to Feed
              </button>
            </div>

            {/* CATEGORY SELECTOR CAROUSEL (All 6 requested categories) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              {CATEGORY_TABS.map((tab) => {
                const isSelected = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-xs scale-102'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{tab.emoji}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Category Banner Info */}
          <div className="px-4 py-1.5 bg-purple-50/60 border-b border-purple-100/60 flex items-center justify-between shrink-0 text-xs">
            <span className="font-extrabold text-purple-900 text-[11px] flex items-center gap-1">
              <span>{CATEGORY_TABS.find((t) => t.id === selectedCategory)?.emoji}</span>
              Top 10 {CATEGORY_TABS.find((t) => t.id === selectedCategory)?.label}
            </span>
            <span className="text-[10px] font-semibold text-purple-600">
              Updated Live &middot; 10 Featured
            </span>
          </div>

          {/* Top 10 Creators Scrollable List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
            {currentCreators.map((person) => (
              <div
                key={person.rank}
                className={`bg-white rounded-2xl p-3 border transition-all shadow-xs ${
                  person.rank === 1
                    ? 'border-amber-300 ring-1 ring-amber-300/40 bg-gradient-to-b from-amber-50/25 to-white'
                    : person.rank === 2
                    ? 'border-slate-300 ring-1 ring-slate-200'
                    : person.rank === 3
                    ? 'border-amber-700/30 ring-1 ring-amber-700/20'
                    : 'border-slate-100'
                }`}
              >
                {/* Profile Header Row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Rank Badge */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                        person.rank === 1
                          ? 'bg-amber-400 text-slate-950 shadow-xs ring-1 ring-amber-500/40'
                          : person.rank === 2
                          ? 'bg-slate-300 text-slate-900'
                          : person.rank === 3
                          ? 'bg-amber-700/80 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {person.rank}
                    </div>

                    {/* Profile Avatar / Icon */}
                    <div className="relative shrink-0">
                      {person.avatarUrl ? (
                        <img
                          src={person.avatarUrl}
                          alt={person.name}
                          className="w-9 h-9 rounded-full object-cover border border-white shadow-xs"
                        />
                      ) : (
                        <div
                          className={`w-9 h-9 rounded-full ${person.avatarBg} text-white font-extrabold flex items-center justify-center text-xs shadow-xs border border-white`}
                        >
                          {person.avatarInitial}
                        </div>
                      )}
                      {person.rank <= 3 && (
                        <span className="absolute -bottom-1 -right-1 text-[11px] leading-none">
                          {person.rank === 1 ? '👑' : person.rank === 2 ? '🥈' : '🥉'}
                        </span>
                      )}
                    </div>

                    {/* Name, Handle & Bio / City */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-extrabold text-xs text-slate-900 leading-tight truncate">
                          {person.name}
                        </span>
                        <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-500 shrink-0" />
                        {person.location && (
                          <span className="text-[9.5px] text-slate-400 font-medium truncate hidden sm:inline">
                            &middot; {person.location}
                          </span>
                        )}
                      </div>
                      <p className="text-[10.5px] text-slate-400 leading-tight truncate">
                        {person.handle} &middot;{' '}
                        <span className="text-slate-600 font-medium">
                          {person.role}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Upvote & Follow Button */}
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <button
                      onClick={() => handleToggleUpvoteCreator(selectedCategory, person.rank)}
                      className={`px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                        person.isUpvoted
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                      title="Give thumbs up"
                    >
                      <AeriDiggingDogIcon
                        className={`w-4 h-4 ${
                          person.isUpvoted ? 'fill-white stroke-white' : 'stroke-[1.8]'
                        }`}
                        filled={person.isUpvoted}
                      />
                      <span className="tabular-nums">
                        {(person.upvotes / 1000).toFixed(1)}k
                      </span>
                    </button>

                    <button
                      onClick={() => handleToggleFollow(selectedCategory, person.rank)}
                      className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${
                        person.isFollowing
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-purple-600 hover:bg-purple-700 text-white shadow-2xs'
                      }`}
                    >
                      {person.isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                </div>

                {/* Featured Profile Post Card */}
                <div
                  onClick={() => setPreviewCreator(person)}
                  className="bg-slate-50 hover:bg-slate-100/90 rounded-xl p-2.5 transition-colors cursor-pointer border border-slate-100 flex items-center gap-2.5 group"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 relative shadow-2xs">
                    {person.topPost.imageUrl ? (
                      <img
                        src={person.topPost.imageUrl}
                        alt={person.topPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-tr ${person.topPost.gradientBg} flex items-center justify-center text-white`}
                      >
                        <Sparkles className="w-5 h-5 opacity-70" />
                      </div>
                    )}

                    {person.topPost.hasAudio && (
                      <div className="absolute bottom-1 right-1 bg-black/60 rounded-full p-0.5 text-white">
                        <Music className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-purple-700 bg-purple-100/80 px-1.5 py-0.5 rounded">
                        {person.topPost.tag || 'Top Post'}
                      </span>
                      {person.location && (
                        <span className="text-[9px] text-slate-400 font-medium truncate sm:hidden">
                          {person.location}
                        </span>
                      )}
                    </div>
                    <h4 className="text-[11.5px] font-bold text-slate-900 truncate mt-0.5 group-hover:text-purple-700 transition-colors leading-snug">
                      {person.topPost.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <AeriDiggingDogIcon className="w-3.5 h-3.5 text-blue-600 stroke-[1.8]" />
                        {person.topPost.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <AeriCommentIcon className="w-3 h-3 text-slate-400" />
                        {person.topPost.comments}
                      </span>
                      {person.topPost.hasAudio && (
                        <span className="truncate text-slate-400 text-[9.5px]">
                          &middot; {person.topPost.audioTitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 transition-colors shrink-0" />
                </div>
              </div>
            ))}
          </div>

          {/* Modal to Preview Creator's Post when tapped */}
          {previewCreator && (
            <div
              className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
              onClick={() => setPreviewCreator(null)}
            >
              <div
                className="w-full max-w-[320px] bg-white rounded-2xl overflow-hidden shadow-2xl animate-scaleUp"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[4/3] bg-slate-900">
                  {previewCreator.topPost.imageUrl ? (
                    <img
                      src={previewCreator.topPost.imageUrl}
                      alt={previewCreator.topPost.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-tr ${previewCreator.topPost.gradientBg} flex items-center justify-center text-white`}
                    >
                      <Sparkles className="w-12 h-12 opacity-80" />
                    </div>
                  )}
                  <button
                    onClick={() => setPreviewCreator(null)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    Rank #{previewCreator.rank} &middot; {CATEGORY_TABS.find((t) => t.id === previewCreator.category)?.label}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-7 h-7 rounded-full ${previewCreator.avatarBg} text-white font-bold text-xs flex items-center justify-center overflow-hidden`}
                    >
                      {previewCreator.avatarUrl ? (
                        <img
                          src={previewCreator.avatarUrl}
                          alt={previewCreator.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        previewCreator.avatarInitial
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-900">
                        {previewCreator.name}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {previewCreator.handle} {previewCreator.location ? `· ${previewCreator.location}` : ''}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900 mb-1 leading-snug">
                    {previewCreator.topPost.title}
                  </h3>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleToggleUpvoteCreator(selectedCategory, previewCreator.rank)}
                      className={`px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 cursor-pointer ${
                        previewCreator.isUpvoted
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <AeriDiggingDogIcon className="w-4 h-4 stroke-[1.8]" filled={previewCreator.isUpvoted} />
                      {(previewCreator.upvotes / 1000).toFixed(1)}k Upvotes
                    </button>

                    <button
                      onClick={() => {
                        setPreviewCreator(null);
                        setActiveNavIndex(0);
                      }}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold rounded-full cursor-pointer"
                    >
                      View on Feed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 3: FAIRY CONTROL (5 INDEPENDENT SYSTEMS), DM PRIVACY & MATCHES */}
      {/* ========================================================================= */}
      {activeNavIndex === 2 && (
        <div className="flex-1 min-h-0 w-full flex flex-col overflow-hidden">
          {/* Sub-bar to switch between Fairy Control, DM Privacy, and Matches */}
          <div className="w-full bg-white border-b border-slate-100 px-3 py-1 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setControlSubTab('fairy-control')}
                className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md transition-all cursor-pointer ${
                  controlSubTab === 'fairy-control'
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Fairy Control
              </button>
              <button
                onClick={() => setControlSubTab('dm-control')}
                className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md transition-all cursor-pointer ${
                  controlSubTab === 'dm-control'
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                DM Privacy
              </button>
              <button
                onClick={() => setControlSubTab('matches')}
                className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  controlSubTab === 'matches'
                    ? 'bg-black text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clock className="w-2.5 h-2.5 text-emerald-400" />
                Matches
              </button>
            </div>
            <button
              onClick={() => setActiveNavIndex(0)}
              className="text-[10px] font-bold text-slate-500 hover:text-slate-900 px-2 py-0.5 cursor-pointer"
            >
              Feed &rarr;
            </button>
          </div>

          <div className="flex-1 min-h-0 w-full h-full flex flex-col overflow-hidden">
            {controlSubTab === 'fairy-control' ? (
              <FairyControl
                onBackToFeed={() => setActiveNavIndex(0)}
                onSwitchToDMs={() => setControlSubTab('dm-control')}
              />
            ) : controlSubTab === 'dm-control' ? (
              <DMControl
                onBackToFeed={() => setActiveNavIndex(0)}
                onSwitchToFairyControl={() => setControlSubTab('fairy-control')}
              />
            ) : (
              <MatchesScreen
                onBackToFeed={() => {
                  setActiveNavIndex(0);
                  setControlSubTab('fairy-control');
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Fallback for other tabs */}
      {(activeNavIndex === 3 || activeNavIndex === 4) && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-slate-50">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-3 shadow-xs">
            ✨
          </div>
          <h3 className="font-black text-base text-slate-900 mb-1">
            {activeNavIndex === 3 ? 'Trending Feed' : 'Profile & Settings'}
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mb-4">
            Discover community vibes and manage your Fairy creator profile.
          </p>
          <button
            onClick={() => setActiveNavIndex(0)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-full shadow-xs cursor-pointer"
          >
            Back to Feed
          </button>
        </div>
      )}
        </>
      )}

      {/* Bottom navigation bar (Pinned & ALWAYS visible at the bottom) */}
      <nav className="w-full border-t border-[#F1F5F9] bg-white px-4 py-2 shrink-0 flex items-center justify-around z-20">
        <button
          onClick={() => {
            setShowMatchesScreen(false);
            setShowNormalMessagesScreen(false);
            setActiveNavIndex(0);
          }}
          aria-label="Home"
          className={`p-1.5 transition-colors cursor-pointer flex flex-col items-center ${
            !showMatchesScreen && !showNormalMessagesScreen && activeNavIndex === 0
              ? 'text-black'
              : 'text-[#94A3B8] hover:text-black'
          }`}
        >
          <Home className="w-[21px] h-[21px] stroke-[1.8]" />
        </button>

        <button
          onClick={() => {
            setShowMatchesScreen(false);
            setShowNormalMessagesScreen(false);
            setActiveNavIndex(1);
          }}
          aria-label="Top 10 Creators"
          className={`p-1.5 transition-colors cursor-pointer relative flex flex-col items-center ${
            !showMatchesScreen && !showNormalMessagesScreen && activeNavIndex === 1
              ? 'text-black'
              : 'text-[#94A3B8] hover:text-black'
          }`}
          title="Top 10 People Leaderboard"
        >
          <AeriHorseIcon
            size={26}
            className="w-[26px] h-[26px] transition-transform active:scale-95"
            strokeWidth={!showMatchesScreen && !showNormalMessagesScreen && activeNavIndex === 1 ? 2.6 : 2.1}
          />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        </button>

        {/* Tab 2: 3rd icon (FAIRY CONTROL & DM PRIVACY & MATCHES) */}
        <button
          onClick={() => {
            setShowMatchesScreen(false);
            setShowNormalMessagesScreen(false);
            setActiveNavIndex(2);
            setIsDrawerOpen(false);
          }}
          aria-label="Fairy Control & Matches"
          className={`p-1.5 transition-colors cursor-pointer relative flex flex-col items-center ${
            showMatchesScreen || (!showNormalMessagesScreen && activeNavIndex === 2)
              ? 'text-slate-900'
              : 'text-[#94A3B8] hover:text-slate-900'
          }`}
          title="FAIRY CONTROL, DM Privacy & See for your matches"
        >
          <AeriOneEyeGhostIcon
            className={`w-[22px] h-[22px] transition-transform active:scale-95 ${
              showMatchesScreen || (!showNormalMessagesScreen && activeNavIndex === 2)
                ? 'stroke-[2.2] text-slate-900'
                : 'stroke-[1.8]'
            }`}
          />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
        </button>

        <button
          onClick={() => {
            setShowMatchesScreen(false);
            setShowNormalMessagesScreen(false);
            setActiveNavIndex(0);
          }}
          aria-label="Notifications"
          title="Notifications"
          className={`p-1.5 transition-all cursor-pointer flex flex-col items-center ${
            !showMatchesScreen && !showNormalMessagesScreen && activeNavIndex === 3
              ? 'scale-105 opacity-100'
              : 'opacity-75 hover:opacity-100'
          }`}
        >
          <AeriBellIcon
            size={25}
            className="w-[25px] h-[26px] transition-transform active:scale-95"
          />
        </button>

        <button
          onClick={() => {
            setShowMatchesScreen(false);
            setShowNormalMessagesScreen(false);
            setActiveNavIndex(0);
          }}
          aria-label="User profile"
          className={`p-1.5 transition-colors cursor-pointer flex flex-col items-center ${
            !showMatchesScreen && !showNormalMessagesScreen && activeNavIndex === 4
              ? 'text-black'
              : 'text-[#94A3B8] hover:text-black'
          }`}
        >
          <AeriProfileUserIcon
            size={24}
            className="w-[23px] h-[23px] transition-transform active:scale-95"
            strokeWidth={!showMatchesScreen && !showNormalMessagesScreen && activeNavIndex === 4 ? 2.6 : 2.1}
          />
        </button>
      </nav>

      {/* Fairy Influence & 5-Ratings Popout Modal (Opens from Aeri frog icon beside Phone icon) */}
      <InfluenceRatingModal
        isOpen={showInfluenceRatingModal}
        onClose={() => setShowInfluenceRatingModal(false)}
      />

      {/* Create Post Modal (Allows posting video, pic, and writing) */}
      <CreatePostModal
        isOpen={showCreatePostModal}
        onClose={() => setShowCreatePostModal(false)}
        onPublish={handlePublishPost}
        authorAvatar={elenaAvatar}
      />
    </div>
  );
}
