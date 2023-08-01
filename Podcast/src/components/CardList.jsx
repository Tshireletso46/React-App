import { useState, useEffect } from "react";
import Cards from "./Cards";
import Fuse from "fuse.js";
import NavbarWithFilterBar from "./NavbarWithFilterBar";


// Genre titles
const genreMapping = {
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

export default function CardList() {
  const [isLoading, setIsLoading] = useState(true);
  const [podcastData, setPodcastData] = useState([]);
  const [expandedPosterId, setExpandedPosterId] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => res.json())
      .then((data) => {
        setPodcastData(data);
        setIsLoading(false);
      });
  }, []);

  // Changing the date
  const readableDate = (isDate) => {
    const date = new Date(isDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const toogleExpand = (podcastId) => {
    setExpandedPosterId(podcastId === expandedPosterId ? null : podcastId);
  };

  useEffect(() => {
    if (!filterText) {
      setFilteredPodcasts(podcastData);
    } else {
      const options = {
        keys: ["title", "description", "genres"],
      };
      const fuse = new Fuse(podcastData, options);
      const result = fuse.search(filterText);
      setFilteredPodcasts(result.map((item) => item.item));
    }
  }, [filterText, podcastData]);

  const handleSort = (option) => {
    setSortOption(option);
    let sortedPodcasts = [...filteredPodcasts];
    switch (option) {
      case "az":
        sortedPodcasts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        sortedPodcasts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "asc":
        sortedPodcasts.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      case "desc":
        sortedPodcasts.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      default:
        break;
    }
    setFilteredPodcasts(sortedPodcasts);
  };

  return (
    <div>
      <NavbarWithFilterBar
        filterText={filterText}
        onFilterChange={setFilterText}
        onSortClick={handleSort}
      />
      {/* <div className="sort-buttons">
        <button onClick={() => handleSort("az")}>Sort A-Z</button>
        <button onClick={() => handleSort("za")}>Sort Z-A</button>
        <button onClick={() => handleSort("asc")}>Sort Ascending</button>
        <button onClick={() => handleSort("desc")}>Sort Descending</button>
      </div>
      <div className="search-box">
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Filter by title or genre..."
        />
      </div> */}
      <div className="cards">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid-container">
            {filteredPodcasts.map((podcast) => (
              <Cards
                key={podcast.id}
                titles={podcast.title}
                descriptions={podcast.description}
                season={podcast.seasons}
                images={podcast.image}
                genre={genreMapping[podcast.genres]}
                updates={readableDate(podcast.updated)}
                IsExpanded={expandedPosterId === podcast.id}
                onExpandedClick={() => toogleExpand(podcast.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
