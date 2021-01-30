export async function getSliderImages(): Promise<Image[]> {
  try {
    const response = await fetch("http://localhost:1337/slider");
    const json = await response.json();
    return json.image;
  } catch (err) {
    throw err;
  }
}

export interface Image {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: EXT;
  mime: MIME;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  created_at: Date;
  updated_at: Date;
}

enum EXT {
  PNG = ".png",
}

interface Formats {
  thumbnail: Large;
  large: Large;
  medium: Large;
  small: Large;
}

interface Large {
  name: string;
  hash: string;
  ext: EXT;
  mime: MIME;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
}

enum MIME {
  ImagePNG = "image/png",
}
