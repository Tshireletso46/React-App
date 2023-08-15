import { useState, useEffect } from "react";
import Poster from "./Poster";
import Fuse from "fuse.js";
import Navbar from "./NavBar";
import FavoritePodcast from "./Favorites";
import Header from "./Header";
import { IconButton } from "@mui/material";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

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

const PodcastList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [podcastData, setPodcastData] = useState([]);
  const [expandedPosterId, setExpandedPosterId] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [numPodcastToShow, setNumPodcastToShow] = useState(12);
  const [selectedSortOption, setSelectedSortOption] = useState("az");

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then((res) => res.json())
      .then((data) => {
        setPodcastData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching podcast data:", error);
        setIsLoading(false);
      });
  }, []);

  // Show more podcasts
  const handleShowMoreClick = () => {
    setNumPodcastToShow(numPodcastToShow + 12);
  };

  // Function to handle going back to the top
  const handleBackToTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Search podcasts based on filter text
  useEffect(() => {
    if (!filterText) {
      // If filterText is empty, show podcasts based on the selected genre filter
      if (selectedGenre) {
        const filteredByGenre = podcastData.filter(
          (podcast) =>
            selectedGenre === "all" ||
            podcast.genres.includes(Number(selectedGenre))
        );
        setFilteredPodcasts(filteredByGenre);
      } else {
        setFilteredPodcasts(podcastData);
      }
    } else {
      // Search podcasts using Fuse.js with the title, description, and genres keys
      const options = {
        keys: ["title", "description", "genres"],
      };

      const fuse = new Fuse(podcastData, options);
      const result = fuse.search(filterText);
      setFilteredPodcasts(result.map((item) => item.item));
    }
  }, [filterText, podcastData, selectedGenre]);

  // Sort podcasts based on sort option
  const handleSort = (option) => {
    setSelectedSortOption(option);
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

  // Expand to show more description
  const toggleExpand = (podcastId) => {
    setExpandedPosterId((prevState) => (prevState === podcastId ? null : podcastId));
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

  // Show only favorite podcasts
  const handleShowFavoritesClick = () => {
    setShowFavorites(true);
  };

  // Show all podcasts
  const handleShowAllClick = () => {
    setShowFavorites(false);
  };

  // Function to format date
  const formatDate = (isDate) => {
    const date = new Date(isDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  // Filter the podcasts based on the showFavorites state
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
      <Navbar onToggleView={toggleView} />
      {showFavorites ? (
        <FavoritePodcast favoritePodcasts={favoritePodcasts} />
      ) : (
        <>
          <div className="sort-dropdown">
            <label htmlFor="sort-select" className="sort_by">Sort By: </label>
            <select
              id="sort-select"
              value={selectedSortOption}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
              <option value="asc">Date Ascending</option>
              <option value="desc">Date Descending</option>
            </select>
          </div>

          <div className="genre-filter">
            <label htmlFor="genre-select" className="filter_genre">Filter by Genre: </label>
            <select
              id="genre-select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              {Object.entries(Genre).map(([id, genre]) => (
                <option key={id} value={id}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="search-box">
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Search"
            />
          </div>

          <Header />
          <div className="grid-container">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              displayedPodcasts.slice(0, numPodcastToShow).map((podcast) => (
                <Poster
                  key={podcast.id}
                  id={podcast.id}
                  titles={podcast.title}
                  descriptions={podcast.description}
                  season={podcast.seasons}
                  images={podcast.image}
                  onClick={props.HandlePreviewClick}
                  genre={
                    podcast.genres.map((id) => Genre[id]).join(", ") || "unknown"
                  }
                  updates={formatDate(podcast.updated)}  
                  isFavorite={favorites.includes(podcast.id)}
                  onFavoriteClick={() => favoriteToggleHandler(podcast.id)}
                />
              ))
            )}
          </div>
        </>
      )}

      {filteredPodcasts.length > numPodcastToShow && (
        <div className="show-more-button">
          <IconButton onClick={handleShowMoreClick}>
            <KeyboardDoubleArrowDownIcon className="expand-icon" />
          </IconButton>
        </div>
      )}

      {numPodcastToShow > 12 && (
        <div className="back-to-top-button">
          <IconButton onClick={handleBackToTopClick}>
            <KeyboardDoubleArrowUpIcon className="back-to-top-icon" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default PodcastList;
