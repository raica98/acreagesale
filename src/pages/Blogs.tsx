import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { SEO } from '../components/SEO';
import { SharedNavigation } from '../components/ui/SharedNavigation';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
  view_count: number;
  tags: string[];
  author_id: string;
}

export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags || [])));

  const filteredBlogs = selectedTag
    ? blogs.filter(blog => blog.tags?.includes(selectedTag))
    : blogs;

  const featuredBlog = filteredBlogs[0];
  const recentBlogs = filteredBlogs.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <SEO slug="blogs" />
      <SharedNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Land Investment Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert advice, market trends, and success stories to help you make informed decisions about land investments
          </p>
        </div>

        {/* Tags Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTag === null
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Posts
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">No blog posts yet</h3>
            <p className="text-gray-600">Check back soon for insightful articles about land investments!</p>
          </div>
        ) : (
          <>
            {/* Featured Blog */}
            {featuredBlog && (
              <Link
                to={`/blog/${featuredBlog.slug}`}
                className="block mb-12 group"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-80 md:h-auto overflow-hidden">
                      <img
                        src={featuredBlog.featured_image || 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg'}
                        alt={featuredBlog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        {featuredBlog.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className="text-sm text-blue-600 font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {featuredBlog.title}
                      </h2>
                      <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                        {featuredBlog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{new Date(featuredBlog.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span>{featuredBlog.view_count} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Recent Blogs Grid */}
            {recentBlogs.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentBlogs.map(blog => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={blog.featured_image || 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg'}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          {blog.tags?.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t">
                          <span>{new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span>{blog.view_count} views</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 mt-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Land Investment Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Browse our curated selection of premium land properties
          </p>
          <Link to="/properties">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              View Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
