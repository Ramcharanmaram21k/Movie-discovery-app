import { Link } from 'react-router-dom';
import './index.css';

const Header = props => {
  const { searchInput, onChangeSearchInput } = props;

  return (
    <nav className="header-container">
      <Link to="/" className="header-logo-link">
        <h1 className="header-title">MovieDB</h1>
      </Link>
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search for a movie..."
          value={searchInput}
          onChange={onChangeSearchInput}
        />
      </div>
    </nav>
  );
};

export default Header;
