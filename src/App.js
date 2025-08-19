import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Header from './components/Header';
import MovieCard from './components/MovieCard';

// Create Watchlist Context
const WatchlistContext = createContext();

// Custom hook to use watchlist context
export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within WatchlistProvider');
  }
  return context;
};

// Watchlist Provider Component
const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('movieWatchlist');
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (error) {
        console.error('Error parsing watchlist from localStorage:', error);
        setWatchlist([]);
      }
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Add movie to watchlist
  const addToWatchlist = (movie) => {
    setWatchlist(prevWatchlist => {
      // Check if movie is already in watchlist
      const isAlreadyInWatchlist = prevWatchlist.some(item => item.id === movie.id);
      if (isAlreadyInWatchlist) {
        return prevWatchlist;
      }
      return [...prevWatchlist, movie];
    });
  };

  // Remove movie from watchlist
  const removeFromWatchlist = (movieId) => {
    setWatchlist(prevWatchlist => 
      prevWatchlist.filter(movie => movie.id !== movieId)
    );
  };

  // Check if movie is in watchlist
  const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  // Toggle movie in watchlist
  const toggleWatchlist = (movie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

// Watchlist Page Component (inline)
const WatchlistPage = () => {
  const { watchlist } = useWatchlist();

  return (
    <>
      <Header searchInput="" onChangeSearchInput={() => {}} />
      <div className="watchlist-container">
        <div className="watchlist-header">
          <h1 className="watchlist-title">My Watchlist</h1>
          <p className="watchlist-subtitle">
            {watchlist.length === 0 
              ? "Start building your watchlist by adding movies you want to watch!" 
              : `You have ${watchlist.length} ${watchlist.length === 1 ? 'movie' : 'movies'} in your watchlist`
            }
          </p>
        </div>
        
        {watchlist.length > 0 ? (
          <ul className="movies-list">
            {watchlist.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        ) : (
          <div className="empty-watchlist">
            <div className="empty-watchlist-icon">🎬</div>
            <h2 className="empty-watchlist-title">Your watchlist is empty</h2>
            <p className="empty-watchlist-message">
              Discover movies and add them to your watchlist to keep track of what you want to watch!
            </p>
            <a href="/" className="browse-movies-btn">
              Browse Movies
            </a>
          </div>
        )}
      </div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <WatchlistProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/movie-details/:id" element={<MovieDetails />} />
            <Route exact path="/watchlist" element={<WatchlistPage />} />
          </Routes>
        </BrowserRouter>
      </WatchlistProvider>
    </div>
  );
}

export default App;