const NavbarWithFilterBar = ({ filterText, onFilterChange, onSortClick }) => {
  return (
    <nav>
      <header>
        <img src="./images/Logo.png" alt="Logo" className="logo" />
      </header>
      <div>
        <ul className="sort-buttons">
          <li> <button onClick={() => onSortClick("az")}>Sort A-Z</button></li>
          <li><button onClick={() => onSortClick("za")}>Sort Z-A</button></li>
          <li><button onClick={() => onSortClick("asc")}>Sort Ascending</button></li>
          <li><button onClick={() => onSortClick("desc")}>Sort Descending</button></li>
        </ul>
        
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

export default NavbarWithFilterBar;
