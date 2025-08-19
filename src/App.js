import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails'; // 1. Import MovieDetails

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* 2. Use Routes instead of Switch */}
        <Routes> 
          {/* 3. Use the element prop instead of component */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movie-details/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
