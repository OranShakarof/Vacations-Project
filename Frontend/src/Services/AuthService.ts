import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";

class AuthService {
    // Register new user: 
    public async register(user: UserModel): Promise<void> {
        
        // Send new user to backend:
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Extract the token:
        const token = response.data;

        // Send token to global state:
        const action: AuthAction = { type: AuthActionType.Register, payload: token };
        authStore.dispatch(action);
    }

    // Register new user: 
    public async login(credentials: CredentialsModel): Promise<void> {
        
        // Send credentials to backend:
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Extract the token:
        const token = response.data;

        // Send token to global state:
        const action: AuthAction = { type: AuthActionType.Login, payload: token };
        authStore.dispatch(action);
    }

    // Logout: 
    public logout(): void {
        // Call logout in global state:
        const action: AuthAction = { type: AuthActionType.Logout };
        authStore.dispatch(action);
    }
}

const authService = new AuthService();

export default authService;
