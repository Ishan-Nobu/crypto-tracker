import { createContext, useEffect, useState } from "react"

export const CurrencyContext = createContext();

function CurrencyContextProvider({ children }) {

    const [currency, setCurrency] = useState("INR");
    const [sign , setSign] = useState("");

    useEffect(() => {
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

    return (
        <div>
            <CurrencyContext.Provider value={{currency, setCurrency, sign}}>
                {children}
            </CurrencyContext.Provider>
        </div>
    )
}

export default CurrencyContextProvider