// import Icon from "@mui/material/Icon";
import { IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function Navbar({onToggleView}) {
 
  return (
    <nav 
    className="nav">
      <div className="logo">
        <IconButton onClick={onToggleView}>
       <img src="./images/Logo.png" className="Logo"></img>
        <span>Sip & Chill..</span>
        </IconButton>

        <IconButton onClick={onToggleView}>
        <span className="favorites">Favorites</span>
       <FavoriteIcon />
        </IconButton>

        {/* <Icon /> */}
      </div>
    </nav>
  );
}