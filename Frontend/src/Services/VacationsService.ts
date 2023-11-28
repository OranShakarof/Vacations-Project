import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationAction, VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/AppConfig";

class VacationsService{

    public async getVacationsByUser(userId: number): Promise<VacationModel[]> {
        
        // Get vacations from global state
        let vacations = vacationsStore.getState().vacations;

        // If there are no vacations in global state
        if(vacations.length === 0){
            
            // Get response from backend:
            const response = await axios.get<VacationModel[]>(appConfig.vacationByUserUrl + userId);
            
            // Extract all Vacations:
            vacations = response.data;

            // Save vacations in global state:
            const action: VacationAction = { type: VacationsActionType.SetVacations, payload: vacations};
            vacationsStore.dispatch(action);
        }

        // Return vacations: 
        return vacations;
    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {

        // Get vacations from global state
        let vacations = vacationsStore.getState().vacations;

        // Find desired vacation:
        let vacation = vacations.find(v => v.vacationId === vacationId);

        if(!vacation){
            
            // Get vacation from backend: 
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationId);
            
            // Extract the vacations: 
            vacation = response.data; 
        }
        
        // Return vacation:
        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<void> {

        // The additional image that sent with the data.
        const options = {
            headers: { "Content-Type": "multipart/form-data"} // Include files in the request.
        } 

        // Send Vacation to backend:
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, options);

        // Extract the added vacation sent back from backend: 
        const addedVacation = response.data;

        // Add added vacation to global state: 
        const action: VacationAction = { type: VacationsActionType.AddVacation, payload: addedVacation };
        vacationsStore.dispatch(action);
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {

        // The additional image that sent with the data.
        const options = {
            headers: { "Content-Type": "multipart/form-data"} // Include files in the request.
        } 

        // Send Vacation to backend:
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, vacation, options);

        // Extract the updated vacation sent back from backend: 
        const updatedVacation = response.data;

        // Update vacation in global state: 
        const action: VacationAction = { type: VacationsActionType.EditVacation, payload: updatedVacation };
        vacationsStore.dispatch(action);
    }


    public async deleteVacation(id: number) {
        
        // Delete vacation from global state: 
        const action: VacationAction = { type: VacationsActionType.DeleteVacation, payload: id};
        vacationsStore.dispatch(action);
        
        // Delete Vacation in backend: 
        await axios.delete(appConfig.vacationsUrl + id);

    }

}

const vacationsService = new VacationsService();

export default vacationsService