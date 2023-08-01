import React, { useState } from "react";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

export default function Cards(props) {
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [previewImageVisible, setPreviewImageVisible] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
    setPreviewImageVisible(false); // Hide preview image when expanding/collapsing
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // You can add the logic here to save the favorite status to local storage if needed
  };

  const handlePreviewImageToggle = () => {
    setPreviewImageVisible(!previewImageVisible);
  };

  return (
    <div className="shows">
      <h2>{props.titles}</h2>
      <img src={props.images} alt={props.titles} className="images" />
      {isFavorite ? (
        <ThumbUpAltIcon className="filledLike" onClick={handleFavorite} />
      ) : (
        <ThumbUpOffAltIcon className="like" onClick={handleFavorite} />
      )}
      <p>Seasons: {props.season}</p>
      <p>Genre: {props.genre}</p>
      <p>Updated: {props.updates}</p>
      {expanded ? (
        <div>
          <img
            src={props.previewImage} // Assuming you have a "previewImage" property in the "props" object
            alt={props.titles}
            className={`preview-image ${previewImageVisible ? "visible" : "hidden"}`}
            onClick={handlePreviewImageToggle}
          />
          <p>{props.descriptions}</p>
        </div>
      ) : (
        <p>{props.descriptions.slice(0, 100)}{props.descriptions.length > 100 && "..."}</p>
      )}
      {props.descriptions.length > 100 && (
        <KeyboardDoubleArrowDownIcon className="expand-icon" onClick={handleExpand} />
      )}
    </div>
  );
}