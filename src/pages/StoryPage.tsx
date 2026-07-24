import React, { useState } from 'react';
import { STORY_CONTENT, LOCAL_ARTISTS } from '../data/storyData';
import { 
  Play, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Palette, 
  Award, 
  CheckCircle, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const StoryPage: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 text-stone-100">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          The Legend of Bennu
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-amber-50">
          Our Story & Community
        </h1>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          How a quiet dream on Martin Luther King Jr. Blvd grew into Austin’s most beloved 24-hour sanctuary for coffee purists, midnight creators, and local artists.
        </p>
      </div>

      {/* INTEGRATED YOUTUBE VIDEO SECTION */}
      <section className="bg-[#160f0c] rounded-3xl border border-amber-900/50 p-6 sm:p-10 space-y-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Documentary Feature Film
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 mt-1">
              {STORY_CONTENT.videoTitle}
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
              {STORY_CONTENT.videoDescription}
            </p>
          </div>
        </div>

        {/* Embedded YouTube Frame */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-amber-800/60 shadow-2xl bg-black">
          {!isVideoPlaying ? (
            <div className="relative w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80"
                alt="Bennu Video Cover"
                className="w-full h-full object-cover filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col items-center justify-center p-6 text-center">
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="w-20 h-20 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-2xl shadow-amber-500/50 hover:scale-110 transition-transform cursor-pointer group mb-4"
                >
                  <Play className="w-10 h-10 fill-stone-950 ml-1.5" />
                </button>
                <span className="text-xs font-bold tracking-widest text-amber-300 uppercase">
                  Click To Watch Official Bennu Story
                </span>
                <p className="text-stone-300 text-xs max-w-md mt-1">
                  Includes interviews with founders Steve & Stephanie Hall, roasting highlights, and 24-hour Austin cafe culture.
                </p>
              </div>
            </div>
          ) : (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${STORY_CONTENT.videoYoutubeId}?autoplay=1&rel=0`}
              title={STORY_CONTENT.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Our Guiding Pillars</span>
          <h2 className="font-serif text-3xl font-bold text-amber-50">What Drives the Bennu Flock</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STORY_CONTENT.values.map((v, i) => (
            <div
              key={i}
              className="p-6 bg-[#160f0c] rounded-2xl border border-amber-900/40 space-y-3 shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-amber-100">{v.title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BENNU TIMELINE */}
      <section className="bg-[#140e0b] rounded-3xl border border-amber-900/40 p-8 sm:p-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Austin History</span>
          <h2 className="font-serif text-3xl font-bold text-amber-50">Milestones of the Phoenix</h2>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-900/40">
          {STORY_CONTENT.history.map((h, i) => (
            <div key={i} className="relative pl-10 space-y-1">
              <div className="absolute left-2 top-1.5 w-4 h-4 rounded-full bg-amber-600 border-2 border-[#140e0b] shadow-md" />
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800/40">
                  {h.year}
                </span>
                <h4 className="font-serif text-lg font-bold text-amber-100">{h.title}</h4>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed pt-1">{h.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LOCAL ARTIST GALLERY WALL */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <Palette className="w-4 h-4" />
              Austin Art On Our Walls
            </span>
            <h2 className="font-serif text-3xl font-bold text-amber-50 mt-1">
              Supporting Local Creators
            </h2>
            <p className="text-stone-400 text-sm mt-1 max-w-xl">
              100% of art sale proceeds go directly to local Austin painters and artists featured on our coffee shop walls.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOCAL_ARTISTS.map((art) => (
            <div
              key={art.id}
              className="bg-[#160f0c] border border-amber-900/40 rounded-2xl overflow-hidden shadow-xl space-y-4 p-5"
            >
              <div className="h-56 rounded-xl overflow-hidden border border-amber-900/30">
                <img
                  src={art.imageUrl}
                  alt={art.artworkTitle}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900/30">
                  Featured at {art.locationFeatured}
                </span>
                <h3 className="font-serif text-xl font-bold text-amber-100 mt-2">
                  "{art.artworkTitle}"
                </h3>
                <p className="text-xs font-semibold text-stone-300">by {art.artistName}</p>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">{art.bio}</p>
              </div>

              <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span>Medium: {art.medium}</span>
                <span className="text-stone-500">{art.instagram}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
