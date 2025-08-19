import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import MovieCard from '../MovieCard';
import Header from '../Header';
import './index.css';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

// Genre IDs from TMDB
const genres = [
  { id: null, name: 'Popular' }, // null ID will fetch from the 'popular' endpoint
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
];

class Home extends Component {
  state = {
    searchInput: '',
    moviesList: [],
    isLoading: true,
    currentPage: 1,
    activeGenreId: null, // Default to 'Popular'
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    const { currentPage, activeGenreId } = this.state;
    this.setState({ isLoading: true });

    let url;
    if (activeGenreId === null) {
      // Fetch popular movies
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`;
    } else {
      // Fetch movies by genre
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${activeGenreId}&page=${currentPage}`;
    }

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ moviesList: data.results, isLoading: false });
    } else {
      console.error('Failed to fetch movies');
      this.setState({ isLoading: false });
    }
  };

  handleGenreClick = genreId => {
    // Reset to page 1 and fetch movies for the new genre
    this.setState({ activeGenreId: genreId, currentPage: 1 }, this.fetchMovies);
  };

  handlePageChange = (increment) => {
    this.setState(prevState => ({
        currentPage: Math.max(1, prevState.currentPage + increment)
    }), this.fetchMovies);
  }

  onChangeSearchInput = event => {
    this.setState({ searchInput: event.target.value });
  };

  render() {
    const { isLoading, moviesList, searchInput, currentPage, activeGenreId } = this.state;

    const filteredMovies = moviesList.filter(movie =>
      (movie.title || '').toLowerCase().includes(searchInput.toLowerCase()),
    );

    return (
      <>
        <Header
          searchInput={searchInput}
          onChangeSearchInput={this.onChangeSearchInput}
        />
        <div className="home-container">
          <div className="genres-container">
            {genres.map(genre => (
              <button
                key={genre.id}
                type="button"
                className={`genre-tab ${activeGenreId === genre.id ? 'active' : ''}`}
                onClick={() => this.handleGenreClick(genre.id)}
              >
                {genre.name}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="loader-container">
              <ThreeDots color="#00BFFF" height={80} width={80} />
            </div>
          ) : (
            <>
              <ul className="movies-list">
                {filteredMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
              <div className="pagination-container">
                  <button 
                      type="button" 
                      className="pagination-button" 
                      onClick={() => this.handlePageChange(-1)}
                      disabled={currentPage === 1}
                  >
                      Previous
                  </button>
                  <p className="page-number">{currentPage}</p>
                  <button 
                      type="button" 
                      className="pagination-button" 
                      onClick={() => this.handlePageChange(1)}
                  >
                      Next
                  </button>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default Home;
