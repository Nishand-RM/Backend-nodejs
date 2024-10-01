const express = require('express');
const app = express();
app.use(express.json());

let rooms = [];
let bookings = [];

// Create Room
app.post('/create-room', (req, res) => {
    const { name, seats, amenities, pricePerHour } = req.body;
    const newRoom = { id: rooms.length + 1, name, seats, amenities, pricePerHour, booked: false };
    rooms.push(newRoom);
    res.status(201).send('Room created successfully');
});


// Book Room
app.post('/book-room', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;

    const room = rooms.find(r => r.id === roomId);
    if (!room) return res.status(404).send('Room not found');
    
    const isBooked = bookings.find(b => b.roomId === roomId && b.date === date && 
        ((startTime >= b.startTime && startTime <= b.endTime) || 
        (endTime >= b.startTime && endTime <= b.endTime)));
    
    if (isBooked) return res.status(400).send('Room is already booked for the selected time');

    const booking = { id: bookings.length + 1, customerName, date, startTime, endTime, roomId };
    bookings.push(booking);
    room.booked = true;

    res.status(201).send('Room booked successfully');
});


// List all rooms with booking details
app.get('/rooms', (req, res) => {
    const roomData = rooms.map(room => {
        const booking = bookings.find(b => b.roomId === room.id);
        return {
            roomName: room.name,
            bookedStatus: room.booked,
            customerName: booking ? booking.customerName : 'N/A',
            date: booking ? booking.date : 'N/A',
            startTime: booking ? booking.startTime : 'N/A',
            endTime: booking ? booking.endTime : 'N/A'
        };
    });
    res.send(roomData);
});

// List all customers with booking details
app.get('/customers', (req, res) => {
    const customerData = bookings.map(booking => {
        const room = rooms.find(r => r.id === booking.roomId);
        return {
            customerName: booking.customerName,
            roomName: room.name,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime
        };
    });
    res.send(customerData);
});


// Customer booking history
app.get('/customer-history/:customerName', (req, res) => {
    const { customerName } = req.params;
    console.log("Received customer name:", customerName); 
    const customerBookings = bookings.filter(b => b.customerName === customerName);

    if (customerBookings.length === 0) return res.status(404).send('No bookings found for this customer');

    const history = customerBookings.map(b => {
        const room = rooms.find(r => r.id === b.roomId);
        return {
            customerName: b.customerName,
            roomName: room.name,
            date: b.date,
            startTime: b.startTime,
            endTime: b.endTime,
            bookingId: b.id,
            bookingDate: b.date,
            bookingStatus: room.booked ? 'Confirmed' : 'Cancelled'
        };
    });
    res.send(history);
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
