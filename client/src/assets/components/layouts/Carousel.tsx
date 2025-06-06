import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CrosshairIcon, Gamepad2, Gift, Trophy } from "lucide-react";
import Slider from "react-slick";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 3500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1224, // 768px device width
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="w-[80%] text-yellow-700">
      <Slider {...settings}>
        <div>
          <div className="rounded-full border border-yellow-700 h-[120px] w-[300px] flex justify-center items-center flex-col">
            <CrosshairIcon />
            <h1>Ranking Competitivo Mensal</h1>
          </div>
        </div>
        <div>
          <div className="rounded-full border border-yellow-700 h-[120px] w-[300px] flex justify-center items-center flex-col">
            <Trophy />
            <h1>Crie e Gerencie Torneios</h1>
          </div>
        </div>
        <div>
          <div className="rounded-full border border-yellow-700 h-[120px] w-[300px] flex justify-center items-center flex-col">
            <Gift />
            <h1>Premiações Exclusivas</h1>
          </div>
        </div>
        <div>
          <div className="rounded-full border border-yellow-700 h-[120px] w-[300px] flex justify-center items-center flex-col">
            <Gamepad2 />
            <h1>Lobbys Privados</h1>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
