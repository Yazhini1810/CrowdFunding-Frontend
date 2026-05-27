import { useEffect, useState } from "react";
import CampaignCard from "../components/CampaignCard";
import axios from "axios"; // ✅ add this

function Medical(){

const [campaigns,setCampaigns] = useState([]);

useEffect(()=>{

axios.get("http://localhost:8080/api/campaign/category/Medical") // ✅ changed
.then(res=>{
console.log("Medical Data:",res.data);
setCampaigns(res.data);
})
.catch(err=>console.log(err));

},[]);

return(

<div className="campaign-container">

{campaigns.length === 0 ? (

<h2>No Campaigns Found</h2>

) : (

campaigns.map((c)=>(
<CampaignCard
key={c.id}
id={c.id}
title={c.title}
amount={c.target}
description={c.description}
image={c.proofImage}
upi={c.upi}
/>
))

)}

</div>

)

}

export default Medical;