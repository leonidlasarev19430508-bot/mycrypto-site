export default function Dashboard() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Crypto Dashboard</h1>
      <p>Тут відображаються графіки з Metabase.</p>

      <iframe
        src="http://localhost:3002/public/dashboard/YOUR_DASHBOARD_ID"
        style={{
          width: "100%",
          height: "600px",
          border: "none",
        }}
      ></iframe>
    </div>
  );
}
