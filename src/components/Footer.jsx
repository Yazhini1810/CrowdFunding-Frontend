import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        <div style={styles.section}>
          <h3>About Us</h3>
          <p>
            Our platform connects Education, Medical, and Startup opportunities
            to help people learn, grow, and build successful careers.
          </p>
        </div>

        <div style={styles.section}>
          <h3>Services</h3>
          <ul style={styles.list}>
            <li>Education Programs</li>
            <li>Medical Support</li>
            <li>Startup Guidance</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h3>Contact</h3>
          <p>Email: info@example.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Chennai, India</p>
        </div>

      </div>

      <div style={styles.bottom}>
        © 2026 Your Company. All Rights Reserved.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#222",
    color: "white",
    paddingTop: "40px",
    width: "100vw",
    marginLeft: "calc(-50vw + 50%)",   // 🔥 THIS FIXES YOUR PROBLEM
  },
  container: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "40px",
  },
  section: {
    maxWidth: "300px",
    margin: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  bottom: {
    textAlign: "center",
    padding: "20px",
    borderTop: "1px solid #444",
  },
};

export default Footer;