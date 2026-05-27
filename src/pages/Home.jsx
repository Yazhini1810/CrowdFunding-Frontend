import "../styles/Home.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // ✅ add this

function Home() {

const [stats, setStats] = useState({
  totalFunds: 0,
  totalDonations: 0,
  totalCampaigns: 0
});

const navigate = useNavigate();
const [hasCampaign,setHasCampaign] = useState(false);
const loggedUser = JSON.parse(localStorage.getItem("user"));

const user = localStorage.getItem("user");

useEffect(()=>{

if(loggedUser){

console.log("Login Email:", loggedUser.email);

axios.get(`http://localhost:8080/api/campaign/user/${loggedUser.email}`) // ✅ changed
.then(res=>{

  console.log("Campaign Response:", res.data); 

if(res.data.length > 0){
setHasCampaign(true);
}

})
.catch(err=>console.log(err));

}

},[]);


useEffect(() => {
  // existing loggedUser / campaign check code irukattum

  // 🔥 Add stats fetch
  axios.get("http://localhost:8080/api/stats")
    .then(res => {
      setStats(res.data);
    })
    .catch(err => console.log(err));
}, []);

/* LOGIN CHECK */

const checkLogin = () => {

const user = localStorage.getItem("user");

if(!user){
alert("Please login first");
navigate("/");
return false;
}

return true;

};

const scrollToFundraising = () => {
  const section = document.getElementById("fundraising");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

return (

<div className="home">

{/* HERO SECTION */}
<section className="hero container-fluid p-0">

<img
src="https://images.unsplash.com/photo-1593113598332-cd288d649433"
alt="crowdfunding"
className="hero-img img-fluid"
/>

<div className="hero-overlay"></div>

<div className="hero-content container">

<h1>Fund</h1>
<h2>Help Others</h2>

<p>
Start a fundraiser for medical emergencies,
education and startup dreams.
</p>

<button
className="fund-btn"
onClick={()=>{
if(checkLogin()){
navigate("/create-campaign");
}
}}
>
Start Fundraising
</button>

</div>


{/* STATS */}

<div className="stats-box">

  <div>
    <h3>₹{stats.totalFunds}</h3>
    <p>Funds Raised</p>
  </div>

  <div>
    <h3>{stats.totalDonations}</h3>
    <p>Donations</p>
  </div>

  <div>
    <h3>{stats.totalCampaigns}</h3>
    <p>Campaigns</p>
  </div>

</div>

</section>


{/* MEDICAL SECTION */}

<section>

<div className="category-page">

<h1 className="category-title">
Medical Fundraising & Crowdfunding
</h1>

<p className="category-subtitle">
Online medical crowdfunding is an alternative method for individuals
and organisations to generate funds required for costly medical
treatments like open-heart surgeries, NICU care, bone marrow
transplant and cancer treatments.
</p>


<div className="category-container">

<div className="category-text">

<h2>
Medical Bills are a Burden for Many Individuals and Families
</h2>

<p>
Expenses related to hospital stays, cancer treatments with high-cost
chemotherapy routines, and other medicinal costs can be even higher.
</p>

<p>
Insurance plans are not enough, as policies do not cover everything
you need.
</p>

<div className="content">
<button onClick={scrollToFundraising}>Donate Now</button>
</div>

</div>

<div className="category-image">

<img
src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
alt="hospital"
/>

</div>

</div>

</div>


{/* EDUCATION SECTION */}
<div className="section education">

<div className="image">
<img
src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
alt="Education"
/>
</div>

<div className="content">

<h2>Many Students Struggle to Continue Their Education Due to Financial Problems</h2>

<p>
Education is one of the most powerful tools for transforming lives and communities.
Unfortunately many students struggle to continue their studies because of financial difficulties.
</p>

<p>
Every student deserves the opportunity to learn and build a better life.
</p>

<button onClick={scrollToFundraising}>Donate Now</button>

</div>

</div>

{/* STARTUP SECTION */}
<div className="section startup">

<div className="content">

<h2>Startup Ideas Need Support to Become Successful Businesses</h2>

<p>
Many talented entrepreneurs have innovative ideas but lack financial support
to turn those ideas into successful businesses.
</p>

<p>
Even a small donation can make a big difference.
</p>

<button onClick={scrollToFundraising}>Donate Now</button>

</div>

<div className="image">
<img
src="https://images.unsplash.com/photo-1559136555-9303baea8ebd"
alt="Startup"
/>
</div>

</div>

</section>


{/* CATEGORY CARDS */}
<section className="info-section campaign-section" id="fundraising">

{hasCampaign && (
<button
className="my-campaign-btn"
onClick={()=>navigate("/my-campaigns")}
>
📊 My Campaigns <span>➜</span>
</button>
)}

<h2 className="info-title">
Start Fundraising For What Matters
</h2>

<p className="info-subtitle">
Raise funds easily for medical emergencies, education support and startup dreams.
</p>

<div className="info-cards">

{/* Medical */}

<div className="info-card">

<img
src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
alt="medical"
/>

<h3>Medical Treatment</h3>

<p>
Raise funds for hospital bills and emergency treatments.
</p>

<button
className="category-btn"
onClick={()=>{
if(checkLogin()){
navigate("/medical");
}
}}
>
View Medical Campaigns
</button>

</div>


{/* Education */}

<div className="info-card">

<img
src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
alt="education"
/>

<h3>Education Support</h3>

<p>
Help students achieve their dreams through crowdfunding.
</p>

<button
className="category-btn"
onClick={()=>{
if(checkLogin()){
navigate("/education");
}
}}
>
View Education Campaigns
</button>

</div>


{/* Startup */}

<div className="info-card">

<img
src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png"
alt="startup"
/>

<h3>Startup Funding</h3>

<p>
Raise funds to launch innovative startup ideas.
</p>

<button
className="category-btn"
onClick={()=>{
if(checkLogin()){
navigate("/startup");
}
}}
>
View Startup Campaigns
</button>

</div>

</div>

</section>

<Footer/>

</div>

);

}

export default Home;