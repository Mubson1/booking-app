import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import './pages/home/home.scss'

const wrapper = (Component) => ({...props}) => (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <Component {...props}/>
    </div>
    </div>
)

export default wrapper