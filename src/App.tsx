import React from "react";

function App() {
  const insertIntoDB = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fname: "Test First Name",
          lname: "Test Last Name",
          email: "Test Email",
        }),
      });
      const response = await res.json();
      console.log(response + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Post API Test</h1>
      <button onClick={insertIntoDB}>Insert into DB</button>
    </div>
  );
}

export default App;
