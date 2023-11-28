import { Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import { checkUserRole } from "../../../Utils/UserCheck";
import "./AddVacation.css";


function AddVacation(): JSX.Element {

    const { register,handleSubmit, formState: {errors} ,trigger } = useForm<VacationModel>();
    const [image, setImage] = useState("");
    const [startDate, setStartDate] = useState("");
    const navigate = useNavigate();
    const user = authStore.getState().user;

    const today = new Date().toISOString().split('T')[0];
    
    useEffect(() => {
        if(checkUserRole(user)) navigate("/home");
    },[])
    
    function handleStartDateChange(event : ChangeEvent<HTMLInputElement>) {
        setStartDate(event.target.value);
    }

    function handleImageChange(event : ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            const ImageUrl = URL.createObjectURL(event.target.files[0]);
            setImage(ImageUrl);
        }
    }

    
    async function send(vacation: VacationModel) {
        try{
            // Convert FileList (containing single file) into File type:   
            vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationsService.addVacation(vacation);
            notifyService.success("Vacation has been added successfully!");
            navigate("/vacations");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }
    
    return (
        <div className="AddVacation">
          <form onSubmit={handleSubmit(send)}>
            <Grid container spacing={2} className="Box">
            <Typography component="h1" variant="h5" sx={{mt: 3}} textAlign={"center"}>
                    Add new vacation
            </Typography>
                <Grid item xs={12} sm={12}>
                    <TextField        
                        fullWidth
                        label="Enter a destination"
                        autoFocus
                        inputProps={{ maxLength: 25, minLength: 2 }}
                        {...register("destination",{
                            required: "* Destination is required!",
                            minLength: {
                                value: 2,
                                message: "* Destination need to be at leasts 2 chars!"
                            },
                            maxLength: {
                                value: 25,
                                message: "* Destination need to be less than 25 chars!"
                            }
                        })}
                        onBlur={() => trigger("destination")}
                        error={!!errors.destination}
                        helperText={errors.destination?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField 
                        fullWidth
                        label="Enter a description"
                        type="textarea"
                        rows={3}
                        multiline
                        inputProps={{ maxLength: 1000, minLength: 10 }}
                        {...register("description",{
                            required: "* Description is required!",
                            minLength: {
                                value: 10,
                                message: "* Description need to be at leasts 10 chars!"
                            },
                            maxLength: {
                                value: 1000,
                                message: "* Description need to be less than 1000 chars!"
                            }
                        })}
                        onBlur={() => trigger("description")}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth
                        label="Start Date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{       
                            min: today,
                            onChange: handleStartDateChange
                        }}
                        {...register("startDate",{
                            required: "* Start date is required!"
                        })}      
                        onBlur={() => trigger("startDate")}
                        error={!!errors.startDate}
                        helperText={errors.startDate?.message}
                    />    
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField   
                        fullWidth
                        label="End Date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{       
                            min: startDate
                        }}
                        {...register("endDate",{
                            required: "* End date is required!",
                        })}
                        onBlur={() => trigger("endDate")}
                        error={!!errors.endDate}
                        helperText={errors.endDate?.message}
                    />    
                </Grid>
                <Grid item xs={12}>
                        <div className="image-input-container">
                            {image && <img src={image} alt="Selected image"/>}
                            <label>Select Image</label>
                            <input
                                type="file"
                                {...register("image")}
                                onChange={handleImageChange}
                                accept="image/*"
                                required
                            />
                        </div>
                </Grid>
                <Grid item xs={12} sx={{alignItems: 'center'}}>
                    <TextField  
                        fullWidth
                        type="number"
                        label="Enter a Price"
                        {...register("price",{
                            required: "* Price is required!",
                            min:{
                                value: 1,
                                message: "* Price can't be Lower than 1!"
                            },
                            max:{
                                value: 9999,
                                message: "* Price can't be over 9999!"
                            },
                        })}
                        onBlur={() => trigger("price")}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{textTransform: 'none' }}
                    >
                        Add
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{  mb: 2, textTransform: 'none', backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: 'grey' } }}
                    >
                        <NavLink className="cancelStyle" to="/vacations">Cancel</NavLink>
                    </Button>
                </Grid>
            </Grid>
          </form>
        </div>
    );
}

export default AddVacation;
