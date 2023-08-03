/*eslint-disable*/
import { useState, useEffect } from "react";
import Cards from "./Cards";
import Fuse from "fuse.js";
import NavbarWithFilterBar from "./Navbar";
import FavoritePodcast from "./Favorites";
// import Hero from "./Hero"

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
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

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

  // Handle favorite toggle - adding and removing podcasts from favorites
  const favoriteToggleHandler = (podcastId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(podcastId)
        ? prevFavorites.filter((id) => id !== podcastId)
        : [...prevFavorites, podcastId]
    );
    setFilteredPodcasts((prevFilteredPodcasts) =>
      prevFilteredPodcasts.map((podcast) =>
        podcast.id === podcastId
          ? { ...podcast, isFavorite: !podcast.isFavorite }
          : podcast
      )
    );
  };

  const favoritePodcasts = podcastData.filter((podcast) =>
    favorites.includes(podcast.id)
  );

  const displayedPodcasts = showFavorites ? favoritePodcasts : filteredPodcasts;

  // Store favorites in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("favoritePodcasts", JSON.stringify(favorites));
  }, [favorites]);

  const toggleView = () => {
    setShowFavorites((prev) => !prev);
  };

  return (
    <div>
      {/* <Hero /> */}
      <NavbarWithFilterBar
        filterText={filterText}
        onFilterChange={setFilterText}
        onSortClick={handleSort}
        onToggleView={toggleView}
      />
      {showFavorites ? (
        <FavoritePodcast favoritePodcasts={favoritePodcasts} />
      ) : (
        <div className="cards">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid-container">
              {displayedPodcasts.map((podcast) => (
                <Cards
                  key={podcast.id}
                  titles={podcast.title}
                  descriptions={podcast.description}
                  season={podcast.seasons}
                  images={podcast.image}
                  genre={podcast.genres.map((id) => genreMapping[id]).join(",") || " unknown"}
                  updates={readableDate(podcast.updated)}
                  IsExpanded={expandedPosterId === podcast.id}
                  onExpandedClick={() => toogleExpand(podcast.id)}
                  isFavorite={favorites.includes(podcast.id)}
                  onFavouriteClick={() => favoriteToggleHandler(podcast.id)}
                />
                
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}