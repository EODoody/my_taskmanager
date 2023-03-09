import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Navbar from "./Component/Navbar";
import SignupPage from './Pages/SignupPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Pages/LoginPage';
import AboutPage from './Pages/AboutPage';
import IndexPage from './Pages/IndexPage';
import AccountConfirm from './Pages/Confirm';
import Logout from './Component/logout';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<IndexPage />} />
          <Route path="/about"  element={<AboutPage />} />
          <Route path="/contact"  />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login"  element={<LoginPage />} />
          <Route path="/dashboard"  />
          <Route path="/logout"  element={<Logout/>}/>
          <Route path="/confirm" element={<AccountConfirm />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;