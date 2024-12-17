const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  const Booking = await ethers.getContractFactory("Booking");
  const booking = await Booking.deploy();

  await booking.deployed();
  console.log("Contract deployed at:", booking.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
