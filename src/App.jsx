import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateCampaign from "./pages/CreateCampaign";

import Medical from "./pages/Medical";
import Education from "./pages/Education";
import Startup from "./pages/Startup";
import UPI from "./pages/UPI";   
import ProtectedRoute from "./components/ProtectedRoute";
import MyCampaigns from "./components/MyCampaigns";

 import AdminLogin from "./pages/admin/AdminLogin"; 


function App() {
  return (
    <Router>

      <Navbar />

      <Routes>

       <Route path="/" element={<Home />} />
       <Route path="/create-campaign" element={ <ProtectedRoute> <CreateCampaign/> </ProtectedRoute>}/>
       <Route path="/medical" element={ <ProtectedRoute> <Medical/> </ProtectedRoute>}/>
       <Route path="/education" element={ <ProtectedRoute><Education/></ProtectedRoute>}/>
       <Route path="/startup" element={ <ProtectedRoute><Startup/></ProtectedRoute>}/>
       <Route path="/my-campaigns" element={ <ProtectedRoute> <MyCampaigns /> </ProtectedRoute>}/>
        <Route path="/upi" element={<UPI />} />   {/* NEW */}
        
         <Route path="/admin/login" element={<AdminLogin />} />


      </Routes>

    </Router>
  );
}

export default App;