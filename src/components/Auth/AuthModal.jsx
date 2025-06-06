import { Modal, Fade, Button, Tab, Tabs, AppBar, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function AuthModal() {

    const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    });

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={darkTheme}>
        <div>
            <Button
                variant="contained"
                sx={{
                    width: 85,
                    height: 40,
                    marginLeft: 5,
                    backgroundColor: "gold",
                    fontWeight: "bold"
                }}
                onClick={handleOpen}
            >
                Login
            </Button>
            <Modal
                className="flex justify-center items-center"
                sx={{borderRadius: 5}}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <div className="rounded-sm text-white w-100">
                        <AppBar
                            position="static"
                            sx={{
                                bgcolor: "black",
                                color: "white",
                            }}
                        >
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                sx={{ borderRadius: 10 }}
                            >
                                <Tab label="Login" sx={{fontWeight: "bold"}}/>
                                <Tab label="Register" sx={{fontWeight: "bold"}}/>
                            </Tabs>
                        </AppBar>
                        {value === 0 && <Login handleClose={handleClose}/>}
                        {value === 1 && <Register handleClose={handleClose}/>}
                    </div>
                </Fade>
            </Modal>
        </div>
        </ThemeProvider>
    );
}

export default AuthModal