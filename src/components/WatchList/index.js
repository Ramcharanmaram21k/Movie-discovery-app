import { useWatchlist } from '../App';
import Header from '../Header';
import MovieCard from '../MovieCard';
import './index.css';

const Watchlist = () => {
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

export default Watchlist;