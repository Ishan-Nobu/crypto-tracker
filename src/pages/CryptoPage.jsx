import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { getCoinData } from "../utils/api";
import { CurrencyContext } from "../components/CurrencyContext";
import { formatCurrency } from "../utils/config";
import { LinearProgress } from "@mui/material";
import CryptoChart from "../components/CryptoChart";

function CyrptoPage() {

  const { id } = useParams();
  const [crypto, setCrypto] = useState();
  const { currency, sign } = useContext(CurrencyContext)

  useEffect(() => {
    fetchCoinData();
  }, [])

  const fetchCoinData = () => {
    getCoinData(`coins/${id}`).then(result => setCrypto(result.data));
  }

  if (!crypto) return <LinearProgress style={{ backgroundColor: "gold" }} />

  return (
    <div className="flex flex-col md:h-full md:flex-row items-start justify-center gap-2 mt-5">
      <div className="md:w-3/10 w-full flex flex-col items-center justify-center gap-5 p-4
           border-gray-600 md:border-r-1 md:border-b-0 border-b-1 border-r-0">
        <img src={crypto?.image.large} alt={crypto?.name} className="md:w-65 md:h-65 w-35 h-35"/>
        <h1 className="font-bold md:text-5xl text-2xl">{crypto?.name}</h1>
        <div className="flex flex-col items-start justify-center gap-5 mt-3">
          <p className="text-justify md:text-lg text-md md:mb-5">{crypto?.description.en.split(". ")[0]}.</p>
          <p className="md:text-2xl text-lg"> <span className="font-medium">Rank: </span>  {crypto?.market_cap_rank}</p>
          <p className="md:text-2xl text-lg"> <span className="font-medium">Current Price: </span>  {sign} {formatCurrency(crypto?.market_data.current_price[currency.toLowerCase()])}</p>
          <p className="md:text-2xl text-lg"> <span className="font-medium">Market Cap: </span>  {sign} {formatCurrency(crypto?.market_data.market_cap[currency.toLowerCase()])}</p>
        </div>
      </div>
        <CryptoChart crypto={crypto} />
    </div>
  )
}

export default CyrptoPage