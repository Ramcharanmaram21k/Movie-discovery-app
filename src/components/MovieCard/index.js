import { Link } from 'react-router-dom';
import { useWatchlist } from '../../App';
import './index.css';

const MovieCard = props => {
  const { movie } = props;
  const { title, poster_path: posterPath, vote_average: rating, id } = movie;
  const { toggleWatchlist, isInWatchlist } = useWatchlist();

  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  const isMovieInWatchlist = isInWatchlist(id);

  const handleWatchlistClick = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation();
    toggleWatchlist(movie);
  };

  return (
    <li className="movie-card">
      <Link to={`/movie-details/${id}`} className="movie-link">
        <div className="movie-card-content">
          <img src={imageUrl} alt={title} className="movie-poster" />
          <div className="movie-info">
            <h3 className="movie-title">{title}</h3>
            <div className="movie-rating">
              <span className="star">⭐</span>
              <span className="rating-value">{rating?.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
      <button
        type="button"
        className={`watchlist-btn ${isMovieInWatchlist ? 'in-watchlist' : ''}`}
        onClick={handleWatchlistClick}
        title={isMovieInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      >
        <span className="watchlist-icon">
          {isMovieInWatchlist ? '❤️' : '🤍'}
        </span>
        <span className="watchlist-text">
          {isMovieInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
        </span>
      </button>
    </li>
  );
};

export default MovieCard;