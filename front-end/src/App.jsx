import './App.css'
import SignUp from "./components/UserSignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignIn from "./components/UserSignIn";
import ConfirmMail from "./components/ConfirmMail";
import Home from './components/Home';
import Signuph from './components/signuph';
import Signupo from './components/signupo';
import UserSignIn from './components/UserSignIn';
import HostSignIn from './components/HostSignIn';
import SignInh from './components/SignInh';
import Meet from './components/Meet';
import RazorpayComponent from './components/RazorpayComponent';
import CreateEvent from "./components/CreateEvent";
import MyEvents from './components/MyEvents';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        {/* <Route path="/signin" element={<SignIn />} /> */}
        <Route exact path="/signinh" element={<SignInh/>} />
        <Route exact path="/signupu" element={<SignUp />} />
        <Route exact path="/myEvents" element={<MyEvents />} />
        <Route exact path="/createEvent" element={<CreateEvent />} />
        <Route exact path="/signupo" element={<Signupo />} />
        <Route exact path="/signuph" element={<Signuph />} />
        <Route exact path="/signinUser" element={<UserSignIn/>} />
        <Route exact path="/signinHost" element={<HostSignIn/>} />
        <Route exact path="/payment/:eventId" element={<RazorpayComponent />} />
        <Route path="/meet/:eventId" element={<Meet />} />
        <Route path="/verify" element={<ConfirmMail />} />
        <Route exact path="/createEvent" element={<CreateEvent/>}/>
        {/* <Route path="/signup" element={< />} /> */}
      </Routes>
  </BrowserRouter>
  )
}

export default App
