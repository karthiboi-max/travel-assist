import Web3 from "web3";
import contractABI from "./artifacts/contracts/Booking.sol/Booking.json";

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with deployed contract address
const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

export const createBooking = async (userAddress, destination, startDate, endDate, price) => {
  const accounts = await web3.eth.getAccounts();
  const fromAddress = accounts[0];

  return await contract.methods
    .createBooking(userAddress, destination, startDate, endDate, web3.utils.toWei(price, "ether"))
    .send({ from: fromAddress });
};

export const getBooking = async (bookingId) => {
  return await contract.methods.getBooking(bookingId).call();
};
