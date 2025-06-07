import { CircularProgress, createTheme, ThemeProvider } from "@mui/material"
import { useEffect, useState, useContext } from "react"
import { Line } from "react-chartjs-2"
import { getCoinData } from "../utils/api"
import { CategoryScale, Chart as ChartJS, LinearScale, PointElement, LineElement, Legend, Tooltip, Title } from "chart.js";
import { daysData } from "../utils/config"
import debounce from "lodash.debounce"
import { GlobalContext } from "./GlobalContext"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip, Title);
ChartJS.defaults.font.size = 12;
ChartJS.defaults.font.weight = "bold";
ChartJS.defaults.plugins.legend.labels.color = "white"
ChartJS.defaults.scale.ticks.color = "white"
ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;

function CryptoChart({ crypto }) {

    const darkTheme = createTheme({
            palette: {
                mode: 'dark',
            },
        });

    const [historicalData, setHistoricalData] = useState([]);
    const [days, setDays] = useState(1);
    const [loading, setLoading] = useState(false)
    const { currency } = useContext(GlobalContext);

    useEffect(() => {
        fetchHistoricalData();
    }, [currency, days]);

    // fetch historical data
    const fetchHistoricalData = () => {
        setLoading(true);
        getCoinData(`coins/${crypto?.id}/market_chart`, { vs_currency: currency, days: days })
            .then(result => setHistoricalData(result.data.prices));
        setLoading(false);
    };

    // chartjs configuration (options prop)
    const options = {
        elements: {
            point: {
                radius: 1
            }
        },
        plugins: {
            title: {
                display: true,
                text: `${crypto?.name} Historical Price Chart`,
                color: "white"
            },
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
        <div className="flex flex-col md:w-7/10 w-full md:h-150 h-100 items-center justify-center md:gap-10 p-10 gap-5">
            {(loading === true) ? <CircularProgress color="gold" /> :
                <Line
                    data={{
                        labels: historicalData.map((coin) => {
                            let date = new Date(coin[0]);
                            let time = `${date.getHours()}:${date.getMinutes()}`
                            return days === 1 ? time : date.toLocaleDateString();
                        }),
                        datasets: [
                            {
                                data: historicalData.map((coin) => coin[1]),
                                label: `Price ( Past ${days} Day(s) ) in ${currency}`,
                                borderColor: "gold",
                            },
                        ],
                    }}
                    options={options}
                >
                </Line>
            }
            <div className="flex flex-row items-center justify-center w-full gap-2 md:gap-4">
                {daysData.map((day) => (
                    <button key={day.totalDays}
                        className="md:text-lg font-bold text-xs md:border-4 border-2 border-amber-300 p-2 rounded-lg 
                        md:w-90 w-50 hover:bg-gray-600 ease-in-out cursor-pointer"
                        onClick={debounce(() => setDays(day.totalDays), 1000)}>{day.label}</button>
                ))}
            </div>
        </div >
        </ThemeProvider>
    )
}

export default CryptoChart