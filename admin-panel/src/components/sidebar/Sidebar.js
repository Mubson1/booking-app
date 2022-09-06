import './Sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import BarChartTwoToneIcon from '@mui/icons-material/BarChartTwoTone';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';

const Sidebar = () => {
    const {dispatch} = useContext(DarkModeContext);

    return (
        <div className='sidebar'>
        <div className='top'>
            <Link to='/' style={{textDecoration:"none"}}>
                <span className='logo'>HYP</span>
            </Link>
        </div>
        <hr />
        <div className='center'>
            <ul>
                <p className='title'>MAIN</p>
                <Link to='/' style={{textDecoration:"none"}}>
                    <li>
                        <DashboardIcon className='icon'/>
                        <span>Dashboard</span>
                    </li>
                </Link>
                <p className='title'>LIST</p>
                <Link to='/users' style={{textDecoration:"none"}}>
                    <li>
                            <PersonOutlineOutlinedIcon className='icon' />
                            <span>Users</span>
                    </li>
                </Link>
                <Link to='/hotel' style={{textDecoration:"none"}}>
                    <li>
                            <Inventory2OutlinedIcon className='icon' />
                            <span>Hotels</span>
                    </li>
                </Link>
                <Link to='/room' style={{textDecoration: "none"}}>
                    <li>
                        <BorderColorTwoToneIcon className='icon' />
                        <span>Rooms</span>
                    </li>
                </Link>
                <li>
                    <LocalShippingTwoToneIcon className='icon'  />
                    <span>Delivery</span>
                </li>
                <p className='title'>USEFUL</p>
                <li>
                    <BarChartTwoToneIcon className='icon' />
                    <span>Stats</span>
                </li>
                <li>
                    <NotificationsNoneOutlinedIcon className='icon' />
                    <span>Notifications</span>
                </li>
                <p className='title'>SERVICE</p>
                <li>
                    <MonitorHeartOutlinedIcon className='icon' />
                    <span>System Health</span>
                </li>
                <li>
                    <PsychologyOutlinedIcon className='icon' />
                    <span>Logs</span>
                </li>
                <li>
                    <SettingsOutlinedIcon className='icon' />
                    <span>Settings</span>
                </li>
                <p className='title'>USER</p>
                <li>
                    <AccountCircleOutlinedIcon className='icon' />
                    <span>Profile</span>
                </li>
                <li>
                    <LogoutOutlinedIcon className='icon' />
                    <span>Logout</span>
                </li>
            </ul>
        </div>

        <div className='bottom'>
            <div className='colorOption' onClick={() => dispatch({type:"LIGHT"})}></div>
            <div className='colorOption' onClick={() => dispatch({type:"DARK"})}></div>
        </div>
        </div>
    )
}

export default Sidebar
