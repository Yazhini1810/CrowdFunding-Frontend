import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // ✅ add this

function DonorList(){

const {id} = useParams();

const [donors,setDonors] = useState([]);

useEffect(()=>{

axios.get(`http://localhost:8080/api/donate/donations/${id}`) // ✅ changed
.then(res=>{
  console.log("Donors:", res.data); // debug
  setDonors(res.data);
})
.catch(err=>console.log(err));

},[id]);

return(

<div>

<h2>Donor List</h2>

<table border="1">

<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>Amount</th>
<th>Transaction ID</th>
</tr>
</thead>

<tbody>

{donors.length === 0 ? (
<tr>
<td colSpan="5">No donors found</td>
</tr>
) : (
donors.map((d)=>(
<tr key={d.id}>
<td>{d.donorName}</td>
<td>{d.email}</td>
<td>{d.phone}</td>
<td>{d.amount}</td>
<td>{d.transactionId}</td>
</tr>
))
)}

</tbody>

</table>

</div>

);

}

export default DonorList;