import './Navbar.scss'
import { SearchOutlined, LanguageOutlined, DarkModeOutlined, FullscreenExitOutlined, NotificationsNoneOutlined, ChatBubbleOutlineOutlined, ListOutlined} from '@mui/icons-material'
import { useContext } from 'react'
import { DarkModeContext } from '../../context/darkModeContext'


const Navbar = () => {
  const {dispatch} = useContext(DarkModeContext)

  return (
    <div className='navbar'>
      <div className='wrapper'>
        <div className='search'>
          <input 
            type='text'
            placeholder='Search...'
          />
          <SearchOutlined />
        </div>

        <div className='items'>
          <div className='item'>
            <LanguageOutlined className='icon'/>
            English
          </div>
          <div className='item' onClick={() => dispatch({type:"TOGGLE"})}>
            <DarkModeOutlined className='icon' />
          </div>
          <div className='item'>
            <FullscreenExitOutlined className='icon' />
          </div>
          <div className='item'>
            <NotificationsNoneOutlined className='icon' />
            <div className='counter'>
              1
            </div>
          </div>
          <div className='item'>
            <ChatBubbleOutlineOutlined className='icon' />
            <div className='counter'>
              2
            </div>
          </div>
          <div className='item'>
            <ListOutlined className='icon' />
          </div>
          <div className='item'>
            <img 
              src='data:image/png;base64,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'
              alt='user-avatar'
              className='avatar'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
