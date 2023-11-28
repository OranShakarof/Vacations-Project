import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import FollowerModel from '../../../Models/FollowerModel';
import UserModel from '../../../Models/UserModel';
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import { vacationsStore } from '../../../Redux/VacationsState';
import followerService from '../../../Services/FollowerService';
import notifyService from '../../../Services/NotifyService';
import "./VacationCard.css";



interface VacationProps {
    vacation: VacationModel;
    deleteMe: (vacationsId: number) => void;
}


function VacationCard(props: VacationProps): JSX.Element {
    
    function deleteMe(){
        props.deleteMe(props.vacation.vacationId);  
    }
    
    const vacations = vacationsStore.getState().vacations;
    const [user, setUser] = useState<UserModel>();
    const [isFollowing, setIsFollowing] = useState<number>(props.vacation.isFollowing);
    const [followersCount, setFollowersCount] = useState<number>(props.vacation.followersCount);
    
    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribeAuth = authStore.subscribe(() => setUser(authStore.getState().user));
        return unsubscribeAuth;

    },[]);

    async function handleReactionClick(vacationId: number){
        try{
            // If no button is active, toggle the clicked button and update counts:
            if(isFollowing === 0) await addFollower(vacationId);
            // If the button is clicked again rest the active state and update the counts:
            else await removeFollower(vacationId);
        }
        catch(err){
            notifyService.error(err);
        }
    }

    async function addFollower(vacationId: number) {
        try{
            const follower = new FollowerModel(user?.userId, vacationId);
            await followerService.addFollower(follower);
            const vacation: VacationModel[] = vacations.filter(v => v.vacationId === vacationId);
            vacation[0].isFollowing = 1;
            vacation[0].followersCount++;
            setFollowersCount(followersCount + 1);
            setIsFollowing(1);
        }
        catch(err){
            notifyService.error(err);
        }
    }

    async function removeFollower(vacationId: number) {
        try{
            const follower = new FollowerModel(user?.userId, vacationId);
            await followerService.deleteFollower(follower);
            const vacation: VacationModel[] = vacations.filter(v => v.vacationId === vacationId);
            vacation[0].isFollowing = 0;
            vacation[0].followersCount--;
            setFollowersCount(followersCount - 1); 
            setIsFollowing(0);
        }
        catch(err: any){
            notifyService.error(err);
        }
    }

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    return (
        <div className="VacationCard">
            <div className="center">
              <div className="article-card">
                    {user?.role === 1 &&
                        <Badge badgeContent={followersCount} color="primary" className='Badge' onClick={() => handleReactionClick(props.vacation.vacationId)} >
                             {isFollowing === 1 ? <FavoriteIcon className='like-active'/> : <FavoriteBorderIcon className='like' />}     
                        </Badge>
                    }
                    {user?.role === 2 &&
                        <Badge className='Badge'>
                            <NavLink to={"/vacations/edit/" + props.vacation.vacationId} className="NavLink">
                                <EditIcon/>
                            </NavLink>
                            <NavLink to="#" className="NavLink" onClick={deleteMe}>
                                <DeleteIcon/>
                            </NavLink>
                        </Badge>
                    }
                <div className="content">
                  <p className="price">{props.vacation.price + "$"} </p>
                  <p className="date">
                    {formatDate(props.vacation.startDate)} - {formatDate(props.vacation.endDate)}
                  </p>
                  <p className="title">{props.vacation.destination}</p>
                  <button className='moreInfo'>
                    <NavLink className={"unStyle"}  to={"/vacations/" + props.vacation.vacationId}>
                        More Info
                    </NavLink>
                  </button>
                </div>
                <img src={props.vacation.imageUrl} alt={props.vacation.destination + " Photo"}/>
              </div>
            </div>
    </div>
    );
}

export default VacationCard;
