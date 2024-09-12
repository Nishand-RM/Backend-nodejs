const express = require('express');
const app = express();
app.use(express.json());

let rooms = [];
let bookings = [];

// 1. Create a room
app.post('/create-room', (req, res) => {
    const { numberOfSeats, amenities, pricePerHour } = req.body;
    const room = { id: rooms.length + 1, numberOfSeats, amenities, pricePerHour };
    rooms.push(room);
    res.status(201).json({ message: "Room created", room });
});

// 2. Book a room
app.post('/book-room', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;

    // Check if the room is already booked at the same date and time
    const roomBooked = bookings.some(
        (booking) => booking.roomId === roomId && booking.date === date &&
        ((startTime >= booking.startTime && startTime < booking.endTime) || 
        (endTime > booking.startTime && endTime <= booking.endTime))
    );

    if (roomBooked) {
        return res.status(400).json({ message: "Room is already booked for the selected time." });
    }

    const booking = { customerName, date, startTime, endTime, roomId };
    bookings.push(booking);
    res.status(201).json({ message: "Room booked", booking });
});

// 3. List all rooms
app.get('/rooms', (req, res) => {
    res.json(rooms);
});

// 4. List all bookings
app.get('/bookings', (req, res) => {
    res.json(bookings);
});


app.listen(() => {
    console.log(`Server running on port 3001`);
});






