import React, { useState } from "react";
import Web3 from "web3";

const LoginPage = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
        setError("");
      } catch (err) {
        console.error("Wallet connection error", err);
        setError("Failed to connect wallet. Try again.");
      }
    } else {
      alert("Please install a Web3 wallet");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <button className="btn" onClick={connectWallet}>Connect Wallet</button>
      {walletAddress && <p>Connected Wallet: {walletAddress}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginPage;
