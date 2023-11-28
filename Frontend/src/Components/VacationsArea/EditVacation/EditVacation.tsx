import { Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import { checkUserRole } from "../../../Utils/UserCheck";
import "./EditVacation.css";

function EditVacation(): JSX.Element {
    const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm<VacationModel>();
    const [startDate, setStartDate] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const navigate = useNavigate();
    const params = useParams();
    const vacationId = +params.vacationId;
    const user = authStore.getState().user;

    
    function handleStartDateChange(event: ChangeEvent<HTMLInputElement>) {
        setStartDate(event.target.value); 
    }

    function handleImageChange(event : ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            const newImageUrl = URL.createObjectURL(event.target.files[0]);
            setSelectedImage(newImageUrl);
        }
    }
    
    function stringDateFormatter(vacationDate: Date) {
        let date = new Date(vacationDate);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        return `${date.getFullYear()}-${month}-${day}`;
      }

    useEffect(() =>{
        if(checkUserRole(user)) navigate("/home");
        else{
            vacationsService.getOneVacation(vacationId)
            .then(vacation => {            
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
    
                // Convert and set the start date as a Date object.
                const startDate = stringDateFormatter(new Date(vacation.startDate));
                setStartDate(startDate);
                setValue("startDate", startDate);
    
                // Convert and set the end date as a Date object. 
                const endDate = stringDateFormatter(new Date(vacation.endDate));
                setValue("endDate", endDate);
                setValue("price", vacation.price);
                
                // Set the existing image URL
                setSelectedImage(vacation.imageUrl); 
            })
            .catch(err => notifyService.error(err));
        }
    },[]);
    
    async function send(vacation: VacationModel) {
        try{
            vacation.vacationId = vacationId;
            vacation.image =(vacation.image as unknown as FileList)[0];
            await vacationsService.updateVacation(vacation);
            notifyService.success("Vacation has been updated successfully!");
            navigate("/vacations");
        }
        catch(err: any){
            notifyService.error(err)
        }
    }
    
    return (
        <div className="EditVacation">


			<form onSubmit={handleSubmit(send)}>
            <Grid container spacing={2} className="Box">
            <Typography component="h1" variant="h5" sx={{mt: 2}} textAlign={"center"}>
                    Edit vacation
            </Typography>
                <Grid item xs={12} sm={12}>
                    <TextField        
                        fullWidth
                        label="Enter a destination"
                        defaultValue={" "}
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
                        defaultValue={" "}
                        rows={3}
                        multiline
                        inputProps={{ maxLength: 1000, minLength: 10}}
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
                        defaultValue={startDate} 
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{       
                            onChange: handleStartDateChange
                        }}
                        {...register("startDate",{ valueAsDate: true})}      
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
                        {...register("endDate",{ valueAsDate: true})}
                        onBlur={() => trigger("endDate")}
                        error={!!errors.endDate}
                        helperText={errors.endDate?.message}
                    />    
                </Grid>
                <Grid item xs={12}>
                    <div className="image-input-container">
                      <img src={selectedImage} alt="Selected Vacation Pic" />
                      <label>Change Image</label>
                      <input
                        type="file"
                        {...register("image")}
                        onChange={handleImageChange}
                        accept="image/*"
                        />
                    </div>
                </Grid>
                <Grid item xs={12} sx={{alignItems: 'center'}}>
                    <TextField  
                        fullWidth
                        type="number"
                        label="Enter a Price"
                        defaultValue={0}
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
                        Update
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

export default EditVacation;

