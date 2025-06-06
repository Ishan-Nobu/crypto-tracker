import { createContext, useEffect, useState } from "react"
import { getCoinData } from "../utils/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {

    const [currency, setCurrency] = useState("INR");
    const [sign , setSign] = useState("");
    const [coinsList, setCoinsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [favouritesList, setFavouritesList] =  useState([]);

    useEffect(() => {
    if (user) {
      const ref = doc(db, "favourites", user?.uid);
      var unsubscribe = onSnapshot(ref, (coin) => {
        if (coin.exists()) {
          setFavouritesList(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

    useEffect(() => 
    {
        onAuthStateChanged(auth, (user) => 
        {
            user ? setUser(user) : setUser(null); 
        })
    }, [])

    useEffect(() => {
        fetchCoinsList();
        switch (currency) {
            case "INR":
                setSign("₹");
                break;
            case "USD":
                setSign("$");
                break;
            case "JPY":
                setSign("¥");
                break;
            default:
                setSign(currency)
                break;
        }
    }, [currency]);

    //fetch all the coins based on market cap
    const fetchCoinsList = () => {
        setLoading(true);
        getCoinData('coins/markets',
            { vs_currency: currency, order: "market_cap_desc", per_page: 250, page: 1, sparkline: false })
            .then(result => setCoinsList(result.data));
        setLoading(false);
    }

    return (
        <div>
            <GlobalContext.Provider value={{currency, setCurrency, sign, coinsList, loading, user, favouritesList }}>
                {children}
            </GlobalContext.Provider>
        </div>
    )
}

export default GlobalContextProvider