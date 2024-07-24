import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import HomeIcon from '@mui/icons-material/Home';
import BorderStyleIcon from '@mui/icons-material/BorderStyle';
import PeopleIcon from '@mui/icons-material/People';
const routes = [
    {
        path: "/",
        content: "Asosiy",
        icon: <HomeIcon/>
    },
    {
        path: "/service",
        content: "Xizmatlar",
        icon: <LocalPostOfficeIcon/>
    },
    {
        path: "/orders",
        content: "Buyurtmalar",
        icon: <BorderStyleIcon/>
    },
    {
        path: "/clients",
        content: "Buyurtmachilar",
        icon: <PeopleIcon/>
    },
]

export default routes