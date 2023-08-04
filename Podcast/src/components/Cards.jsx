import React, { useState } from "react";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';


export default function Cards(props) {
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    
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
          <p>{props.descriptions}</p>
        </div>
      ) : (
        <p>{props.descriptions.slice(0, 100)}{props.descriptions.length > 100 && "..."}</p>
      )}
      {props.descriptions.length > 100 && (
        <>
          {expanded ? (
            <KeyboardDoubleArrowUpIcon className="expand-icon" onClick={handleExpand} />
          ) : (
            <KeyboardDoubleArrowDownIcon className="expand-icon" onClick={handleExpand} />
          )}
        </>
      )}
    </div>
  );
}