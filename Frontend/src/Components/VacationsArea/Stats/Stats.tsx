import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";
import VacationModel from '../../../Models/VacationModel';
import { authStore } from "../../../Redux/AuthState";
import notifyService from '../../../Services/NotifyService';
import vacationsService from '../../../Services/VacationsService';
import { checkUserRole } from "../../../Utils/UserCheck";
import "./Stats.css";

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

function Stats(): JSX.Element {

    const [vacations,setVacations] = useState<VacationModel[]>([]);
    const [csvData, setCsvData] = useState<string | null>(null);

    const user = authStore.getState().user;
    const navigate = useNavigate();

    useEffect(() => {
        if(checkUserRole(user)) navigate("/home");
        else{
            vacationsService.getVacationsByUser(user?.userId)
            .then(v => setVacations(v))
            .catch(err => notifyService.error(err))
        }
    },[])

    const data = {
        labels: vacations.map(vacation => vacation.destination),
        datasets: [{
          label: 'Vacations Followers',
          data: vacations.map(vacation => vacation.followersCount),
          backgroundColor: [
            'rgb(153, 102, 255)'
          ],
          borderColor: [
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }],
        options: {  
          responsive: true,
          maintainAspectRatio: false
        }
      };

    function convertToCSV(data: { destination: string; followersCount: number }[]): string {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Destination,FollowersCount\n"
            + data.map(vacation => `${vacation.destination},${vacation.followersCount}`).join("\n");
    
        return encodeURI(csvContent);
    }

    function handleExportCSV () {
        const csvContent = convertToCSV(vacations);
        setCsvData(csvContent);
    };
    

    return (
        <div className="Stats">
          <div className="statsResolution">
            <Box sx={{py:5}}>
                <Button onClick={handleExportCSV} sx={{textTransform: 'none', backgroundColor: 'whitesmoke'}}>Export to CSV</Button>
                {csvData && (
                    <a
                        href={csvData}
                        download="vacations_data.csv"
                        style={{ display: "none" }}
                        ref={(ref) => ref?.click()}
                    >
                        Download CSV
                    </a>
                )}
                <Bar data={data}/>
            </Box>
          </div>
        </div>
    );
}

export default Stats;
