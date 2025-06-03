import { useContext, useEffect, useState } from "react"
import { CurrencyContext } from "./CurrencyContext";
import { getCoinData } from "../utils/api";
import { TextField, ThemeProvider, createTheme, TableContainer, TableHead, TableRow, TableCell, TableBody, Pagination, Paper, Table } from "@mui/material";
import { formatCurrency, percentageChange } from "../utils/config";
import { useNavigate } from "react-router-dom";


function CoinsTable() {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const [coinsList, setCoinsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const { currency, sign } = useContext(CurrencyContext);
    const navigate =  useNavigate();

    useEffect(() => {
        fetchCoinsList();
    }, [currency])

    //fetch all the coins based on market cap
    const fetchCoinsList = async () => {
        setLoading(true);
        getCoinData('coins/markets',
            { vs_currency: currency, order: "market_cap_desc", per_page: 250, page: 1, sparkline: false })
            .then(result => setCoinsList(result.data));
        setLoading(false);
    }

    // filter the array of coins depending on the search value
    const handleSearchFilter = () => {
        return coinsList.filter((coin) => 
            coin.name.toLowerCase().includes(searchValue) || coin.symbol.toLowerCase().includes(searchValue)
        )
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 mt-5">
            <h1 className="text-white font-bold text-2xl">Cryptocurrency prices by market cap</h1>
            <ThemeProvider theme={darkTheme}>
                <TextField label="Search for any Cryptocurrency"
                    variant="outlined"
                    sx={{ width: "35%" }}
                    onChange={(e) => setSearchValue(e.target.value)} />
                <TableContainer component={Paper} sx={{width: "80%"}}>
                    {
                        loading ? (<p>LOADING.....</p>) : (   // change loading to linear progress MUI component maybe
                            <Table>
                                <TableHead sx={{backgroundColor: "gold"}}>
                                    <TableRow sx={{height: 75}}>
                                    {["Coin", "Price", "24-hour Change", "Market Cap"].map((head) => (
                                        <TableCell key={head} align={head === "Coin" ? "" : "right"} sx={{color: "black", fontWeight: 750, fontSize: 17}}>
                                            {head}
                                        </TableCell>
                                            ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {handleSearchFilter().slice((page - 1) * 10, (page - 1) * 10 + 10).map((rowCoin) => {
                                        return (
                                            <TableRow key={rowCoin?.id} 
                                                className="cursor-pointer hover:bg-gray-600 ease-in-out"
                                                onClick={() => navigate(`/currency/${rowCoin?.id}`)}>
                                                <TableCell component="th" sx={{display: "flex", gap: 5}}>
                                                    <img src={rowCoin?.image} alt={rowCoin?.name} className="h-15 mb-2"/>
                                                    <div className="flex flex-col gap-2">
                                                        <span className="text-lg">{rowCoin?.name}</span>
                                                        <span className="uppercase text-lg">{rowCoin?.symbol}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {sign} {formatCurrency(rowCoin?.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {percentageChange(rowCoin.price_change_percentage_24h.toFixed(2))}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {sign} {formatCurrency(rowCoin.market_cap)}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
                <Pagination 
                    count={(handleSearchFilter().length / 10).toFixed(0)} 
                    sx={{justifyContent: "center"}}
                    onChange={(_, value) =>  {
                        setPage(value);
                        window.scroll(0, 500)}}/>
            </ThemeProvider >
        </div >
    )
}

export default CoinsTable