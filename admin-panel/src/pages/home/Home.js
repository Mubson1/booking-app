import Chart from '../../components/chart/Chart'
import Featured from '../../components/featured/Featured'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Table_ from '../../components/table/Table'
import Widget from '../../components/widget/Widget'
import wrapper from '../../Wrapper'
import './home.scss'

const Home = () => {
  return (
      <div>
        <div className='widgets'>
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earnings" />
          <Widget type="balance" />
        </div>
        <div className='charts'>
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2/1}/>
        </div>
        <div className='listContainer'>
          <div className='listTitle'>Latest Transactions</div>
          <Table_ />
        </div>
      </div>
  )
}

export default wrapper(Home)
