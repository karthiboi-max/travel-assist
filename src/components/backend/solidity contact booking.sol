// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Booking {
    struct BookingDetails {
        address userAddress;
        string destination;
        string startDate;
        string endDate;
        uint256 price;
    }

    BookingDetails[] public bookings;

    event BookingCreated(
        uint256 bookingId,
        address indexed userAddress,
        string destination,
        string startDate,
        string endDate,
        uint256 price
    );

    function createBooking(
        address _userAddress,
        string memory _destination,
        string memory _startDate,
        string memory _endDate,
        uint256 _price
    ) public {
        bookings.push(BookingDetails(_userAddress, _destination, _startDate, _endDate, _price));
        emit BookingCreated(bookings.length - 1, _userAddress, _destination, _startDate, _endDate, _price);
    }

    function getBooking(uint256 _bookingId) public view returns (BookingDetails memory) {
        require(_bookingId < bookings.length, "Invalid booking ID");
        return bookings[_bookingId];
    }
}
