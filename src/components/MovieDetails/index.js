import { Component } from 'react';
import { useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import './index.css';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

const MovieDetailsWrapper = () => {
  const { id } = useParams();
  return <MovieDetails id={id} />;
};

class MovieDetails extends Component {
  state = {
    movieDetails: {},
    watchProviders: {}, // State to hold provider info
    isLoading: true,
  };

  componentDidMount() {
    this.fetchMovieDetails();
  }

  fetchMovieDetails = async () => {
    const { id } = this.props;

    // Fetch main movie details
    const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
    const detailsResponse = await fetch(detailsUrl);

    // Fetch watch providers
    const providersUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`;
    const providersResponse = await fetch(providersUrl);

    if (detailsResponse.ok && providersResponse.ok) {
      const detailsData = await detailsResponse.json();
      const providersData = await providersResponse.json();
      
      this.setState({
        movieDetails: detailsData,
        // Get providers for India ('IN'), default to empty object if not available
        watchProviders: providersData.results.IN || {},
        isLoading: false,
      });
    } else {
      console.error('Failed to fetch movie details or providers');
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { movieDetails, watchProviders, isLoading } = this.state;
    const backdropUrl = `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`;
    const posterUrl = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;

    // Get the list of streaming services (flatrate)
    const streamingServices = watchProviders.flatrate || [];

    return (
      <div className="movie-details-container">
        {isLoading ? (
          <div className="loader-container">
            <ThreeDots color="#00BFFF" height={80} width={80} />
          </div>
        ) : (
          <>
            <div
              className="backdrop-image"
              style={{ backgroundImage: `url(${backdropUrl})` }}
            ></div>
            <div className="details-content">
              <img src={posterUrl} alt={movieDetails.title} className="details-poster" />
              <div className="details-info">
                <h1 className="details-title">{movieDetails.title}</h1>
                <p className="details-tagline">{movieDetails.tagline}</p>
                <div className="details-meta">
                  <span>Rating: {movieDetails.vote_average?.toFixed(1)}</span>
                  <span> | </span>
                  <span>Runtime: {movieDetails.runtime} min</span>
                  <span> | </span>
                  <span>{new Date(movieDetails.release_date).getFullYear()}</span>
                </div>
                <div className="genres-container">
                    {movieDetails.genres?.map(genre => (
                        <span key={genre.id} className="genre-tag">{genre.name}</span>
                    ))}
                </div>
                <h2 className="overview-title">Overview</h2>
                <p className="details-overview">{movieDetails.overview}</p>

                {/* --- New Watch Providers Section --- */}
                {streamingServices.length > 0 && (
                  <div className="watch-providers-container">
                    <h2 className="providers-title">Available on</h2>
                    <div className="providers-list">
                      {streamingServices.map(provider => (
                        <img
                          key={provider.provider_id}
                          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                          alt={provider.provider_name}
                          className="provider-logo"
                          title={provider.provider_name}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default MovieDetailsWrapper;
