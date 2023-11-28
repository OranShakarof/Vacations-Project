import UserModel from "../Models/UserModel";
import notifyService from "../Services/NotifyService";


export function checkUserRole(user: UserModel): boolean {
    if(!user || user.role !== 2){
        notifyService.error("You are not allowed.");
        return true;
    }
}