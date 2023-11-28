import { createStore } from "redux";
import FollowerModel from "../Models/FollowerModel";

// 1. Global State: 
export class FollowerState{
    public followers: FollowerModel[] = [];
}

// 2. Action Type: 
export enum FollowerActionType{
    SetFollowers = "SetFollower",
    AddFollower = "AddFollower",
    DeleteFollower = "Delete Follower", 
}

// 3. Action: 
export interface FollowerAction{
    type: FollowerActionType,
    payload?: any;
}

// 4. Reducer: 
export function followerReducer(currentState = new FollowerState(), action: FollowerAction): FollowerState{
    const newState = {...currentState};

    switch(action.type){

        case FollowerActionType.SetFollowers:
            newState.followers = action.payload;
            break;

        case FollowerActionType.AddFollower:
            newState.followers.push(action.payload);
            break;
            
        case FollowerActionType.DeleteFollower:
            const indexToDelete = newState.followers.findIndex(f => f.vacationId === action.payload.vacationId && f.userId === action.payload.userId);
            if(indexToDelete >=0 ) newState.followers.splice(indexToDelete,1);
            break;
    }

    return newState;
}

// 5. Store: 
export const followerStore = createStore(followerReducer);

