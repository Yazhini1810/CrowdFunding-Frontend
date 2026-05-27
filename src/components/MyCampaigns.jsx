import { useEffect, useState } from "react";
import axios from "axios"; // ✅ add this

function MyCampaigns() {

  const [campaign, setCampaign] = useState(null);
  const [donors, setDonors] = useState([]);

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.email) return;

    // ✅ 1. Get Campaign
    axios.get(`http://localhost:8080/api/campaign/user/${storedUser.email}`)
      .then(res => {
        const data = res.data;
        console.log("My Campaign:", data);

        if (data.length > 0) {
          setCampaign(data[0]); // 🔥 FIRST CAMPAIGN SET

          // ✅ 2. Get donors
          return axios.get(`http://localhost:8080/api/donate/donations/${data[0].id}`);
        } else {
          setCampaign(null);
        }
      })
      .then(res => {
        if (res && res.data) {
          console.log("Donors:", res.data);
          setDonors(res.data);
        }
      })
      .catch(err => console.log(err));

  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h2>📊 My Campaign</h2>

      {!campaign ? (
        <p>No campaign found</p>
      ) : (
        <>
          <p><b>Campaign :</b> {campaign.title}</p>
          <p><b>Category :</b> {campaign.category}</p>
          <p><b>Target :</b> ₹{campaign.target}</p>
          <p><b>Description :</b> {campaign.description}</p>
          <p><b>UPI ID :</b> {campaign.upi}</p>

          <h3 style={{ marginTop: "20px" }}>💰 Donor List</h3>

          <table border="1" width="100%" cellPadding="10">
            <thead style={{ backgroundColor: "#333", color: "white" }}>
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
                  <td colSpan="5">No donors yet</td>
                </tr>
              ) : (
                donors.map((d) => (
                  <tr key={d.id}>
                    <td>{d.donorName}</td>
                    <td>{d.email}</td>
                    <td>{d.phone}</td>
                    <td>₹{d.amount}</td>
                    <td>{d.transactionId}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}

    </div>
  );
}

export default MyCampaigns;