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
  const dotsRef = useRef<HTMLUListElement>(null);
  const imageWidth = imagesRef.current?.offsetWidth;
  let snapValue = 0;

  useEffect(() => {
    slideDotLeftAnimation();
  }, []);

  useEffect(() => {
    if (active > prevActive) {
      slideLeftAnimation();
      slideDotLeftAnimation();
    } else if (active < prevActive) {
      slideRightAnimation();
      slideDotRightAnimation();
    }

    if (imagesRef.current) {
      const imageWidth = imagesRef.current.offsetWidth;
      Draggable.create(imagesRef.current, {
        type: "x",
        inertia: true,
        edgeResistance: 0.75,
        throwResistance: 2000,
        maxDuration: 0.2,
        bounds: { minX: -imageWidth * 3, maxX: 0, minY: 0, maxY: 680 },
        snap: (value) => {
          snapValue = Math.round(value / imageWidth) * imageWidth;
          return Math.round(value / imageWidth) * imageWidth;
        },
        onThrowComplete: () => {
          if (active < images.length - 1 && snapValue < -imageWidth * active) {
            setActive(active + 1);
          } else if (active > 0 && snapValue > -imageWidth * active) {
            setActive(active - 1);
          }
        },
      });
    }
  }, [active]);

  const slideLeftAnimation = () => {
    if (imagesRef?.current && imageWidth) {
      gsap.to(imagesRef.current, {
        duration: 0.5,
        ease: "power3",
        x: -imageWidth * active,
      });
    }
  };

  const slideRightAnimation = () => {
    if (imagesRef?.current && imageWidth) {
      gsap.to(imagesRef.current, {
        duration: 0.5,
        ease: "power3",
        x: -(imageWidth * 3) + imageWidth * (images.length - 1 - active),
      });
    }
  };

  const slideDotLeftAnimation = () => {
    if (dotsRef?.current) {
      gsap.to(dotsRef.current?.children[active], {
        duration: 0.5,
        ease: "power3",
        x: -15,
        backgroundColor: "lightgrey",
      });
    }
  };

  const slideDotRightAnimation = () => {
    if (dotsRef?.current) {
      gsap.to(dotsRef.current?.children[active + 1], {
        duration: 0.5,
        ease: "power3",
        x: 0,
        backgroundColor: "hsla(197, 10%, 87%, 25%)",
      });
    }
  };

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
      <div className="slider-elements">
        <ul className="dots" ref={dotsRef}>
          {images.map((el) => (
            <li key={el.id}></li>
          ))}
        </ul>
        <div className="arrows">
          <img src={arrow} className="arrow-prev-slide" onClick={prevSlide} />
          <img src={arrow} className="arrow-next-slide" onClick={nextSlide} />
        </div>
      </div>
    </section>
  );
};
