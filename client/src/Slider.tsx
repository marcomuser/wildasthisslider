import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import type { Image } from "./services/slider.service";
import arrow from "./assets/arrow.svg";
import "./Slider.css";
gsap.registerPlugin(Draggable);

interface Props {
  images: Image[];
}

export const Slider: React.FC<Props> = ({ images }) => {
  const localhost = "http://localhost:1337";

  const [active, setActive] = useState(0);

  const nextSlide = () => {
    if (active < images.length - 1) {
      setActive(active + 1);
    }
  };

  const prevSlide = () => {
    if (active > 0) {
      setActive(active - 1);
    }
  };

  return (
    <div className="slider">
      <img
        className="slider-image"
        src={localhost + images[active]?.formats?.medium?.url}
        alt={images[active]?.name}
      />
      <div className="arrows">
        <img src={arrow} className="arrow-prev-slide" onClick={prevSlide} />
        <img src={arrow} className="arrow-next-slide" onClick={nextSlide} />
      </div>
    </div>
  );
};
