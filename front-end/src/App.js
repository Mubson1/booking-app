import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmailVerificationLandingPage from "./pages/EmailVerification/EmailVerificationLandingPage";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import HotelList from "./pages/HotelLists";
import HotelRoom from "./pages/HotelRoom";
import ListAllProperty from "./pages/ListAllProperty";
import Login from "./pages/Login";
import PasswordResetLanding from "./pages/PasswordReset/PasswordResetLanding";
import PleaseVerify from "./pages/PleaseVerify";
import Signup from "./pages/Signup";


function App() {
  return (
    <div className="-m-2 font-sans min-w-fit">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/please-verify" element={<PleaseVerify />} />
          <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:passwordResetCode" element={<PasswordResetLanding />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/hotels/:id" element={<HotelRoom />} />
          <Route path='/allProperties' element={<ListAllProperty />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
