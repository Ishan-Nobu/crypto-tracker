import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { Drawer } from "@mui/material";
import { useState, useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
import { formatCurrency } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../../firebase";

function Sidebar() {

    const navigate = useNavigate();
    const [state, setState] = useState({ right: false });

    const { sign, coinsList, user, favouritesList } = useContext(GlobalContext);

    const toggleDrawer = (anchor, open) => (event) => {

        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
        setState({ ...state, [anchor]: open });
    };

    const logOut = () => {
        signOut(auth);
        toast("Logged out successfully!")

        toggleDrawer();
    }

    const removeFromFavourites = async (coin) => {
        const ref = doc(db, "favourites", user.uid);

        try {
            await setDoc(
                ref,
                { coins: favouritesList.filter((c) => c !== coin?.id) },
                { merge: true }
            )
            toast(`${coin?.name} was removed from your favourites!`)
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div>
            {["right"].map((anchor) => (
                <div key={anchor}>
                    <IoMenu onClick={toggleDrawer(anchor, true)} size={40} className="ml-5 rounded-lg cursor-pointer hover:bg-gray-700 ease-in-out" />
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        <div className="flex flex-col md:w-150 md:p-20 p-10 h-full w-full">
                            <div className="flex flex-col items-center gap-20 h-9/10 md:w-full w-full">
                                <div className="w-full h-9/10 flex flex-col items-center bg-gray-700 rounded-md gap-10 overflow-y-scroll p-10">
                                    <h1 className="text-xl font-bold text-center mb-5"> Favourites </h1>
                                    {coinsList.map((coin) => {
                                        if (favouritesList.includes(coin?.id))
                                            return (
                                                <div key={coin?.id} className="md:w-full w-full flex md:flex-row flex-col justify-between items-center
                                                 bg-amber-300 text-black rounded-md mb-3 p-5 border-2 border-black">
                                                    <span className="cursor-pointer hover:text-blue-800 hover:underline" 
                                                    onClick={() => {navigate(`/crypto/${coin?.id}`); window.location.reload()}} >{coin?.name}</span>
                                                    <span className="flex md:flex-row flex-col items-center gap-2">
                                                        {sign} {formatCurrency(coin?.current_price.toFixed(2))}
                                                        <AiFillDelete className="cursor-pointer hover:bg-red-700 rounded-lg"
                                                            size={20} onClick={() => removeFromFavourites(coin)} />
                                                    </span>
                                                </div>
                                            );
                                        else return <div key={coin?.id}></div>;
                                    })}
                                </div>
                            </div>
                            <button onClick={logOut} className="bg-amber-300 border-2 border-black hover:bg-amber-500 cursor-pointer
                             text-black font-bold h-10 text-lg rounded-lg">
                                Log Out
                            </button>               
                        </div>
                    </Drawer>
                </div>
            ))}
        </div>
    )
}

export default Sidebar