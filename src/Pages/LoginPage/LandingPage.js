import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import "../../App.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { pink } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getUser } from "../../store/UserCall";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { makeStyles, withStyles } from "@mui/styles";
import { IconButton, Tooltip } from "@mui/material";
import LoginHeader from "./LoginHeader";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles({
  icon: {
    //   backgroundColor: "#a4d461",
    // color: "#0000",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#F02794",
    },
  },
  button: {
    color: "#fff",
    // overflowX: "auto",

    "&:hover": {
      backgroundColor: "#F02794",
      color: "#fff",
    },
  },
});
const color = pink[500];

const theme = createTheme();
export default function LandingPage() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Success = useSelector((state) => state.Login.isSuccess);
  const Error = useSelector((state) => state.Login.message);
  Success && navigate("/home", { replace: true });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bodyFormData = new FormData(e.currentTarget);
    dispatch(getUser({ bodyFormData }));
    for (var key of bodyFormData.entries()) {
      console.log("FormData-", key[0] + ", " + key[1]);
    }
  };

  return (
    <LoginHeader>
    <Grid container component="main" sx={{ height: "90vh" , mt:8 }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(http://zong-cap.com.pk/landing/images/background/4.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          // width:'100%',
          height: "548px",
        //   marginTop: 6,
          textAlign:'center',
          backgroundPosition: "center",
        }}
      >
        <h2 className={"roundCircle"}>
          Delivering Value That’s <br />
          Personalized and Relevant!
        </h2>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        sx={{ height: "100%" }}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "error.light" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="user_name"
              label="Email Address"
              name="user_name"
              autoComplete="email"
              autoFocus
              error={Error ? true : false}
              helperText={Error}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Error ? true : false}
              helperText={Error}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.button}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
            </Grid>
            <Grid
              container
              sx={{ mt: 2 }}
              rowspacing={1}
              // columnSpacing={{ xs: 0, sm: 0, md: 0 }}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={2}>
                <Tooltip title=" 03 111 999 311">
                  <IconButton className={classes.icon} sx={{ color: "black" }}>
                    <LocalPhoneIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="capcare@zong.com.pk">
                  <IconButton className={classes.icon} sx={{ color: "black" }}>
                    {/* <Tooltip> */}
                    <EmailIcon fontSize="small" /> {/* </Tooltip> */}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Facebook">
                  <IconButton className={classes.icon} sx={{ color: "black" }}>
                    {/* <Tooltip> */}
                    <FacebookIcon fontSize="small" /> {/* </Tooltip> */}
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Twitter">
                  <IconButton className={classes.icon} sx={{ color: "black" }}>
                    {/* <Tooltip> */}
                    <TwitterIcon fontSize="small" /> {/* </Tooltip> */}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Copyright sx={{ pt:5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
    </LoginHeader>
  );
}
