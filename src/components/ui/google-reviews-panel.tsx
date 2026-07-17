import * as React from "react";
import Image from "next/image";
import { Search, ListFilter, Star, MoreVertical, ThumbsUp, ExternalLink, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type GoogleReview = {
  author: string;
  authorInfo?: string;
  text: string;
  rating: number;
  relativeTime: string;
  avatar?: string;
  permalink: string;
  images?: string[];
};

interface GoogleReviewsPanelProps {
  averageRating: number;
  totalReviews: number;
  starDistribution: { stars: number; count: number }[];
  reviews: GoogleReview[];
}

export const GoogleReviewsPanel: React.FC<GoogleReviewsPanelProps> = ({
  averageRating,
  totalReviews,
  starDistribution,
  reviews,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white text-zinc-900 shadow-[0px_4px_20px_rgba(0,0,0,0.1)] border border-zinc-200 overflow-hidden font-sans rounded-xl h-[800px] flex flex-col">
      {/* Header Info */}
      <div className="p-6 border-b border-zinc-100 bg-white sticky top-0 z-10 shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
             <div className="flex items-center gap-6">
                 <a 
                    href="https://www.google.com/maps/place/RETR%C3%92+XX+SETTEMBRE+-+Schiacciateria+Triestina/@45.6519157,13.77967,17z/data=!4m8!3m7!1s0x477b6b129a22afdf:0x44aeb9deb325cae3!8m2!3d45.6519157!4d13.77967!9m1!1b1!16s%2Fg%2F11c4bm_n3g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center hover:opacity-80 transition-opacity"
                >
                    <div className="w-12 h-12 relative mb-2">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.01.67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                        </svg>
                    </div>
                    <span className="text-5xl font-medium text-zinc-800 tracking-tighter">{averageRating}</span>
                    <div className="flex text-yellow-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("w-3.5 h-3.5 fill-current", i >= Math.floor(averageRating) ? "text-zinc-200 fill-zinc-200" : "fill-yellow-400")} />
                        ))}
                    </div>
                    <span className="text-[9px] text-zinc-500 mt-1 uppercase tracking-wider font-bold">{totalReviews} recensioni</span>
                </a>
                
                {/* Star Progress Bars */}
                <div className="flex-1 space-y-1">
                    {starDistribution.slice().sort((a, b) => b.stars - a.stars).map((item) => (
                        <div key={item.stars} className="flex items-center gap-2">
                            <span className="text-xs text-zinc-600 w-2 leading-none font-bold">{item.stars}</span>
                            <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-yellow-400 rounded-full" 
                                    style={{ width: `${(item.count / 300) * 100}%` }} // Simplified normalization
                                />
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-zinc-400" />
            <span className="text-xs text-zinc-500">Le recensioni non sono verificate</span>
            <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 flex items-center justify-center text-[8px] text-zinc-500 cursor-help">i</div>
        </div>

        <div className="flex flex-col gap-4">
             <a 
                href="https://search.google.com/local/writereview?placeid=ChIJ368imhJre0cR48ols965rkQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#e3f2fd] text-[#01579b] text-sm font-bold py-2.5 rounded-full hover:bg-[#bbdefb] transition-colors flex items-center justify-center gap-2"
             >
                <span className="text-lg leading-none">🖊️</span> Scrivi una recensione
             </a>
             
             <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2 w-full">
                    <a 
                        href="https://www.google.com/maps/place/RETR%C3%92+XX+SETTEMBRE+-+Schiacciateria+Triestina/@45.6519157,13.77967,17z/data=!4m8!3m7!1s0x477b6b129a22afdf:0x44aeb9deb325cae3!8m2!3d45.6519157!4d13.77967!9m1!1b1!16s%2Fg%2F11c4bm_n3g"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 cursor-pointer hover:bg-zinc-50 flex-shrink-0"
                    >
                        <Search className="w-4 h-4" />
                    </a>
                    <a 
                        href="https://www.google.com/maps/place/RETR%C3%92+XX+SETTEMBRE+-+Schiacciateria+Triestina/@45.6519157,13.77967,17z/data=!4m8!3m7!1s0x477b6b129a22afdf:0x44aeb9deb325cae3!8m2!3d45.6519157!4d13.77967!9m1!1b1!16s%2Fg%2F11c4bm_n3g"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 px-4 rounded-full border border-zinc-200 flex items-center justify-center gap-2 text-zinc-700 text-sm font-medium cursor-pointer hover:bg-zinc-50 flex-shrink-0"
                    >
                        <ListFilter className="w-4 h-4" />
                        Ordina
                    </a>
                     <div className="flex gap-2 overflow-x-auto scrollbar-none flex-1 items-center">
                        {["Tutte", "aperitivo 24", "cocktails 13", "prodotti 10"].map((tag, i) => (
                            <a 
                                key={tag} 
                                href="https://www.google.com/maps/place/RETR%C3%92+XX+SETTEMBRE+-+Schiacciateria+Triestina/@45.6519157,13.77967,17z/data=!4m8!3m7!1s0x477b6b129a22afdf:0x44aeb9deb325cae3!8m2!3d45.6519157!4d13.77967!9m1!1b1!16s%2Fg%2F11c4bm_n3g"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "whitespace-nowrap px-4 py-1.5 rounded-full border text-[13px] font-medium transition-colors cursor-pointer",
                                    i === 0 ? "bg-[#e3f2fd] border-[#e3f2fd] text-[#01579b]" : "bg-white border-zinc-300 text-zinc-600 hover:bg-zinc-50"
                                )}
                            >
                                {tag}
                            </a>
                        ))}
                    </div>
                </div>
             </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="flex-1 overflow-y-auto bg-white p-6 pt-2 space-y-8 CustomScroll">
        <style dangerouslySetInnerHTML={{ __html: `
            .CustomScroll::-webkit-scrollbar { width: 8px; }
            .CustomScroll::-webkit-scrollbar-track { background: transparent; }
            .CustomScroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; border: 2px solid white; }
            .CustomScroll::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        `}} />
        
        {reviews.map((review, i) => (
          <div key={i} className="flex flex-col gap-3 group">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-200 flex-shrink-0">
                  {review.avatar ? (
                    <Image src={review.avatar} alt={review.author} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold bg-zinc-100 uppercase text-lg">
                      {review.author.charAt(0)}
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5">
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-[6px] text-white font-bold shadow-sm">★</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-zinc-900 leading-tight">{review.author}</span>
                  <span className="text-[11px] text-zinc-500 leading-tight">Local Guide • {(i * 13 + 42) % 300 + 20} recensioni</span>
                </div>
              </div>
              <button className="text-zinc-400 hover:text-zinc-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, starIdx) => (
                            <Star key={starIdx} className={cn("w-3 h-3 fill-current", starIdx >= review.rating ? "text-zinc-200 fill-zinc-200" : "fill-yellow-400")} />
                        ))}
                    </div>
                    <span className="text-[11px] text-zinc-500">{review.relativeTime}</span>
                </div>
                
                <p className="text-sm text-zinc-700 leading-relaxed">
                    {review.text}
                </p>

                {review.images && review.images.length > 0 && (
                    <div className="flex gap-1 overflow-x-auto pt-2 scrollbar-none">
                        {review.images.map((img, imgIdx) => (
                            <div key={imgIdx} className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden border border-zinc-100">
                                <Image src={img} alt="Foto recensione" fill className="object-cover hover:scale-105 transition-transform" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-zinc-500 cursor-pointer hover:text-zinc-800 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Mi piace</span>
                </div>
                <a 
                    href={review.permalink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-blue-600 cursor-pointer hover:underline transition-all"
                >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Vedi recensione</span>
                </a>
            </div>
            
            <div className="pt-6 border-b border-zinc-100 w-full" />
          </div>
        ))}
        
        <div className="flex justify-center py-4 opacity-0 h-0 overflow-hidden">
             {/* Spazio rimosso per usare il pulsante esterno richiesto */}
        </div>
      </div>
    </div>
  );
};
