import { useState } from "react";
import axios from "axios";
import "../styles/CampaignCard.css";

function CampaignCard({ id, title, amount, description, image, upi }) {

const [showDonate,setShowDonate] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);

const [name,setName] = useState("");
const [phone,setPhone] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [donateAmount,setDonateAmount] = useState("");
const [transactionId,setTransactionId] = useState("");

const [donated,setDonated] = useState(0);

const progress = amount ? Math.min((donated / amount) * 100,100) : 0;

const handleDonate = async () => {

if(!name || !phone || !email || !donateAmount){
alert("Please fill all fields");
return;
}

const donationData = {
donorName:name,
phone:phone,
email:email,
password:password,
amount:donateAmount,
transactionId:transactionId,
campaign:{ id:id }
};

try{

await axios.post("http://localhost:8080/api/donate", donationData);


setShowSuccess(true);

setShowDonate(false);

setDonated(prev => prev + Number(donateAmount));

setName("");
setPhone("");
setEmail("");
setPassword("");
setDonateAmount("");
setTransactionId("");

}catch(error){
console.log(error);
alert("Donation Failed ❌");
}

};

return(

<>

<div className="campaign-card">

<img
className="campaign-img"
src={`http://localhost:8080/uploads/${image}`}
alt="campaign"
/>

<h3 className="title">{id}. {title}</h3>

<p className="desc">{description}</p>

<p className="amount">
Target : ₹{amount}
</p>

<div className="progress-bar">
<div
className="progress-fill"
style={{width: progress + "%"}}
></div>
</div>

<p className="progress-text">
₹{donated} raised • {Math.round(progress)}%
</p>

<button
className="donate-btn"
onClick={()=>setShowDonate(true)}
>
Donate
</button>

</div>

{/* DONATE MODAL */}
{showDonate && (
  <div className="donate-modal">

    <div className="donate-card">

      <div className="donate-header">
        <h2>Donate</h2>
        <span onClick={()=>setShowDonate(false)}>✖</span>
      </div>

      <div className="donate-body">

        <p className="campaign-id">Campaign ID : {id}</p>

        <input type="text" placeholder="Donor Name"
          value={name} onChange={(e)=>setName(e.target.value)} />

        <input type="tel" placeholder="Phone Number"
          value={phone} onChange={(e)=>setPhone(e.target.value)} />

        <input type="email" placeholder="Email"
          value={email} onChange={(e)=>setEmail(e.target.value)} />

        <input type="password" placeholder="Password"
          value={password} onChange={(e)=>setPassword(e.target.value)} />

        <input type="number" placeholder="Enter Amount"
          value={donateAmount} onChange={(e)=>setDonateAmount(e.target.value)} />

        <input type="text" placeholder="UPI Transaction ID"
          value={transactionId} onChange={(e)=>setTransactionId(e.target.value)} />

        <h3>Pay using this UPI</h3>
        <p className="upi">{upi}</p>

        <button className="donate-btn" onClick={handleDonate}>
          Confirm Donation
        </button>

      </div>

    </div>

  </div>
)}

{showSuccess && (
  <div className="donate-modal">

    <div className="donate-card">

      <div className="donate-header">
        <h2>Success ❤️</h2>
        <span onClick={() => setShowSuccess(false)}>✖</span>
      </div>

      <div className="donate-body">

        <p>Donation Successful 🙏</p>

        <p>
          Ungaloda support romba mukkiyam.
          Campaign owner contact pannuvanga.
        </p>

        <button
          className="donate-btn"
          onClick={() => setShowSuccess(false)}
        >
          OK
        </button>

      </div>

    </div>

  </div>
)}

</>

)

}

export default CampaignCard;