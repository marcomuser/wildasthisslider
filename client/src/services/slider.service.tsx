export async function getSliderImages() {
  try {
    const response = await fetch("http://localhost:1337/slider");
    const json = await response.json();
    return json.image;
  } catch (err) {
    throw err;
  }
}
