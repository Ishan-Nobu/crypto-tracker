import { AppBar, Toolbar, Typography, Select, Container, MenuItem, ThemeProvider, createTheme } from "@mui/material"
import { Outlet, useNavigate } from "react-router-dom"
import { CurrencyContext } from "./CurrencyContext"
import { useContext } from "react";

function Header() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const navigate = useNavigate();
  const { currency, setCurrency } = useContext(CurrencyContext);
  
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography onClick={() => navigate("/")} component="div" variant="h5"
                sx={{ flexGrow: 1, color: "white", cursor: "pointer" }}>Crypto Tracker</Typography>
              <Select variant="outlined" sx={{ width: 100, height: 40 }} 
                value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <MenuItem value={"INR"}>INR</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"JPY"}>JPY</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
      <Outlet />
    </>
  )
}

export default Header


