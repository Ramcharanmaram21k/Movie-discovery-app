import { Link } from 'react-router-dom';
import './index.css';

const MovieCard = props => {
  const { movie } = props;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  
  return (
    <Link to={`/movie-details/${movie.id}`} className="movie-card-link">
      <li className="movie-card">
        <img src={posterUrl} alt={movie.title} className="movie-poster" />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
        </div>
      </li>
    </Link>
  );
};

export default MovieCard;
