import { useContext, useState } from "react"
import { TextField, ThemeProvider, createTheme, TableContainer, TableHead, TableRow, TableCell, TableBody, Pagination, Paper, Table, LinearProgress } from "@mui/material";
import { formatCurrency, percentageChange } from "../utils/config";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";


function CryptoTable() {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const { sign, coinsList, loading } = useContext(GlobalContext);
    const navigate =  useNavigate();

    // filter the array of coins depending on the search value
    const handleSearchFilter = () => {
        return coinsList.filter((coin) => 
            coin.name.toLowerCase().includes(searchValue) || coin.symbol.toLowerCase().includes(searchValue)
        )
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8 mt-5">
            <h1 className="text-white font-bold text-2xl text-center">Cryptocurrency prices by market cap</h1>
            <ThemeProvider theme={darkTheme}>
                <TextField label="Search for any Cryptocurrency"
                    variant="outlined"
                    className="md:w-1/2 w-2/3"
                    onChange={(e) => setSearchValue(e.target.value)} />
                <TableContainer component={Paper} sx={{width: "80%", borderRadius: 2}}>
                    {
                        loading ? (<LinearProgress sx={{backgroundColor: "gold"}}/>) : (   
                            <Table sx={{width: "100%%", margin: "auto"}}>
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
                                                onClick={() => navigate(`/crypto/${rowCoin?.id}`)}>
                                                <TableCell component="th" sx={{display: "flex", gap: 1}}>
                                                    <img src={rowCoin?.image} alt={rowCoin?.name} className="md:h-15 md:mb-2 h-10 mb-1"/>
                                                    <div className="flex flex-col md:gap-2">
                                                        <span className="md:text-lg text-sm">{rowCoin?.name}</span>
                                                        <span className="uppercase md:text-lg text-sm">{rowCoin?.symbol}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {sign} {formatCurrency(rowCoin?.current_price.toFixed(2))}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {percentageChange(rowCoin?.price_change_percentage_24h.toFixed(2))}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {sign} {formatCurrency(rowCoin?.market_cap.toString().slice(0, -6))}
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

export default CryptoTable