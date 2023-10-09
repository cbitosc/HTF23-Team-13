import './App.css'
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import ConfirmMail from "./components/ConfirmMail";
import Home from './components/Home';
import Signuph from './components/signuph';
import Signupo from './components/signupo';
import Meet from './components/Meet';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signupu" element={<SignUp />} />
        <Route path="/signupo" element={<Signupo />} />
        <Route path="/signuph" element={<Signuph />} />
        <Route path="/meet/:meetId" element={<Meet />} />
        <Route path="/verify" element={<ConfirmMail />} />
        {/* <Route path="/signup" element={< />} /> */}
      </Routes>
  </BrowserRouter>
  )
}

export default App
