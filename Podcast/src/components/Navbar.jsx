/*eslint-disable*/
const Navbar = ({ filterText, onFilterChange, onSortClick, onToggleView, showFavorites, selectedGenre, setSelectedGenre}) => {

  const Genre = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };


  return (
    <nav> 
      <header>
        <img src="./images/Logo.png" alt="Logo" className="logo" onClick={onToggleView}/>
      </header>
      <div>
        <div className="sort-buttons">
           <button onClick={() => onSortClick("az")}>Sort A-Z</button>
          <button onClick={() => onSortClick("za")}>Sort Z-A</button>
          <button onClick={() => onSortClick("asc")}>Sort Ascending</button>
          <button onClick={() => onSortClick("desc")}>Sort Descending</button>
          <button onClick={onToggleView}>{showFavorites ? "All Shows" : "Favorites"}</button>
        </div>
        
        <div className="search-box">
          <input
            type="text"
            value={filterText}
            onChange={(e) => onFilterChange(e.target.value)}
            placeholder="Search..."
          />

            <div className="genre-filter">
              <label htmlFor="genre-select">Filter by Genre: </label>
              <select
                id="genre-select"
                value={selectedGenre}
                onChange={handleGenreChange}
              >
                <option value="">All Genres</option>
                {Object.entries(Genre).map(([id, genre]) => (
                  <option key={id} value={id}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;