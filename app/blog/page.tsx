"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredBlogPosts, BlogItem } from "@/lib/data/cms-data";
import { Search, Clock, ArrowRight } from "lucide-react";

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
    <div className="py-16 lg:py-24 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] text-[#111215]">
      {/* Header */}
      <div className="border-b border-[#E5E2DB] pb-12 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-full text-[#4A4D54] text-[11px] font-mono uppercase tracking-[0.2em] shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]" />
          Publications &amp; Architectural Papers
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#111215] tracking-tight font-display">
          Engineering &amp; <span className="font-editorial italic font-light text-[#519DD9]">Perspectives</span>
        </h1>
        <p className="text-[#4A4D54] text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Deep dives into full-stack architecture, relational database modeling, sub-100ms API engineering, and disciplined enterprise delivery.
        </p>
      </div>

      {/* Search and Tags */}
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8C8F98] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search publications by topic, keyword, or architecture..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl text-xs text-[#111215] placeholder:text-[#8C8F98] focus:outline-none focus:border-[#111215] shadow-xs font-mono transition-all"
          />
        </div>

        {allTags.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 font-mono text-[11px] rounded-lg tracking-wider uppercase transition-all ${
                  selectedTag === tag
                    ? "bg-[#111215] text-[#FFFFFF] font-bold shadow-xs"
                    : "bg-[#FFFFFF] text-[#4A4D54] hover:text-[#111215] border border-[#E5E2DB]"
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
          <div key={post.id} className="p-8 rounded-2xl flex flex-col justify-between group bg-[#FFFFFF] border border-[#E5E2DB] shadow-xs hover:border-[#111215] hover:shadow-md transition-all duration-300">
            <div className="space-y-4">
              {post.coverImage && (
                <div className="overflow-hidden h-44 -mx-2 -mt-2 mb-3 rounded-xl border border-[#E5E2DB]">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover contrast-105 group-hover:scale-105 transition duration-500"
                  />
                </div>
              )}

              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 bg-[#F5F3EF] border border-[#E5E2DB] rounded-full text-[10px] font-mono font-bold text-[#519DD9] uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-[11px] text-[#71757E] font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#519DD9]" /> {post.readTime}
                </span>
              </div>

              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-bold text-[#111215] font-display group-hover:text-[#519DD9] transition-colors leading-snug cursor-pointer">
                  {post.title}
                </h2>
              </Link>

              <p className="text-xs text-[#4A4D54] font-light leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              {post.tags && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono text-[#71757E] bg-[#F5F3EF] px-2 py-0.5 rounded border border-[#E5E2DB]">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#E5E2DB] flex items-center justify-between mt-6">
              <div className="flex items-center gap-2.5">
                <img
                  src={post.author.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt={post.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#E5E2DB]"
                />
                <div>
                  <div className="text-xs font-semibold text-[#111215]">{post.author.name}</div>
                  <div className="text-[10px] text-[#71757E] font-mono">{post.publishedAt}</div>
                </div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="text-xs font-mono font-semibold text-[#111215] flex items-center gap-1 group-hover:text-[#519DD9] group-hover:translate-x-1 transition-all"
              >
                Inspect <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}

        {filteredBlogs.length === 0 && (
          <div className="col-span-full text-center py-20 text-[#71757E] font-mono text-sm border border-[#E5E2DB] bg-[#FFFFFF] rounded-2xl">
            No architectural papers found matching your query.
          </div>
        )}
      </div>
    </div>
  );
}
