import React, { useState } from 'react';
import { ReviewItem } from '../types';
import { REVIEWS } from '../data/storyData';
import { 
  Star, 
  MessageSquare, 
  Sparkles, 
  Heart, 
  Coffee, 
  PlusCircle, 
  CheckCircle, 
  X, 
  Send, 
  Quote,
  ThumbsUp,
  Award
} from 'lucide-react';
import { cafeAudio } from '../utils/audioSynth';

interface TestimonialsSectionProps {
  onShowToast?: (msg: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onShowToast }) => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [activeFilter, setActiveFilter] = useState<'all' | '24/7' | 'mochas' | 'community'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New review form state
  const [authorName, setAuthorName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [location, setLocation] = useState('East MLK (24/7)');
  const [favoriteDrink, setFavoriteDrink] = useState('The Iced Bennu');
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Like counts state for interactivity
  const [likesMap, setLikesMap] = useState<Record<string, number>>({
    'rev-1': 24,
    'rev-2': 19,
    'rev-3': 15,
    'rev-4': 31,
    'rev-5': 42
  });

  const handleLike = (id: string) => {
    cafeAudio.playSteamSipSound();
    setLikesMap(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleFilterChange = (filter: 'all' | '24/7' | 'mochas' | 'community') => {
    cafeAudio.playSteamSipSound();
    setActiveFilter(filter);
  };

  const filteredReviews = reviewsList.filter(rev => {
    if (activeFilter === '24/7') return rev.location.includes('24/7') || rev.comment.toLowerCase().includes('24/7') || rev.comment.toLowerCase().includes('2 am');
    if (activeFilter === 'mochas') return rev.favoriteDrink?.toLowerCase().includes('mocha') || rev.comment.toLowerCase().includes('mocha');
    if (activeFilter === 'community') return rev.tag.includes('Veteran') || rev.tag.includes('Local') || rev.comment.toLowerCase().includes('community') || rev.comment.toLowerCase().includes('art');
    return true;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    cafeAudio.playSteamSipSound();

    const initials = authorName
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'BC';

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: authorName,
      avatarInitials: initials,
      role: role || 'Austin Coffee Lover',
      rating,
      comment,
      date: 'Just now',
      location,
      tag: 'Austin Regular',
      favoriteDrink
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsSubmitted(true);
    if (onShowToast) {
      onShowToast(`🌟 Thank you ${authorName}! Your review was added to the Bennu Wall of Love.`);
    }

    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setAuthorName('');
      setRole('');
      setComment('');
    }, 1800);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-[#e69b57] font-serif italic text-xl inline-flex items-center gap-2">
          <Quote className="w-5 h-5 text-[#e69b57]" />
          Austin Community Stories
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-amber-50 tracking-tight leading-tight">
          Love from Night Owls, Creatives & Regulars
        </h2>

        <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          From 3 AM dissertation breakthroughs to sunny patio taco brunches, hear why Austin has called Bennu its home away from home since 2009.
        </p>

        {/* Filter Tabs & Share Review CTA */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          {[
            { id: 'all', label: 'All Testimonials' },
            { id: '24/7', label: '24/7 Night Owls' },
            { id: 'mochas', label: 'Gourmet Mochas' },
            { id: 'community', label: 'Austin Culture' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleFilterChange(tab.id as any)}
              className={`px-4 py-2 rounded-full font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#e69b57] text-[#120b08] shadow-lg shadow-[#e69b57]/20 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}

          <button
            onClick={() => {
              cafeAudio.playSteamSipSound();
              setIsModalOpen(true);
            }}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg flex items-center gap-1.5 ml-2 border border-amber-400/30"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>Share Your Review</span>
          </button>
        </div>
      </div>

      {/* Featured Testimonials Grid in Frosted Glass */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-7 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-2xl relative group overflow-hidden"
          >
            {/* Soft Ambient Internal Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#e69b57]/10 rounded-full blur-2xl group-hover:bg-[#e69b57]/20 transition-all pointer-events-none" />

            <div>
              {/* Top Row: User Avatar Initials & Rating */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#e69b57]/20 border border-[#e69b57]/40 text-[#e69b57] font-bold text-base flex items-center justify-center flex-shrink-0 shadow-inner">
                    {rev.avatarInitials || rev.author.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-amber-50 group-hover:text-[#e69b57] transition-colors leading-tight">
                      {rev.author}
                    </h3>
                    <p className="text-[11px] text-white/50 font-medium">
                      {rev.role || rev.location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex gap-0.5 text-[#e69b57]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#e69b57]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-white/40 mt-0.5">{rev.date}</span>
                </div>
              </div>

              {/* Comment Content */}
              <p className="text-stone-200 text-sm font-serif italic leading-relaxed mb-6">
                "{rev.comment}"
              </p>
            </div>

            {/* Bottom Meta & Interactive Badges */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#e69b57]/15 text-[#e69b57] border border-[#e69b57]/30 text-[10px] font-bold uppercase tracking-wider">
                  {rev.tag}
                </span>

                {rev.favoriteDrink && (
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-amber-200/90 border border-white/10 text-[10px] font-medium flex items-center gap-1">
                    <Coffee className="w-3 h-3 text-[#e69b57]" />
                    {rev.favoriteDrink}
                  </span>
                )}
              </div>

              {/* Like / Helpful Counter */}
              <button
                onClick={() => handleLike(rev.id)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-[#e69b57]/20 border border-white/10 text-[11px] text-stone-300 hover:text-white transition-all cursor-pointer"
                title="Mark as helpful"
              >
                <ThumbsUp className="w-3 h-3 text-[#e69b57]" />
                <span>{likesMap[rev.id] || 0}</span>
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#120b08] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative text-stone-100">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[#e69b57] font-serif italic text-sm">Bennu Wall of Love</span>
              <h3 className="font-serif text-2xl font-bold text-amber-50">
                Share Your Bennu Experience
              </h3>
              <p className="text-xs text-stone-400">
                Your testimonial helps fellow Austin night owls and coffee lovers discover our 24/7 sanctuary.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-serif text-2xl font-bold text-amber-100">Review Submitted!</h4>
                <p className="text-xs text-stone-300">
                  Thank you <strong>{authorName}</strong>! Your review is now live on the Bennu community wall.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-amber-200">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Maya Lin"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-[#e69b57]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-amber-200">Role / Connection</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. UT Student / Austin Local"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-[#e69b57]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-amber-200">Preferred Location</label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-stone-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#e69b57]"
                    >
                      <option value="East MLK (24/7)">East MLK (24/7)</option>
                      <option value="Highland (ACC)">Highland (ACC)</option>
                      <option value="South Congress">South Congress</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-amber-200">Favorite Bennu Drink</label>
                    <select
                      value={favoriteDrink}
                      onChange={(e) => setFavoriteDrink(e.target.value)}
                      className="w-full bg-stone-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-[#e69b57]"
                    >
                      <option value="The Great Gatsby">The Great Gatsby Mocha</option>
                      <option value="Don Quixote Mocha">Don Quixote Mocha</option>
                      <option value="Frankenstein Mocha">Frankenstein Matcha Mocha</option>
                      <option value="Mocha Maya">Mocha Maya</option>
                      <option value="Nitro Cold Brew">Nitro Cold Brew</option>
                      <option value="The Iced Bennu">The Iced Bennu</option>
                    </select>
                  </div>
                </div>

                {/* Star Rating Selection */}
                <div className="space-y-1">
                  <label className="font-bold text-amber-200 block">Rating</label>
                  <div className="flex gap-2 p-2 bg-white/5 rounded-xl border border-white/10 w-fit">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer transition-transform hover:scale-125"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating ? 'fill-[#e69b57] text-[#e69b57]' : 'text-stone-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-1">
                  <label className="font-bold text-amber-200">Your Testimonial *</label>
                  <textarea
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what you love about Bennu—the coffee quality, friendly baristas, study vibes, or 24/7 atmosphere..."
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-3.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-[#e69b57]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Post Testimonial to Wall</span>
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
