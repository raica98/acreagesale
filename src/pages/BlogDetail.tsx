import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AcreageSaleLogo } from '../components/ui/logo';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/useAuth';
import { SEO } from '../components/SEO';

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
  view_count: number;
  tags: string[];
  author_id: string;
}

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setBlog(data);

        await supabase
          .from('blogs')
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq('id', data.id);

        const { data: related } = await supabase
          .from('blogs')
          .select('*')
          .eq('status', 'published')
          .neq('id', data.id)
          .limit(3)
          .order('published_at', { ascending: false });

        setRelatedBlogs(related || []);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <SEO slug="blog-detail" />
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog post not found</h1>
          <Link to="/blogs">
            <Button>View All Blogs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/">
              <AcreageSaleLogo className="w-32" />
            </Link>
            <nav className="flex items-center space-x-6">
              <Link to="/properties" className="text-gray-700 hover:text-blue-600 font-medium">
                Properties
              </Link>
              <Link to="/sell-land-fast" className="text-gray-700 hover:text-blue-600 font-medium">
                Sell Land
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                About
              </Link>
              <Link to="/blogs" className="text-blue-600 font-semibold">
                Blogs
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </Link>
              {user ? (
                <Link to="/dashboard">
                  <Button size="sm">Dashboard</Button>
                </Link>
              ) : (
                <Link to="/">
                  <Button size="sm">Sign In</Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/blogs" className="hover:text-blue-600">Blogs</Link>
          <span>/</span>
          <span className="text-gray-900">{blog.title}</span>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="relative h-96 overflow-hidden">
            <img
              src={blog.featured_image || 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg'}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              {blog.tags?.map(tag => (
                <span key={tag} className="text-sm text-blue-600 font-medium bg-blue-50 px-4 py-2 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-8 pb-8 border-b">
              <span className="text-base">
                {new Date(blog.published_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="text-base">{blog.view_count} views</span>
            </div>

            <div className="prose prose-lg max-w-none">
              {blog.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map(relatedBlog => (
                <Link
                  key={relatedBlog.id}
                  to={`/blog/${relatedBlog.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={relatedBlog.featured_image || 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg'}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(relatedBlog.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Invest in Land?
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            Browse our available properties and start your investment journey today
          </p>
          <Link to="/properties">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              View Properties
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
