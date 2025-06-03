import axios from "axios"

const apiKey = `${import.meta.env.VITE_GECKO_API_KEY}`
const baseURL = "https://api.coingecko.com/api/v3/"

export const getCoinData = async(endpoint, searchParams) =>
{
    const url = new URL(baseURL + endpoint);
    url.search = new URLSearchParams({ ...searchParams });

    return await axios.get(url, {
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': apiKey,
        }
    })
}



// export const SingleCoin = (id) =>
//   `https://api.coingecko.com/api/v3/coins/${id}`;

// export const HistoricalChart = (id, days = 365, currency) =>
//   `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;