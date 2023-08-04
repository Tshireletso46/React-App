import Icon from "@mui/material/Icon";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
export default function NavBar({onToggleView}) {
  // const [expandedPosterId, setExpandedPosterId] = useState(null);
  // const toggleExpand = (podcastId) => {
  //   setExpandedPosterId((prevState) => (prevState === podcastId ? null : podcastId));
  // };
  return (
    <nav className="nav">
      <div className="logo">
        <IconButton onClick={onToggleView}>
        <Icon fontSize="50px"></Icon>
        <span>Sip & Chill..</span>
        </IconButton>
        <IconButton onClick={onToggleView}>
          <span>Favorite Podcasts</span>
       <FavoriteIcon />
        </IconButton>
      </div>
    </nav>
  );
}