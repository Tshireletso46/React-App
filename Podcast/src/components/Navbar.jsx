const Navbar = ({ filterText, onFilterChange, onSortClick }) => {
  return (
    <nav> 
      <header>
        <img src="./images/Logo.png" alt="Logo" className="logo" />
      </header>
      <div>
        <div className="sort-buttons">
           <button onClick={() => onSortClick("az")}>Sort A-Z</button>
          <button onClick={() => onSortClick("za")}>Sort Z-A</button>
          <button onClick={() => onSortClick("asc")}>Sort Ascending</button>
          <button onClick={() => onSortClick("desc")}>Sort Descending</button>
          <button>Favourites</button>
        </div>
        
        <div className="search-box">
          <input
            type="text"
            value={filterText}
            onChange={(e) => onFilterChange(e.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

