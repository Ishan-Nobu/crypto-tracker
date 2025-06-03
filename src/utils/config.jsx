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