"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredBlogPosts, BlogItem } from "@/lib/data/cms-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { Search, Clock, ArrowRight, BookOpen, Calendar, Tag } from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    setBlogs(getStoredBlogPosts());

    const handleUpdate = () => {
      setBlogs(getStoredBlogPosts());
    };
    window.addEventListener("blog-updated", handleUpdate);
    return () => window.removeEventListener("blog-updated", handleUpdate);
  }, []);

  const allTags = ["All", ...Array.from(new Set(blogs.flatMap((b) => b.tags || [])))];

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()) ||
      (b.tags && b.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));
    const matchesTag = selectedTag === "All" || (b.tags && b.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <div className="py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-400">
          INSIGHTS &amp; ENGINEERING ARCHITECTURE
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display">
          The 30-Day Dev Blog
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Technical breakdowns, Next.js App Router performance guides, AI RAG vector architectures, and high-velocity engineering strategies.
        </p>
      </div>

      {/* Search and Tags */}
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by topic, tech, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {allTags.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition ${
                  selectedTag === tag
                    ? "bg-cyan-500 text-white font-bold"
                    : "bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((post) => (
          <GlassCard key={post.id} className="p-6 flex flex-col justify-between group hover:border-cyan-500/30 transition">
            <div className="space-y-4">
              {post.coverImage && (
                <div className="overflow-hidden rounded-xl h-44 -mx-2 -mt-2 mb-3">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              )}

              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 bg-slate-800 rounded-md text-[10px] font-mono text-cyan-400">
                  {post.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" /> {post.readTime}
                </span>
              </div>

              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug cursor-pointer">
                  {post.title}
                </h2>
              </Link>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              {post.tags && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {post.tags.map((t) => (
                    <span key={t} className="text-[9px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt={post.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-cyan-500/30"
                />
                <div>
                  <div className="text-xs font-semibold text-white">{post.author.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{post.publishedAt}</div>
                </div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="text-xs font-mono text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                Read <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </GlassCard>
        ))}

        {filteredBlogs.length === 0 && (
          <div className="col-span-full text-center py-20 text-slate-500 font-mono text-sm border border-dashed border-slate-800 rounded-2xl">
            No articles found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
