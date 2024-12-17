// Importing essential libraries
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const dotenv = require("dotenv");
const winston = require("winston");
const path = require("path");
const fs = require("fs");
const Web3 = require("web3");

// Load environment variables
dotenv.config();

// Logger setup
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "app.log" })
  ]
});

// Express server setup
const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
app.use(express.json());

// Blockchain connection setup
const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

// Load compiled contract ABI and Bytecode
const contractPath = path.join(__dirname, "artifacts", "contracts", "Booking.sol", "Booking.json");
const contractData = JSON.parse(fs.readFileSync(contractPath, "utf-8"));
const contractABI = contractData.abi;
const contractBytecode = contractData.bytecode;

// Deploy or connect to an existing contract
let contract;
(async () => {
  try {
    if (process.env.CONTRACT_ADDRESS) {
      contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);
      logger.info(`Connected to existing contract at: ${process.env.CONTRACT_ADDRESS}`);
    } else {
      const factory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);
      contract = await factory.deploy();
      await contract.deployed();
      logger.info(`Contract deployed at: ${contract.address}`);
    }
  } catch (error) {
    logger.error("Error deploying or connecting to the contract:", error.message);
    process.exit(1);
  }
})();

// Blockchain Functions
async function createBookingOnChain(userAddress, destination, startDate, endDate, price) {
  const tx = await contract.createBooking(userAddress, destination, startDate, endDate, ethers.utils.parseEther(price));
  const receipt = await tx.wait();
  logger.info(`Booking created: ${receipt.transactionHash}`);
  return receipt.transactionHash;
}

async function getBookingDetails(bookingId) {
  const booking = await contract.getBooking(bookingId);
  return {
    userAddress: booking.userAddress,
    destination: booking.destination,
    startDate: booking.startDate,
    endDate: booking.endDate,
    price: ethers.utils.formatEther(booking.price),
  };
}
// AI-powered trip suggestions
const aiTripSuggestions = (preferences) => {
  const trips = [
    { destination: "Paris", activity: "Art Tour" },
    { destination: "Maldives", activity: "Beach Stay" },
    { destination: "Tokyo", activity: "Cultural Walk" },
    { destination: "New York", activity: "City Tour" },
    { destination: "Goa", activity: "Beach Party" },
    { destination: "London", activity: "Historical Tour" },
    { destination: "Dubai", activity: "Desert Safari" },
    { destination: "Berlin", activity: "Nightlife Adventure" },
    { destination: "Bangkok", activity: "Street Food Exploration" },
    { destination: "Barcelona", activity: "Architectural Wonders" },
    { destination: "Chicago", activity: "Lakefront Walk" },
    { destination: "Melbourne", activity: "Art and Coffee" }
  ];

  return trips.filter((trip) => preferences.includes(trip.activity));
};

app.post("/suggest-trips", (req, res) => {
  const { preferences } = req.body;
  const suggestions = aiTripSuggestions(preferences);
  res.status(200).json({ success: true, suggestions });
});

// Endpoints
app.post("/book", async (req, res) => {
  logger.info("Received booking request:", req.body);
  const { userAddress, bookingDetails } = req.body;
  const { destination, startDate, endDate, price } = bookingDetails;

  try {
    const txHash = await createBookingOnChain(userAddress, destination, startDate, endDate, price);
    logger.info(`Transaction successful: ${txHash}`);
    res.status(200).json({ success: true, message: "Booking confirmed!", tx: txHash });
  } catch (err) {
    logger.error("Booking failed:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/booking/:id", async (req, res) => {
  logger.info(`Fetching booking with ID: ${req.params.id}`);
  try {
    const bookingId = req.params.id;
    const booking = await getBookingDetails(bookingId);
    logger.info("Booking details retrieved successfully");
    res.status(200).json({ success: true, booking });
  } catch (err) {
    logger.error("Error fetching booking details:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

// Export for further integration
module.exports = app;
