import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. Global State: 
export default class VacationsState {
    public vacations: VacationModel[] = [];
}

// 2. Action Type: 
export enum VacationsActionType{
    SetVacations = "SetVacations",
    AddVacation = "AddVacation",
    EditVacation = "EditVacation",
    DeleteVacation = "DeleteVacation"
}

// 3. Action: 
export interface VacationAction{
    type: VacationsActionType;
    payload?: any; // The data related to that action.
}

// 4. Reducer: (invoked by redux library): 
export function vacationsReducer(currentState = new VacationsState(), action: VacationAction): VacationsState{
    const newState = {...currentState}; // Duplicate the global state.

    // Changed the duplicated global state according the action:  
    switch(action.type){
        
        case VacationsActionType.SetVacations: 
            newState.vacations = action.payload; // Save all vacations into global state.
            break;

        case VacationsActionType.AddVacation: 
            newState.vacations.push(action.payload) // Add the vacation into global state.
            break;

        case VacationsActionType.EditVacation: 
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId); // Find the index of the vacation to update
            if(indexToUpdate >= 0) newState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if(indexToDelete >=0 ) newState.vacations.splice(indexToDelete,1); 
            break;
    }

    return newState; // Return the changed duplicated global state.
}

// 5. Store: 
export const vacationsStore = createStore(vacationsReducer);