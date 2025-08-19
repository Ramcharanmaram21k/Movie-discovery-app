import MovieCard from '../MovieCard';
import './index.css';

const Watchlist = ({ watchlist }) => {
  return (
    <div className="watchlist-container">
      <h1 className="watchlist-title">My Watchlist</h1>
      {watchlist.length > 0 ? (
        <ul className="movies-list">
          {watchlist.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : (
        <p className="empty-watchlist-message">Your watchlist is empty. Add some movies!</p>
      )}
    </div>
  );
};

export default Watchlist;
