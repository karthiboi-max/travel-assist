import React, { useState } from "react";

const Bookingpage = () => {
  const [userAddress, setUserAddress] = useState("");
  const [bookingDetails, setBookingDetails] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    price: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = async () => {
    try {
      const response = await fetch("http://localhost:5000/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAddress, bookingDetails }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(`Booking confirmed! Transaction Hash: ${data.tx}`);
      } else {
        setMessage(data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Error creating booking", error);
      setMessage("An error occurred while booking.");
    }
  };

  return (
    <div className="booking-page">
      <h2>Book Your Trip</h2>
      <label>
        Wallet Address:
        <input
          type="text"
          placeholder="Enter wallet address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          required
        />
      </label>
      <form
        className="booking-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleBooking();
        }}
      >
        <label>
          Destination:
          <input
            type="text"
            name="destination"
            placeholder="Enter destination"
            value={bookingDetails.destination}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={bookingDetails.startDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={bookingDetails.endDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Price (ETH):
          <input
            type="text"
            name="price"
            placeholder="Enter price in ETH"
            value={bookingDetails.price}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit" className="btn">Book Now</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Bookingpage;
