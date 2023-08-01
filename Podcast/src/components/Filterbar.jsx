// const FilterBar = ({ filterText, onFilterChange, onSortClick }) => {
//   return (
//     <div>
//       <div className="sort-buttons">
//         <button onClick={() => onSortClick("az")}>Sort A-Z</button>
//         <button onClick={() => onSortClick("za")}>Sort Z-A</button>
//         <button onClick={() => onSortClick("asc")}>Sort Ascending</button>
//         <button onClick={() => onSortClick("desc")}>Sort Descending</button>
//       </div>
//       <div className="search-box">
//         <input
//           type="text"
//           value={filterText}
//           onChange={(e) => onFilterChange(e.target.value)}
//           placeholder="Filter by title or genre..."
//         />
//       </div>
//     </div>
//   );
// };

export default FilterBar;