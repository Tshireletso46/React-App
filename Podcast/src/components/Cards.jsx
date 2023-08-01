import React, { useState } from "react";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

export default function Cards(props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="shows">
      <h2>{props.titles}</h2>
      <img src={props.images} alt={props.titles} className="images" />
      <ThumbUpOffAltIcon className="like" />
      <ThumbUpAltIcon className="filledLike" />
     
      <p>Seasons: {props.season}</p>
      <p>Genre: {props.genre}</p>
      <p>Updated: {props.updates}</p>
      {expanded ? <p>{props.descriptions}</p> : <p>{props.descriptions.slice(0, 100)}{props.descriptions.length > 100 && "..."}</p>}
      {props.descriptions.length > 100 && (
        <KeyboardDoubleArrowDownIcon className="expand-icon" onClick={handleExpand} />
      )}
    </div>
  );
}
