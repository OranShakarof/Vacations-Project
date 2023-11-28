import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import Spinner from "../../SharedArea/Spinner/Spinner";
import "./VacationDetails.css";

function VacationDetails(): JSX.Element {

    const params = useParams();
    const id = +params.vacationId;
    const user = authStore.getState().user;

    const [vacation, setVacation] = useState<VacationModel>();

    useEffect(() => {
        vacationsService.getOneVacation(id)
        .then(v => setVacation(v))
        .catch(err => notifyService.error(err));
    },[user.userId]);

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    async function deleteMe(): Promise<void> {
        try{
            const ok = window.confirm("Are you sure?");
            if(!ok) return;
            await vacationsService.deleteVacation(id);
            notifyService.success("Vacation has been Deleted Successfully!");
        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }

    if(!vacation) return <Spinner />

    return (
        <div className="VacationDetails">
             <div className="projcard projcard-blue">
              <div className="projcard-innerbox">
                <img className="projcard-img" src={vacation.imageUrl} />
                <div className="projcard-textbox">
                  <div className="projcard-title">{vacation.destination}</div>
                  <div className="projcard-subtitle">Welcome To {vacation.destination}</div>
                  <div className="projcard-bar"></div>
                  <div className="projcard-description">{vacation.description}</div>
                  <div className="projcard-tagbox">
                    <span className="projcard-tag">{formatDate(vacation.startDate)} - {formatDate(vacation.endDate)}</span>
                    <span className="projcard-tag">{vacation.price}$</span>
                    <span className="projcard-tag">
                      <NavLink className={"nav-style"} to={"/vacations"}>
                          Go Back
                      </NavLink>
                    </span>
                    {user?.role === 2 && 
                        <div className="inline-div">
                            <span className="projcard-tag">
                              <NavLink className={"nav-style"} to={"/vacations/edit/" + vacation.vacationId}>
                                ✏️
                              </NavLink>
                            </span>
                            <span className="projcard-tag">
                              <NavLink className={"nav-style"} to={"/vacations"} onClick={deleteMe}>
                                🗑️
                              </NavLink>
                            </span>
                        </div>
                    }
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
}

export default VacationDetails;
