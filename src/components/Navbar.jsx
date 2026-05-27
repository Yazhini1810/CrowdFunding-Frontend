import { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {

const navigate = useNavigate();
const [showLogin,setShowLogin] = useState(false);
const [showRegister,setShowRegister] = useState(false);

// ✅ user from localStorage
const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")));

// ✅ ADMIN STATE (default false)
const [isAdmin, setIsAdmin] = useState(false);

// ✅ sync admin on page load
useEffect(() => {
  const admin = localStorage.getItem("isAdmin") === "true";
  setIsAdmin(admin);
}, []);

/* REGISTER STATES */
const [name,setName] = useState("");
const [regEmail,setRegEmail] = useState("");
const [password,setPassword] = useState("");
const [phone,setPhone] = useState("");

/* LOGIN STATES */
const [loginEmail,setLoginEmail] = useState("");
const [loginPassword,setLoginPassword] = useState("");

/* LOGOUT */
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("isAdmin");

  setUser(null);
  setIsAdmin(false);

  alert("Logged out");
  navigate("/");
};

/* REGISTER API */
const handleRegister = async () => {

  const userData = {
    name: name,
    email: regEmail,
    password: password,
    phone: phone
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      userData
    );

    if(response.status === 200 || response.status === 201){
      alert("Registration Successful");
      setShowRegister(false);
    } else {
      alert("Registration Failed");
    }

  } catch(error){
    if(error.response){
      alert(error.response.data.message || JSON.stringify(error.response.data));
    } else {
      alert("Server not reachable");
    }
  }
};

/* LOGIN API */
const handleLogin = async () => {

  if(!loginEmail || !loginPassword){
    alert("Please enter email and password");
    return;
  }

  const loginData = {
    email: loginEmail,
    password: loginPassword
  };

  try{

    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      loginData
    );

    const token = response.data;

    // ✅ ADMIN LOGIN
    if(token === "ADMIN"){
      localStorage.setItem("isAdmin", "true");

      const adminData = { email: loginEmail };
      localStorage.setItem("user", JSON.stringify(adminData));

      setUser(adminData);
      setIsAdmin(true);

      alert("Admin Login Successful");
      setShowLogin(false);
      navigate("/admin/login");
      return;
    }

    // ✅ NORMAL USER LOGIN
    if(token){
      alert("Login Successful");

      localStorage.setItem("token", token);

      const userData = { email: loginEmail };
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      setIsAdmin(false); // 🔥 important

      setShowLogin(false);
    } else {
      alert("Invalid Email or Password");
    }

  } catch(error){
    if(error.response){
      alert(error.response.data.message || JSON.stringify(error.response.data));
    } else {
      alert("Server not reachable");
    }
  }
};

/* LOGIN CHECK */
const checkLogin = () => {
  const token = localStorage.getItem("token");

  if(!token){
    alert("Please login first");
    setShowLogin(true);
    return false;
  }
  return true;
};

return (

<>
<nav className="navbar navbar-expand-lg">

<h2 className="logo">CrowdFund</h2>



<button 
className="navbar-toggler"
type="button"
data-bs-toggle="collapse"
data-bs-target="#navContent"
>
<span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navContent">

<div className="nav-links ms-auto d-flex flex-column flex-lg-row align-items-lg-center gap-3">

{/* ✅ ADMIN BUTTON */}
{isAdmin && (
  <button className="campaign-btn" 
  onClick={() => navigate("/admin/login")}>
    Admin
  </button>
)}

<button
className="campaign-btn"
onClick={()=>{
  if(checkLogin()){
    navigate("/create-campaign");
  }
}}
>
Start Campaign
</button>

{user ? (
  <button className="login-btn" onClick={logout}>
    Logout
  </button>
) : (
  <button className="login-btn" onClick={()=>setShowLogin(true)}>
    Login
  </button>
)}

</div>

</div>

</nav>

{/* LOGIN MODAL */}
{showLogin && (

<div className="modal">
<div className="auth-card">

<span 
className="close-icon"
onClick={()=>setShowLogin(false)}
>
✖
</span>

<div className="auth-header">Login Form</div>

<div className="auth-body">

<input
type="email"
placeholder="Email"
value={loginEmail}
onChange={(e)=>setLoginEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={loginPassword}
onChange={(e)=>setLoginPassword(e.target.value)}
/>

<button className="auth-btn" onClick={handleLogin}>
Login
</button>

<p className="switch-text">
Not a member? 
<span onClick={()=>{
  setShowLogin(false);
  setShowRegister(true);
}}>
Signup now
</span>
</p>

</div>
</div>
</div>

)}

{/* REGISTER MODAL */}
{showRegister && (

<div className="modal">
<div className="auth-card">

<span 
className="close-icon"
onClick={()=>setShowRegister(false)}
>
✖
</span>

<div className="auth-header">Register</div>

<div className="auth-body">

<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Email"
value={regEmail}
onChange={(e)=>setRegEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<input
type="tel"
placeholder="Phone Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

<button className="auth-btn" onClick={handleRegister}>
Register
</button>

<p className="switch-text">
Already have account?
<span onClick={()=>{
  setShowRegister(false);
  setShowLogin(true);
}}>
Login
</span>
</p>

</div>
</div>
</div>

)}

</>

);
}

export default Navbar;