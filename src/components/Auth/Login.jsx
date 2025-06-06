import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import { toast } from "react-toastify"
import { auth } from "../../../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"


function Login({ handleClose }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {

    if (!password || !email) 
    {
      toast.error("Fill all the fields!")
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast(`Log in Successful. Welcome ${result.user.email}`)
      handleClose();
    }

    catch (error) {
      toast.error(error.message)
      return;
    }
  };

  return (
    <Box
      p={3}
      sx={{
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ backgroundColor: "gold", fontWeight: "bold" }}
      >
        Login
      </Button>
    </Box>
  )
}

export default Login