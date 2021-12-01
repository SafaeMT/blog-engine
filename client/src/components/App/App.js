import React from "react";

function App() {
  const [expressMessage, setExpressMessage] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setExpressMessage(data.message));
  }, []);

  return (
    <div>
      <p>
        {expressMessage
          ? expressMessage
          : "Waiting for a message from Express server..."}
      </p>
    </div>
  );
}

export default App;
