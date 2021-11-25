import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [expressMessage, setExpressMessage] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setExpressMessage(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {expressMessage
            ? expressMessage
            : "Waiting for a message from Express server..."}
        </p>
      </header>
    </div>
  );
}

export default App;
