import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import type { Image } from "./services/slider.service";
import arrow from "./assets/arrow.svg";
import "./Slider.css";
import { usePrevious } from "./services/usePrevious.hook";
gsap.registerPlugin(Draggable);

interface Props {
  images: Image[];
}

export const Slider: React.FC<Props> = ({ images }) => {
  const localhost = "http://localhost:1337";

  const [active, setActive] = useState(0);
  const prevActive = usePrevious(active);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imagesRef?.current) {
      gsap.to(imagesRef.current.children[active], { duration: 0, opacity: 1 });
    }
  }, []);

  useEffect(() => {
    if (active > prevActive && imagesRef?.current) {
      gsap.fromTo(
        imagesRef.current.children[active],
        { opacity: 1, x: +590 },
        { duration: 0.5, x: 0, opacity: 1 },
      );
      gsap.fromTo(
        imagesRef.current.children[active - 1],
        { opacity: 1, x: 0 },
        { duration: 0.5, x: -590, opacity: 0, ease: "none" },
      );
    } else if (active < prevActive && imagesRef?.current) {
      gsap.fromTo(
        imagesRef.current.children[active],
        { opacity: 1, x: -590 },
        { duration: 0.5, x: 0, opacity: 1 },
      );
      gsap.fromTo(
        imagesRef.current.children[active + 1],
        { opacity: 1, x: 0 },
        { duration: 0.5, x: 590, opacity: 0 },
      );
    }
  }, [active]);

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
    <main>
      <div className="slider" ref={imagesRef}>
        {images.map((image) => (
          <img
            key={image.id}
            src={localhost + image.formats?.medium?.url}
            alt={image.name}
          />
        ))}
      </div>
      <div className="arrows">
        <img src={arrow} className="arrow-prev-slide" onClick={prevSlide} />
        <img src={arrow} className="arrow-next-slide" onClick={nextSlide} />
      </div>
    </main>
  );
};
