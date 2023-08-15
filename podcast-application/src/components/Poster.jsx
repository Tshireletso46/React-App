
import React, { useState } from "react";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function Poster(props) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleExpandClick = () => {
    if (!props.isFavorite) {
      props.onExpandClick();
    }
  };
  
  const handleFavoriteClick = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling to the container div
    props.onFavoriteClick();
  };

  const toggleDescription = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  const getShortenedDescription = (description, maxLength) => {
    return description.length > maxLength
      ? description.slice(0, maxLength) + "..."
      : description;
  };

  return (
    <div
      className={`card ${props.isExpanded ? 'expanded' : 'blurred'}`}
      // onClick={props.onClick}
      // id={props.id}
    >
      <h2 className='poster-title'>{props.titles}</h2>
      <img src={props.images} className="images" alt="Podcast"  id={props.id} images={props.images} onClick={props.onClick}/>
      <p>Seasons: {props.season}</p>
      <p>Genres: {props.genre}</p>
      <p>Updated: {props.updates}</p>
      
      {/* Favorite heart icon */}
      {props.isFavorite ? (
        <ThumbUpIcon className="star" onClick={() => props.onFavoriteClick(props.id)} alt="Favorite" />
      ) : (
        <ThumbUpOffAltIcon className="star" onClick={handleFavoriteClick} alt="Not Favorite" />
      )}
      
      {/* Description */}
      <div>
        <p>
          {showFullDescription
            ? props.descriptions
            : getShortenedDescription(props.descriptions, 100)}
        </p>
        {props.descriptions.length > 100 && (
          <button className="show_more" onClick={toggleDescription}>
            {showFullDescription ? "Show less" : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
}

