import { Content } from "./Content";
import background_image from "../../assets/hero-image.jpg";

export default function Landing() {
  return (
    <div className="relative w-full flex justify-center">
      {/* Jeden obraz na całą szerokość (max-width) */}
      <div className="relative w-full overflow-hidden">
        <img
          src={background_image}
          alt="hero"
          className="w-full h-screen object-cover"
        />

        {/* Dwa bloki, każdy z własną połową obrazu */}
        <div className="absolute inset-0 flex">
          {/* LEWA POŁOWA */}
          <div className="w-1/2 h-full flex items-center justify-center">
            <Content />
          </div>

          {/* PRAWA POŁOWA */}
          <div className="w-1/2 h-full flex items-center justify-center">
          </div>
        </div>
      </div>
    </div>
  );
}
