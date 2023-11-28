import { Container, Grid, Pagination } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FollowerModel from "../../../Models/FollowerModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import followerService from "../../../Services/FollowerService";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList(): JSX.Element {

    const user = authStore.getState().user;
    const navigate = useNavigate();
    const [followers, setFollowers] = useState<FollowerModel[]>([]);
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [activeFilter, setActiveFilter] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1); 
    
    
    const vacationsPerPage = 9;
    const startIndex = (pageNumber - 1) * vacationsPerPage;
    const endIndex = pageNumber * vacationsPerPage;
    
    
    useEffect(() => {
        if(user){
            vacationsService.getVacationsByUser(user.userId)
            .then(vacations => {
                setVacations(vacations);
            })
            .catch(err =>{
                notifyService.error(err);
            });
            
            followerService.getFollowers()
            .then(f => setFollowers(f))
            .catch(err => notifyService.error(err));
        }
        else{
            notifyService.error("You are not allowed");
            navigate("/login");
        }
    }, [user.userId]);
    
    function handleChangePage (event: ChangeEvent<unknown>, value: number) {
        setPageNumber(value);
    }
    
    async function deleteVacation(vacationId: number) {
        try{
            // Check If the user Sure.
            const sure = window.confirm("Are you sure?"); 
            if(!sure) return; 
            
            // Delete the vacation from DB.
            await vacationsService.deleteVacation(vacationId);
            
            // Alert Success.
            notifyService.success("Vacation has been deleted successfully!");
            
            // Update vacations list.
            setVacations(vacations.filter(v => v.vacationId !== vacationId));
        }
        catch(err: any){
            notifyService.error(err);
        }
    }
    
    const filteredVacations = vacations.filter((v) => {
        return (
            activeFilter === null ||
            (activeFilter === 0 && true) ||
            (activeFilter === 1 && v.isFollowing === 1) ||
            (activeFilter === 2 && new Date(v.startDate) > new Date()) ||
            (activeFilter === 3 &&
                new Date(v.startDate) <= new Date() &&
                new Date(v.endDate) >= new Date())
                );
            });
            
            const pageCount = Math.ceil(filteredVacations.length / vacationsPerPage);
            const currentVacations = filteredVacations.slice(startIndex, endIndex);
            
            function handleVacationsFilters(event: ChangeEvent<HTMLSelectElement>) {
                const value = +event.target.value;
                setActiveFilter(value);
                setPageNumber(1);        
            }

    return (
        <div className="VacationList">

            {user?.role !== 2 && <div className="select">
                <select defaultValue={" "} onChange={handleVacationsFilters}>
                    <option value=" " disabled>Choose filter</option>
                    <option value={0}>None</option>
                    <option value={1}>Following Only</option>
                    <option value={2}>Don't start yet</option>
                    <option value={3}>Active vacations</option>
                </select>
            </div> }

            <Container sx={{ py: 5 }} maxWidth="md">
                {vacations.length === 0 && <Spinner />}
                <Grid container spacing={3}>
                    {currentVacations.map((v) => (
                        <Grid item xs={12} sm={6} md={4} key={v.vacationId}>
                            <VacationCard vacation={v} deleteMe={deleteVacation}  />
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    count={pageCount}
                    page={pageNumber}
                    onChange={handleChangePage}
                    color="primary"
                    sx={{ display: 'table',m: 'auto', backgroundColor: 'whitesmoke', borderRadius: '7px 5px 5px', opacity: '0.9', mt: '5px'}}
                />
            </Container>

        </div>
    );
}

export default VacationList;
