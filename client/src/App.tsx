import React, { useState, useEffect } from "react";
import "./App.css";
import { getSliderImages } from "./services/slider.service";
import { Slider } from "./Slider";
import { CircularProgress } from '@material-ui/core';

interface Props {}

export const App: React.FC<Props> = () => {
  const [images, setImages] = useState<object[]>([]);
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
      {isError && <p>😟 Something went wrong. Try to reload the page!</p>}
    </div>
  );
};
