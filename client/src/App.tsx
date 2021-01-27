import React, { useState, useEffect } from "react";
import "./App.css";
import { getSliderImages } from "./services/slider.service";
import Slider from "./Slider";

interface AppProps {}

function App({}: AppProps) {
  const [images, setImages] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const json = await getSliderImages();
        setImages([...json]);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="App">
      {isError && <p>Something went wrong. Try to reload the page!</p>}
      {isLoading ? <p>Loading...</p> : <Slider images={images} />}
    </div>
  );
}

export default App;
