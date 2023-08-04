/*eslint-disable*/
export default function Navbar({onToggleView}) {
  
  return (
    <nav>
      <img
        src="./images/Logo.png" 
        alt="Logo"
        className="logo"
        onClick={onToggleView}
      />
      <span onClick={onToggleView}>favourites</span>
    </nav>
  );
}







