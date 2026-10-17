"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { getStoredBlogPosts, BlogItem } from "@/lib/data/cms-data";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  useEffect(() => {
    setBlogs(getStoredBlogPosts());
  }, []);

  const post = blogs.find((b) => b.slug === resolvedParams.slug);

  if (!post) {
    return (
      <div className="py-24 text-center text-[#111215] space-y-4 bg-[#FAFAF8]">
        <h1 className="text-3xl font-bold">Article Not Found</h1>
        <p className="text-xs text-[#71757E]">The requested article could not be loaded or may have been removed.</p>
        <Link href="/blog">
          <Button variant="outline">Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 lg:py-24 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] text-[#111215]">
      <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#519DD9] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Articles
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs font-mono text-[#71757E]">
          <span className="px-3 py-1 bg-[#F5F3EF] border border-[#E5E2DB] rounded-full text-[#519DD9] font-bold">
            {post.category}
          </span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#519DD9]" /> {post.readTime}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#71757E]" /> {post.publishedAt}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111215] font-display leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 pt-2">
          <img 
            src={post.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"} 
            alt={post.author?.name || "Author"} 
            className="w-10 h-10 rounded-full object-cover border border-[#E5E2DB]" 
          />
          <div>
            <div className="text-sm font-bold text-[#111215]">{post.author?.name || "Marcus Vance"}</div>
            <div className="text-xs text-[#71757E] font-mono">{post.author?.role || "Engineering Lead"}</div>
          </div>
        </div>
      </div>

      {post.coverImage && (
        <div className="rounded-2xl overflow-hidden max-h-96 border border-[#E5E2DB] shadow-xs">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Article Content */}
      <div className="p-8 sm:p-12 border border-[#E5E2DB] bg-[#FFFFFF] rounded-2xl shadow-xs space-y-6">
        <div className="prose max-w-none text-[#4A4D54] text-sm sm:text-base leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 border-t border-[#E5E2DB] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-[#519DD9]" />
              {post.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 bg-[#F5F3EF] border border-[#E5E2DB] rounded-lg text-[#4A4D54] font-mono">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
