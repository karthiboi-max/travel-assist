import React from "react";
import Frontend from "src/components/frontend/Frontend"; // Fixed path
import Backend from "src/components/backend/Backend";          // Correct path
import "App.css";

const App = () => {
  return (
    <div className="app-container">
      <header>
        <h1>Blockchain Booking DApp</h1>
      </header>
      <main>
        {/* Frontend component handles the UI */}
        <Frontend />

        {/* Backend component interacts with the smart contract */}
        <Backend />
      </main>
      <footer>
        <p>&copy; 2024 Blockchain Booking. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
