import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import Stats from "../../VacationsArea/Stats/Stats";
import VacationDetails from "../../VacationsArea/VacationDetails/VacationDetails";
import VacationList from "../../VacationsArea/VacationsList/VacationList";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/vacations" element={<VacationList />} />
            <Route path="/vacations/:vacationId" element={<VacationDetails />} />
            <Route path="/vacations/new" element={<AddVacation />} />
            <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />
            <Route path="/vacations/graphs" element={<Stats/> } />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
