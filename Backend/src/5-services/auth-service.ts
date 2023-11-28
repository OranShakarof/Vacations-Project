import { OkPacket } from "mysql";
import UserModel from "../3-models/user-model";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";
import CredentialsModel from "../3-models/credentials-model";
import RoleModel from "../3-models/role-model";

async function register(user: UserModel): Promise<string> {
    
    // Validation: 
    user.validate();

    // Set "User" as role:
    user.role = RoleModel.User;

    // Is Email taken: 
    if(await isEmailTaken(user.email)) throw new ValidationError(`Email ${user.email} is already used.`);

    user.password = cyber.hashPassword(user.password);

    // Create SQL: 
    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;

    // Execute:
    const info: OkPacket = await dal.execute(sql,[user.firstName,user.lastName,user.email,user.password,user.role]);

    // Set back new id:
    user.userId = info.insertId;

    // Get new token: 
    const token = cyber.getNewToken(user);

    // Return token:
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
    
    // Validation: 
    credentials.validate();

    credentials.password = cyber.hashPassword(credentials.password);

    // Create SQL: 
    const sql = `SELECT * FROM users WHERE
                  email = ? AND
                  password = ?`;
    
    // Execute:
    const users = await dal.execute(sql, [credentials.email, credentials.password]);

    // Extract user: 
    const user = users[0];

    // If no such user:
    if(!user) throw new UnauthorizedError("Incorrect username or password.");

    // Generate new token: 
    const token = cyber.getNewToken(user);

    // Return token:
    return token;

}


async function isEmailTaken(email: string): Promise<boolean> {
    // Create Sql: 
    const sql = `SELECT COUNT(*) AS count FROM users WHERE email = ?`;
    
    // Execute:
    const result = await dal.execute(sql, [email]);
    
    // Extract count:
    const count = result[0].count;
    
    // Return count
    return count > 0;

}

export default {
    register,
    login
};