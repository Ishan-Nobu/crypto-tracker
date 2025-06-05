export const formatCurrency = (num) =>
{
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const percentageChange = (priceChange) =>
{ 
    if(priceChange > 0) return <span className="text-green-500">+{priceChange}%</span>
    else if (priceChange == 0) return <span className="text-white" >{priceChange}%</span>
    else return <span className="text-red-500">{priceChange}%</span> 
}

export const daysData = [
  {
    label: "24 Hours",
    totalDays: 1,
  },
  {
    label: "30 Days",
    totalDays: 30,
  },
  {
    label: "3 Months",
    totalDays: 90,
  },
  {
    label: "1 Year",
    totalDays: 365,
  },
];