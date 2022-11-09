import React from "react";

function App() {
  const insertIntoDB = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/users/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: "usernameTest",
          password: "passwordTest",
        }),
      });
      const response = await res.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <button onClick={insertIntoDB}>Submit</button>
    </div>
  );
}

export default App;
