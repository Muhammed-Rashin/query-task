import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home,CreateQuery } from './pages';
import Admin from './pages/Admin/Admin';
import Executive from './pages/Executive/Executive';
import ExecutiveLogin from './pages/ExecutiveLogin/ExecutiveLogin';



function App() {
  return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/ask" element={<CreateQuery/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/executive" element={<Executive/>}/>
          <Route path="/executive/login" element={<ExecutiveLogin/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
