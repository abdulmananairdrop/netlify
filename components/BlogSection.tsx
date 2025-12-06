import React from 'react';
import { ArrowUpRight, Calendar, User } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
      return <div className="text-center text-slate-400 py-10">No blog posts available at the moment.</div>;
  }

  return (
    <div className="w-full relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <div 
            key={post.id || idx} 
            className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="h-48 overflow-hidden relative bg-slate-100">
              {post.imageUrl ? (
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
              )}
              {post.category && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-accent border border-slate-100">
                    {post.category}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-slate-400 text-xs mb-3">
                {post.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Admin
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                {post.description}
              </p>

              <button className="flex items-center gap-1 text-sm font-semibold text-accent hover:text-accentHover mt-auto group/btn">
                Read Article
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;