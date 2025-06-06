import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import { toast } from "react-toastify"
import { auth } from "../../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

function Register({ handleClose }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {

    if (!password || !confirmPassword || !email) 
    {
      toast.error("Fill all the fields!")
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log(result);
      toast(`Registration Successful. Welcome ${result.user.email}`)
      handleClose();
    }
    catch (error) {
      toast.error(error.message);
      return;
    }

  }

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
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        required
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "gold", fontWeight: "bold" }}
        onClick={handleSubmit}
      >
        Register
      </Button>
    </Box>
  )
}

export default Register