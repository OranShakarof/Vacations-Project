import { OkPacket } from "mysql";
import appConfig from "../2-utils/app-config";
import dal from "../2-utils/dal";
import imageHelper from "../2-utils/image-helper";
import { ResourceNotFoundError } from "../3-models/client-errors";
import VacationModel from "../3-models/vacation-model";

async function getVacationsByUser(userId: number): Promise<VacationModel[]> {

    // Create SQL:
    const sql = `
        SELECT DISTINCT
            V.*,
            CONCAT('${appConfig.domainName}/api/vacations/', V.image) AS imageUrl,
            EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followersCount
        FROM vacations as V LEFT JOIN followers as F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ORDER BY startDate
        `;

  // Get The Vacation from the database: 
  const vacations = await dal.execute(sql, [userId]);
  // return vacations:
  return vacations;
}

async function getOneVacation(vacationId: number): Promise<VacationModel> {

    // Create SQL:
    const sql = `
                SELECT *, CONCAT('${appConfig.domainName}/api/vacations/', vacations.image) AS imageUrl
                FROM vacations
                WHERE vacationId = ?
  `;

    // Get The Vacation from the database: 
    const vacations = await dal.execute(sql, [vacationId]);
    
    // Extract the single vacation:
    const vacation = vacations[0];
    
    // return vacation:
    return vacation;

}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    
    // Validate:
    vacation.validate();

    // Save image:
    const imageName = await imageHelper.saveImage(vacation.image);

    // Create SQL:
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;

  // Execute sql, get back info object:
  const info: OkPacket = await dal.execute(sql, [
    vacation.destination,
    vacation.description,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    imageName,
  ]);

  // Extract new id, set it back in the given vacation:
  vacation.vacationId = info.insertId;

  // Get image url: 
  vacation.imageUrl = `${appConfig.domainName}/api/vacations/${imageName}`; 

  // Remove given image from vacation object: 
  delete vacation.image;
    
  // return added vacation
  return vacation;
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    
    // Validate: 
    vacation.validate();

    const startDate = formatDate(vacation.startDate);
    const endDate = formatDate(vacation.endDate);


    // Get Old image:
    const oldImage = await getOldImage(vacation.vacationId);
    let imageName = oldImage;

    // If client sent image to update:
    if(vacation.image){
        // Update image: 
        imageName = await imageHelper.updateImage(vacation.image, oldImage)
    }

    
    // Create SQL: 
    const sql = `UPDATE vacations SET
                    destination = ?,
                    description = ?,
                    startDate = ?, 
                    endDate = ?, 
                    price = ?, 
                    image = ?
                WHERE vacationId = ?`;
    
    // Execute SQL, get back info object:
    const info: OkPacket = await dal.execute(sql, [
      vacation.destination,
      vacation.description,
      startDate,
      endDate,
      vacation.price,
      imageName,
      vacation.vacationId
    ]);

    // If vacationId doesn't exist:
    if(info.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Get image url: 
    vacation.imageUrl = `${appConfig.domainName}/api/vacations/${imageName}`;

    // Remove image from vacation object:
    delete vacation.image;
    
    // Return the updated vacation:
    return vacation;
}

async function deleteVacation(vacationId: number): Promise<void> {
    
    // Take old image:
    const oldImage = await getOldImage(vacationId);
    
    // Delete that image: 
    await imageHelper.deleteImage(oldImage);

    //Create SQL: 
    const sql1 = `DELETE FROM followers
                    WHERE vacationId = ?`;
 
    const sql2 = `DELETE FROM vacations
                    WHERE vacationId = ?`;

    // Execute sql, get back info object:
    await dal.execute(sql1,[vacationId]);
    await dal.execute(sql2,[vacationId]);
    
    
}

// Get image name: 
async function getOldImage(id: number): Promise<string> {
    const sql = `SELECT image FROM vacations WHERE vacationId = ?`;
    const vacations = await dal.execute(sql, [id]);
    const vacation = vacations[0];
    if(!vacation) return null;
    const imageName = vacation.image;
    return imageName;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


export default {
  getVacationsByUser,
  getOneVacation,
  addVacation,
  updateVacation,
  deleteVacation,
};
