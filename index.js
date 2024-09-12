const express = require('express');
const app = express();
app.use(express.json());

let rooms = [];
let bookings = [];

// 1. Create a Room
app.post('/create-room', (req, res) => {
    const { roomName, seats, amenities, pricePerHour } = req.body;
    const newRoom = { id: rooms.length + 1, roomName, seats, amenities, pricePerHour, booked: false };
    rooms.push(newRoom);
    res.status(201).send(newRoom);
});

// 2. Book a Room
app.post('/book-room', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;

    // Check if room is already booked for the given date/time
    const isBooked = bookings.find(booking => booking.roomId === roomId && booking.date === date &&
        ((startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime)));

    if (isBooked) {
        return res.status(400).send("Room is already booked for the selected date and time.");
    }

    const newBooking = { 
        id: bookings.length + 1, customerName, date, startTime, endTime, roomId 
    };
    bookings.push(newBooking);
    res.status(201).send(newBooking);
});

// 3. List all Rooms with Booking Data
app.get('/rooms', (req, res) => {
    const roomData = rooms.map(room => {
        const roomBookings = bookings.filter(booking => booking.roomId === room.id);
        return {
            roomName: room.roomName,
            bookedStatus: roomBookings.length > 0,
            bookings: roomBookings
        };
    });
    res.status(200).send(roomData);
});

// 4. List all Customers with Booking Data
app.get('/customers', (req, res) => {
    const customerData = bookings.map(booking => {
        const room = rooms.find(room => room.id === booking.roomId);
        return {
            customerName: booking.customerName,
            roomName: room.roomName,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime
        };
    });
    res.status(200).send(customerData);
});

// 5. List Customer's Booking History
app.get('/customer-bookings/:customerName', (req, res) => {
    const customerName = req.params.customerName;
    const customerBookings = bookings.filter(booking => booking.customerName === customerName);
    const bookingHistory = customerBookings.map(booking => {
        const room = rooms.find(room => room.id === booking.roomId);
        return {
            customerName,
            roomName: room.roomName,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingId: booking.id
        };
    });
    res.status(200).send(bookingHistory);
});

// Start Server

app.listen( () => console.log(`Server running on port 3001`));
