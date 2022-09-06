import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import './style/dark.scss'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { userInputs } from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import useUser from "./auth/useUser";
import { hotelColumns, roomColumns, userColumns } from "./datatableSource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom"

function App() {
  const {darkMode} = useContext(DarkModeContext)

  const ProtectedRoute = ({children}) => {
    const user = useUser();

    let admin = false
    if(user) {admin = user.isAdmin}

    if(!admin) return <Navigate to='/login' />
    
    return children
  }

  return (
    <div className={darkMode ? "app dark font-sans -m-2" : "app font-sans -m-2"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />

            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>}
            />

            <Route path="users">
              <Route index element={
              <ProtectedRoute>
                <List columns={userColumns}/> 
              </ProtectedRoute>}
              />
              <Route path=":userId" element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>} 
              />
              <Route path="new" element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add New User"/>
                </ProtectedRoute>} 
              />
            </Route>

            <Route path="hotel">
              <Route index element={
                <ProtectedRoute>
                  <List columns={hotelColumns}/>
                </ProtectedRoute>} 
              />
              <Route path=":hotelId" element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>} 
              />
              <Route path="new" element={
                <ProtectedRoute>
                  <NewHotel />
                </ProtectedRoute>} 
              />
            </Route>
            
            <Route path="room">
              <Route index element={
                <ProtectedRoute>
                  <List columns={roomColumns}/>
                </ProtectedRoute>
              }
              />
              <Route path=":roomId" element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              }
              />
              <Route path="new" element={
                <ProtectedRoute>
                  <NewRoom />
                </ProtectedRoute>
              }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
