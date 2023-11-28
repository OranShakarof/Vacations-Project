import { OkPacket } from "mysql";
import FollowModel from "../3-models/follow-model";
import dal from "../2-utils/dal";

async function getFollowers(): Promise<FollowModel[]> {
    
    // Create SQL: 
    const sql = `SELECT * FROM followers`;

    // Execute SQL: 
    const followers = await dal.execute(sql);

    // Return follow:
    return followers;
  
}


async function addFollow(follow: FollowModel): Promise<FollowModel> {
    
    // Create SQL: 
    const sql = `INSERT INTO followers VALUES(?, ?)`;

    // Execute SQL: 
    await dal.execute(sql, [follow.userId,follow.vacationId]);

    // Return follow:
    return follow;
  
}

async function deleteFollow(userId: number, vacationId: number): Promise<void> {
    
    // Create SQL:
    const sql = `DELETE FROM followers
                    WHERE userId = ? AND 
                    vacationId = ?`;

    // Execute SQL:
    await dal.execute(sql, [userId, vacationId]);
  
}


export default {
    getFollowers,
    addFollow,
    deleteFollow
}