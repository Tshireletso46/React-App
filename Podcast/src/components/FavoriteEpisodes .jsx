

export default function FavoriteEpisodes({ favoriteShows, podcastData, genreMapping }) {
  const favoriteEpisodes = podcastData.filter((podcast) => favoriteShows.includes(podcast.id));

  return (
    <div className="favorite-episodes">
      <h2>Favorite Episodes</h2>
      <ul>
        {favoriteEpisodes.map((episode) => (
          <li key={episode.id}>
            <strong>{episode.title}</strong> - {genreMapping[episode.genres[0]] || "Unknown Genre"}
          </li>
        ))}
      </ul>
    </div>
  );
}

