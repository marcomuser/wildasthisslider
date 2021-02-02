import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import "./App.css";
import { getSliderImages, Image } from "./services/slider.service";
import { Slider } from "./components/Slider";

export const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const json = await getSliderImages();
        setImages([...json]);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
      }
    })();
  }, []);

  return (
    <div className="App">
      {isLoading ? <CircularProgress /> : <Slider images={images} />}
      {isError && <p className="error-message">😟 Something went wrong. Try to reload the page!</p>}
    </div>
  );
};
