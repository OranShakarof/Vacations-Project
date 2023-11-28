import axios from "axios";
import FollowerModel from "../Models/FollowerModel";
import { FollowerAction, FollowerActionType, followerStore } from "../Redux/FollowersState";
import appConfig from "../Utils/AppConfig";

class FollowerService {
    
    public async getFollowers(): Promise<FollowerModel[]> {

        let followers = followerStore.getState().followers;
        
        if(followers.length === 0 ){
            
            // Send the follower to the backend: 
            const response = await axios.get<FollowerModel[]>(appConfig.FollowerUrl);
    
            // Extract the follower sent back from the backend: 
            followers = response.data;

            // Save followers in global state: 
            const action: FollowerAction = { type: FollowerActionType.SetFollowers, payload: followers };
            followerStore.dispatch(action);
        }

        return followers;

    }
    
    public async addFollower(follower: FollowerModel): Promise<void> {
        
        // Send the follower to the backend: 
        const response = await axios.post<FollowerModel>(appConfig.FollowerUrl, follower);

        // Extract the follower sent back from the backend: 
        const addedFollower = response.data;

        // Save followers in global state: 
        const action: FollowerAction = { type: FollowerActionType.AddFollower, payload: addedFollower };
        followerStore.dispatch(action);

    }

    public async deleteFollower(follower: FollowerModel): Promise<void> {
        
        // Delete vacation from global state: 
        const action: FollowerAction = { type: FollowerActionType.DeleteFollower, payload: follower};
        followerStore.dispatch(action);
        
        // Send the follower to the backend: 
        await axios.delete<FollowerModel>(appConfig.FollowerUrl + follower.userId +`&${follower.vacationId}`);
    }
}

const followerService = new FollowerService();

export default followerService;