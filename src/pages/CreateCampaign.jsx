import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateCampaign.css";
import { FaShieldAlt, FaUsers, FaHandHoldingHeart } from "react-icons/fa";
import axios from "axios"; // ✅ add this

function CreateCampaign(){

const navigate = useNavigate();

const [title,setTitle] = useState("");
const [category,setCategory] = useState("");
const [target,setTarget] = useState("");
const [description,setDescription] = useState("");
const [upi,setUpi] = useState("");
const [file,setFile] = useState(null);

const [email,setEmail] = useState("");
const [otp,setOtp] = useState("");
const [generatedOtp,setGeneratedOtp] = useState("");
const [verified,setVerified] = useState(false);

/* SEND OTP */

const sendOtp = () => {

if(!email){
alert("Enter email first");
return;
}

const otpCode = Math.floor(100000 + Math.random() * 900000);

setGeneratedOtp(otpCode.toString());

alert("OTP Sent : " + otpCode);

};

/* VERIFY OTP */

const verifyOtp = () => {

if(otp === generatedOtp){

setVerified(true);
alert("Email Verified Successfully");

}else{

alert("Invalid OTP");

}

};

/* CREATE CAMPAIGN */

const handleCreateCampaign = async () => {

if(!title || !category || !target || !description || !upi){
alert("Please fill all fields");
return;
}

if(!verified){
alert("Please verify email first");
return;
}

const user = JSON.parse(localStorage.getItem("user"));

const formData = new FormData();

formData.append("title",title);
formData.append("category",category);
formData.append("target",Number(target));
formData.append("description",description);
formData.append("upi",upi);

formData.append("email", user.email);

if(file){
formData.append("file",file);
}

try{

const response = await axios.post(
"http://localhost:8080/api/campaign/create",
formData
); // ✅ changed

if(response.status === 200){

alert("Campaign Created Successfully ❤️");

navigate("/" + category.toLowerCase());

}else{

alert("Failed to create campaign");

}

}catch(error){

console.log(error);
alert("Server Error");

}

};

return(

<div className="campaign-page">

{/* LEFT SIDE */}
<div className="campaign-info">

<h1>Start Your Fundraising</h1>

<p>
Create a campaign for medical help, education, or startup ideas.
Share your story and get support from people.
</p>

<div className="info-box">
<FaShieldAlt className="icon"/>
<div>
<h3>Build Trust</h3>
<p>Verified campaigns increase donor confidence.</p>
</div>
</div>

<div className="info-box">
<FaUsers className="icon"/>
<div>
<h3>Reach More People</h3>
<p>Share your campaign easily with friends and social media.</p>
</div>
</div>

<div className="info-box">
<FaHandHoldingHeart className="icon"/>
<div>
<h3>Get Support</h3>
<p>Receive donations quickly and securely.</p>
</div>
</div>

<div className="info-box">
<FaShieldAlt className="icon"/>
<div>
<h3>Secure Donations</h3>
<p>Your donations are protected with secure payment systems.</p>
</div>
</div>

<div className="info-box">
<FaUsers className="icon"/>
<div>
<h3>Community Support</h3>
<p>Thousands of people help each other through campaigns.</p>
</div>
</div>

</div>

{/* RIGHT SIDE FORM */}

<div className="campaign-card">

<h2>Create Campaign</h2>

<input
type="text"
placeholder="Campaign Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
>

<option value="">Select Category</option>
<option value="Medical">Medical</option>
<option value="Education">Education</option>
<option value="Startup">Startup</option>

</select>

<input
type="number"
placeholder="Target Amount"
value={target}
onChange={(e)=>setTarget(e.target.value)}
/>

<textarea
placeholder="Campaign Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
></textarea>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<button onClick={sendOtp}>
Send OTP
</button>

<input
type="text"
placeholder="Enter OTP"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
/>

<button onClick={verifyOtp}>
Verify OTP
</button>

<label>Upload Proof Image</label>

<input
type="file"
accept="image/*"
onChange={(e)=>setFile(e.target.files[0])}
/>

<input
type="text"
placeholder="UPI ID"
value={upi}
onChange={(e)=>setUpi(e.target.value)}
/>

<button
onClick={handleCreateCampaign}
disabled={!verified}
>
Create Campaign
</button>

</div>

</div>

);

}

export default CreateCampaign;