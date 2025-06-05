import { useContext, useEffect, useState } from "react"
import { getCoinData } from "../utils/api"
import { CurrencyContext } from "./CurrencyContext"
import AliceCarousel from 'react-alice-carousel';
import { useNavigate } from "react-router-dom";
import { formatCurrency, percentageChange } from "../utils/config";


function Hero() {

  const { currency, sign } = useContext(CurrencyContext)
  const [trendingData, setTrendingData] = useState([]);
  const navigate =  useNavigate();

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency])

  //fetch trending coins
  const fetchTrendingCoins = () => {
    getCoinData('coins/markets',
      { vs_currency: currency, order: "market_cap_desc", per_page: 10, page: 1, sparkline: false, price_change_percentage: "24h" })
      .then(result => setTrendingData(result.data));
  }

  // map the array of trending coins on another variable for displaying on carousel
  const items = trendingData.map((coin) => {
    return (
      <div className="flex flex-col items-center uppercase gap-5 pt-3">
        <img src={coin?.image} alt={coin?.name} className="h-30 mb-2 cursor-pointer hover:scale-120 ease-in-out" loading="lazy" 
          onClick={() => navigate(`/crypto/${coin?.id}`)} />
        <span>{coin?.symbol} &nbsp; {percentageChange(coin?.price_change_percentage_24h.toFixed(2))} </span>
        <span>{sign} {formatCurrency(coin?.current_price.toFixed(2))}</span>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 1
    },
    568: {
      items: 2
    },
    1024: {
      items: 4,
    },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-7">
      <div className="mt-10">
        <h1 className="text-white text-4xl font-bold">Crypto Tracker</h1>
      </div>
      <div>
        <p className="text-white text-lg text-center">Get all the data about your favourite crypto currency here!</p>
      </div>
      <div className="h-70 w-full mt-10">
        <AliceCarousel
          mouseTracking
          infinite
          autoPlay
          autoPlayInterval={2000}
          animationDuration={4000}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          items={items} />
      </div>
    </div>
  )
}

export default Hero

// bg-[url(../public/background.png)]