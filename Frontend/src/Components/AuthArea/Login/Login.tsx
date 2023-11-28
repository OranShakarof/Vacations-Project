import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, Button, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from '../../../Models/CredentialsModel';
import authService from '../../../Services/AuthService';
import notifyService from '../../../Services/NotifyService';
import "./Login.css";

function Login(): JSX.Element {

  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const {register, handleSubmit, formState: {errors}, trigger} = useForm<CredentialsModel>();
  const navigate = useNavigate();

  async function send(credentials: CredentialsModel) {
        try{
            await authService.login(credentials);
            notifyService.success("You have been successfully logged-in!")
            navigate("/vacations");
        }
        catch(err) {
            notifyService.error(err);
        }
  }

    return (
        <div className="Login">
          <form onSubmit={handleSubmit(send)}>
              <div className="HeaderBox">
                <Avatar sx={{ m: 2, bgcolor: "secondary.main"} }>
                  <LockOutlinedIcon />
                </Avatar>
              </div>

              <Typography component="h1" variant="h5" textAlign={"center"}>
                Sign in
              </Typography>

              <TextField
                  margin="normal"
                  fullWidth
                  label="Email Address"

                  {... register("email",{
                    required: "* Email is required!",
                    pattern:{
                            value : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i ,
                            message: "* Invalid Email Format"
                    }
                  })}
                  onBlur={() => trigger("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

              <TextField
                  margin="normal"
                  fullWidth
                  label="Password"
                  type={!showPassword ? "password" : "text"}

                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}

                  {... register("password",{
                    required: "* Password is required!",
                    minLength:{
                        value: 4,
                        message: "* At least 4 chars!"
                    }
                  })}
                  onBlur={() => trigger("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, textTransform: 'none' }}>
                Sign In
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item >
                  <NavLink to="/Register" >
                     <Button className={"BtnHover"} sx={{textTransform: 'none'}}>Don't have an account? Sign Up</Button>
                  </NavLink>
                </Grid>
              </Grid>
          </form>
        
      </div>
    );
}

export default Login;
