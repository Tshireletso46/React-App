import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../Styles/Hero.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function Hero() {
  const [shows, setShows] = useState([]);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const slideWidth = 200;
  const slidesToShow = 5;
  const containerWidth = slideWidth * shows.length;

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get("https://podcast-api.netlify.app/shows")
      .then((response) => {
        // Update the state with the fetched data
        setShows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const moveCarousel = (steps) => {
    const newPosition = carouselPosition + steps * slideWidth * slidesToShow;
    setCarouselPosition(Math.max(-(containerWidth - slideWidth * slidesToShow), Math.min(0, newPosition)));
  };
  let interval;
  const handleBackwardMouseDown = () => {
    clearInterval(interval);
    interval = setInterval(() => moveCarousel(1), 100);
  };
  const handleForwardMouseDown = () => {
    clearInterval(interval);
    interval = setInterval(() => moveCarousel(-1), 100);
  };
  const handleMouseUp = () => {
    clearInterval(interval);
  };

  return (
    <div className="hero-section">
      <div className="carousel-container" >
        <div
          className="show-info"
          style={{
            transform: `translateX(${carouselPosition}px)`,
            width: `${containerWidth}px`,
          }}
        >
          {shows.map((show) => (
            <div key={show.id}>
              <img src={show.image} alt={show.name} width={slideWidth} />
              <h1>{show.name}</h1>
            </div>
          ))}
        </div>

      </div>
      <ArrowBackIosNewIcon
        className="arrow-icon backward"
        onMouseDown={handleBackwardMouseDown}
        onMouseUp={handleMouseUp}
      />
      <ArrowForwardIosIcon
        className="arrow-icon forward"
        onMouseDown={handleForwardMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}