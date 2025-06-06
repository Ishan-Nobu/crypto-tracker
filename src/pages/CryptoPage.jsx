import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { getCoinData } from "../utils/api";
import { formatCurrency } from "../utils/config";
import { LinearProgress } from "@mui/material";
import CryptoChart from "../components/CryptoChart";
import { GlobalContext } from "../components/GlobalContext";
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase";
import { toast } from "react-toastify";

function CryptoPage() {

  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, sign, user, favouritesList } = useContext(GlobalContext)

  const inFavourites = favouritesList.includes(coin?.id)

  useEffect(() => {
    fetchCoinData();
  }, [])

  const fetchCoinData = () => {
    getCoinData(`coins/${id}`).then(result => setCoin(result.data));
  }

  const addToFavourites = async () => {
    const ref = doc(db, "favourites", user.uid);

    try {
      await setDoc(
        ref,
        { coins: favouritesList ? [...favouritesList, coin?.id] : [coin?.id]},
        { merge: true }
      )
      toast(`${coin?.name} was added to your favourites!`)
    } 
    catch (error) {
      toast.error(error.message);s
    }
  }

  const removeFromFavourites = async () => {
    const ref = doc(db, "favourites", user.uid);

    try {
      await setDoc(
        ref,
        { coins: favouritesList.filter((c) => c !== coin?.id)},
        { merge: true }
      )
      toast(`${coin?.name} was removed from your favourites!`)
    } 
    catch (error) {
      toast.error(error.message);
    }
  } 


  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />

  return (
    <div className="flex flex-col md:h-screen md:flex-row items-start justify-center gap-2 mt-5">
      <div className="md:w-3/10 w-full h-4/5 flex flex-col items-center justify-center gap-3 p-4
           border-gray-600 md:border-r-1 md:border-b-0 border-b-1 border-r-0">
        <img src={coin?.image.large} alt={coin?.name} className="md:w-50 md:h-50 w-20 h-20" />
        <h1 className="font-bold md:text-5xl text-2xl">{coin?.name}</h1>
        <div className="flex flex-col items-start justify-center gap-2 mt-3">
          <p className="text-justify md:text-lg text-md md:mb-3">{coin?.description.en.split(". ")[0]}.</p>
          <p className="md:text-2xl text-lg"> <span className="font-medium">Rank: </span>  {coin?.market_cap_rank}</p>
          <p className="md:text-2xl text-lg"> <span className="font-medium">Current Price:
          </span>  {sign} {formatCurrency(coin?.market_data.current_price[currency.toLowerCase()])}</p>
          <p className="md:text-2xl text-lg"> <span className="font-medium">Market Cap:
          </span>  {sign} {formatCurrency(coin?.market_data.market_cap[currency.toLowerCase()])}</p>
          {user && <button className={inFavourites ? `bg-red-500 w-full md:h-15 h-10 md:p-2 p-1 rounded-lg border-3 border-black
           text-black md:text-xl text-md font-bold cursor-pointer hover:bg-red-900 ease-in-out`
            : `bg-amber-300 w-full md:h-15 h-10 md:p-2 p-1 rounded-lg border-2 border-black
             text-black md:text-xl text-md font-bold cursor-pointer hover:bg-amber-500 ease-in-out`}
            onClick={inFavourites ? removeFromFavourites : addToFavourites}>
            {inFavourites ? "Remove from favourites" : "Add to favourites"}
          </button>}
        </div>
      </div>
      <CryptoChart crypto={coin} />
    </div>
  )
}

export default CryptoPage