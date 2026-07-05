import React, { useState } from 'react';
import { LibraryBook } from '../types';
import { Search, BookOpen, User, Calendar, Bookmark, BookmarkCheck, ArrowLeft, ChevronRight } from 'lucide-react';

interface LibraryViewProps {
  books: LibraryBook[];
  onToggleBorrow: (bookId: string) => void;
}

export default function LibraryView({ books, onToggleBorrow }: LibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeBook, setActiveBook] = useState<LibraryBook | null>(null);

  // Derive unique categories
  const categories = ['All', ...Array.from(new Set(books.map(b => b.category)))];

  // Filter books
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="library-module-container" className="space-y-6">
      {activeBook ? (
        /* Detailed Textbook / Reader View */
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm animate-in slide-in-from-right duration-200">
          <button
            onClick={() => setActiveBook(null)}
            className="mb-6 flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Digital Library Catalog</span>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Cover Panel */}
            <div className="md:col-span-1 space-y-4">
              <div className={`aspect-[3/4] w-full max-w-[220px] mx-auto rounded-lg shadow-xl ${activeBook.coverColor} p-6 flex flex-col justify-between relative overflow-hidden`}>
                {/* Book design elements */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/15 shadow-inner"></div>
                <div className="space-y-2 relative z-10">
                  <div className="text-[10px] uppercase tracking-widest opacity-60 font-mono">LWTS Digital Library</div>
                  <h3 className="text-base font-serif font-semibold leading-snug">{activeBook.title}</h3>
                </div>
                <div className="relative z-10 space-y-1">
                  <p className="text-xs font-medium opacity-80">{activeBook.author}</p>
                  <p className="text-[9px] opacity-50 font-mono">ISBN: {activeBook.isbn}</p>
                </div>
              </div>

              <div className="pt-4 text-center">
                <button
                  id={`borrow-toggle-${activeBook.id}`}
                  onClick={() => {
                    onToggleBorrow(activeBook.id);
                    // Update current selected book reference immediately to reflect updated availability
                    setActiveBook(prev => prev ? { ...prev, available: !prev.available } : null);
                  }}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 ${
                    activeBook.available
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                      : 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 border border-rose-100 dark:border-rose-950/30'
                  }`}
                >
                  {activeBook.available ? (
                    <>
                      <BookmarkCheck className="w-4 h-4" />
                      <span>Borrow This E-Book</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Return E-Book / Release Checkout</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-slate-400 mt-2">
                  {activeBook.available ? 'Available immediately for offline academic reading.' : 'You have currently checked out this book.'}
                </p>
              </div>
            </div>

            {/* Right Meta/Chapters Panel */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-semibold rounded-full uppercase tracking-wider">{activeBook.category}</span>
                <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white mt-2">{activeBook.title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1" /> {activeBook.author}</span>
                  <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> Published: {activeBook.year}</span>
                  <span>Pages: {activeBook.pages}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Scholarly Summary</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-serif italic">
                  &ldquo;{activeBook.summary}&rdquo;
                </p>
              </div>

              {/* Chapter Indices */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Chapters &amp; Page Index</h4>
                <div className="border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  {activeBook.chapters.map((chapter, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{chapter.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded">Pages: {chapter.pages}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Grid Catalog View */
        <div className="space-y-5">
          {/* Top Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search theological titles, authors, or ISBN..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto justify-start md:justify-end">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog grid */}
          {filteredBooks.length === 0 ? (
            <div className="py-12 text-center text-slate-400">No books found matching your current filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => setActiveBook(book)}
                  className="group cursor-pointer rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
                >
                  {/* Decorative Cover Portion */}
                  <div className={`${book.coverColor} p-5 flex flex-col justify-between h-40 relative overflow-hidden transition-transform group-hover:scale-[1.01]`}>
                    <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/15 shadow-inner"></div>
                    <div className="text-[9px] uppercase tracking-widest font-mono opacity-65">LWTS Library</div>
                    <h3 className="text-sm font-serif font-bold leading-snug line-clamp-2 mt-2">{book.title}</h3>
                    <p className="text-xs font-medium opacity-80 mt-auto">{book.author}</p>
                  </div>

                  {/* Metadata and Quick Actions */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">{book.category}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {book.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${
                        book.available 
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' 
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                      }`}>
                        {book.available ? 'Available' : 'Borrowed / Read'}
                      </span>
                      <div className="text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white flex items-center font-medium transition-colors">
                        <span>Read Book</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
