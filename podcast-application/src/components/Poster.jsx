import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Poster(props) {
  const handleExpandClick = () => {
    if (!props.isFavorite) {
      props.onExpandClick();
    }
  };
  const handleFavoriteClick = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling to the container div
    props.onFavoriteClick();
  };
  return (
    <button className={`card ${props.isExpanded ? 'expanded' : 'blurred'}`} onClick={props.onClick}
    id={props.id}
    >
      <h2 className='poster-title'>{props.titles}</h2>
      <img src={props.images} className="images"></img>
      <p> Seasons: {props.season}</p>
      <p>Genres: {props.genre}</p>
      <p>Updated: {props.updates}</p>
      {/* Favorite heart icon */}
      {props.isFavorite ? (
        <img src="./images/heart-filled.png" className="star" onClick={() => props.onFavoriteClick(props.id)} alt="Favorite" />
      ) : (
        <img src="./images/heart.png" className="star" onClick={handleFavoriteClick} alt="Not Favorite" />
      )}

     {/* Show more/ show less */}
     {props.isExpanded ? (
        <>
          <p className='poster-description'>{props.descriptions}</p>
          <ExpandLessIcon onClick={props.onExpandClick} className="expand" />
        </>
      ) : (
        <ExpandMoreIcon onClick={handleExpandClick} className="expand" />
      )}
    </button>
  );
}