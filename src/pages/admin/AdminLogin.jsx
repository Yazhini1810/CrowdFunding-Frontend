import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminLogin.css";

function AdminDashboard() {

  const [activeTab, setActiveTab] = useState("users");

  const [users, setUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);

  /* FETCH */

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8080/api/admin/users");
    setUsers(res.data);
  };

  const fetchCampaigns = async () => {
    const res = await axios.get("http://localhost:8080/api/admin/campaigns");
    setCampaigns(res.data);
  };

  const fetchDonations = async () => {
    const res = await axios.get("http://localhost:8080/api/admin/donations");
    setDonations(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchCampaigns();
    fetchDonations();
  }, []);

  /* DELETE */

  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await axios.delete(`http://localhost:8080/api/admin/user/${id}`);
    fetchUsers();
  };

  const deleteCampaign = async (id) => {
    if (!window.confirm("Delete campaign?")) return;
    await axios.delete(`http://localhost:8080/api/admin/campaign/${id}`);
    fetchCampaigns();
  };

  const deleteDonation = async (id) => {
    if (!window.confirm("Delete donation?")) return;
    await axios.delete(`http://localhost:8080/api/admin/donation/${id}`);
    fetchDonations();
  };

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
      </div>

      {/* BUTTONS */}
      <div className="btn-group">
        <button className="btn blue" onClick={() => setActiveTab("users")}>
          Users
        </button>

        <button className="btn green" onClick={() => setActiveTab("campaigns")}>
          Campaigns
        </button>

        <button className="btn orange" onClick={() => setActiveTab("donations")}>
          Donors
        </button>
      </div>

      {/* TABLE */}
      <div className="table-card">

        {/* USERS */}
        {activeTab === "users" && (
          <>
            <h3>👤 Users List</h3>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u, index) => (
                  <tr key={u.id}>
                    <td>{index + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>
                      <button className="delete-btn" onClick={() => deleteUser(u.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* CAMPAIGNS */}
        {activeTab === "campaigns" && (
          <>
            <h3>🚀 Campaign Creators</h3>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Target</th>
                  <th>Created By</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {campaigns.map((c, index) => (
                  <tr key={c.id}>
                    <td>{index + 1}</td>
                    <td>{c.title}</td>
                    <td>{c.category}</td>
                    <td>₹{c.target}</td>
                    <td>{c.email}</td>
                    <td>
                      <button className="delete-btn" onClick={() => deleteCampaign(c.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* DONATIONS */}
        {activeTab === "donations" && (
          <>
            <h3>💰 Donors List</h3>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Amount</th>
                  <th>Transaction</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {donations.length === 0 ? (
                  <tr>
                    <td colSpan="6">No donations found</td>
                  </tr>
                ) : (
                  donations.map((d) => (
                    <tr key={d.id}>
                      <td>{d.donorName}</td>
                      <td>{d.email}</td>
                      <td>{d.phone}</td>
                      <td>₹{d.amount}</td>
                      <td>{d.transactionId}</td>
                      <td>
                        <button className="delete-btn" onClick={() => deleteDonation(d.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;