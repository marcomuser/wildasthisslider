import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import type { Image } from "../services/slider.service";
import arrow from "../assets/arrow.svg";
import "./Slider.css";
import { usePrevious } from "../services/usePrevious.hook";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
gsap.registerPlugin(Draggable, InertiaPlugin);

interface Props {
  images: Image[];
}

export const Slider: React.FC<Props> = ({ images }) => {
  const localhost = "http://localhost:1337";

  const [active, setActive] = useState(0);
  const prevActive = usePrevious(active);
  const imagesRef = useRef<HTMLDivElement>(null);
  const imageWidth = imagesRef.current?.offsetWidth;

  useEffect(() => {
    if (imagesRef?.current) {
      Draggable.create(imagesRef.current, {
        type: "x",
        bounds: {
          minX: 0,
          maxX: imagesRef.current.clientWidth + window.innerWidth * 0.88,
          minY: 0,
          maxY: 0
        },
        inertia: true,
        snap: function(value) {
          return value;
        }
      });
    }
  }, []);

  useEffect(() => {
    if (active > prevActive && imagesRef?.current && imageWidth) {
      gsap.to(imagesRef.current, {
        duration: 0.5,
        ease: "power3",
        x: -imageWidth * active,
      });
    } else if (active < prevActive && imagesRef?.current && imageWidth) {
      gsap.to(imagesRef.current, {
        duration: 0.5,
        ease: "power3",
        x: -(imageWidth * 3) + imageWidth * (images.length - 1 - active),
      });
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
    <section>
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
    </section>
  );
};
