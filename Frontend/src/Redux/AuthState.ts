import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";

// 1. Global State: 
export class AuthState {

    public token: string = null; // JWT
    public user: UserModel = null; // User

    public constructor() {
        this.token = sessionStorage.getItem("token");
        if(this.token){
            this.user = jwtDecode<{ user: UserModel }>(this.token).user;
        }
    }
}

// 2. Action Type:
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// 3. Action:
export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

// 4. Reducer: (invoked by redux library):
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    const newState = {...currentState};

    switch(action.type) {

        case AuthActionType.Register: // Here the payload is JWT containing the user.
        case AuthActionType.Login: // Here the payload is JWT containing the user.
            newState.token = action.payload;
            newState.user = jwtDecode<{ user: UserModel }>(newState.token).user;
            sessionStorage.setItem("token", newState.token);
            break;
            
        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            sessionStorage.removeItem("token");
            break;
    }

    return newState;

}

// 5. Store:
export const authStore = createStore(authReducer);