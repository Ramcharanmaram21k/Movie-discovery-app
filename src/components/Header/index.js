import { Link } from 'react-router-dom';
import { useWatchlist } from '../../App';
import { FiSearch } from 'react-icons/fi'; // search icon
import './index.css';

const Header = props => {
  const { searchInput, onChangeSearchInput } = props;
  const { watchlist } = useWatchlist();

  return (
    <nav className="header-container">
      {/* Left: Logo */}
      <Link to="/" className="header-logo-link">
        <h1 className="header-title">MovieDB</h1>
      </Link>

      {/* Center: Search */}
      <div className="search-input-container">
        <FiSearch className="search-icon" />
        <input
          type="search"
          className="search-input"
          placeholder="Search for a movie..."
          value={searchInput}
          onChange={onChangeSearchInput}
        />
      </div>

      {/* Right: Watchlist */}
      <div className="watchlist-nav">
        <Link to="/watchlist" className="watchlist-link">
          <span className="watchlist-text">My Watchlist</span>
           <span className="watchlist-count">-{watchlist.length}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
