import Icon from "@mui/material/Icon";
import { IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MovieIcon from '@mui/icons-material/Movie';
export default function Navbar({onToggleView}) {
 
  return (
    <nav 
    className="nav">
      <div className="logo">
      <MovieIcon 
      className="movie_icon" 
      />
        <IconButton onClick={onToggleView}>
        <Icon fontSize="50px"></Icon>
        <span>Sip & Chill..</span>
        </IconButton>
        <IconButton onClick={onToggleView}>
          <span className="favorites">Favorites</span>
       <FavoriteIcon />
        </IconButton>
      </div>
    </nav>
  );
}