import React, { useState } from 'react';
import './styles.css'; // Assuming styles.css is in the same directory

const EventPage = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [artistName, setArtistName] = useState('');
  const [artistImage, setArtistImage] = useState(null);
  const [totalTickets, setTotalTickets] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [pourcForWinners, setPourcForWinners] = useState('');

  const handleEventFormSubmit = (e) => {
    e.preventDefault();
    // Handle saving event details here
  };

  const handleArtistFormSubmit = (e) => {
    e.preventDefault();
    // Handle adding artist here
  };

  const handleNftFormSubmit = (e) => {
    e.preventDefault();
    // Handle NFT form submission here
  };

  const createVoteEvent = () => {
    // Handle creating vote event here
  };

  return (
    <div>
      <h2>Event Name and Date</h2>
      <form onSubmit={handleEventFormSubmit}>
        <label htmlFor="eventName">Event Name:</label>
        <input type="text" id="eventName" required value={eventName} onChange={(e) => setEventName(e.target.value)} />
        <br /><br />
        <label htmlFor="eventDate">Event Date:</label>
        <input type="date" id="eventDate" required value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        <br /><br />
        <button type="submit">Save Event Details</button>
      </form>
      <hr />
      <h2>Artist Voting</h2>
      <form onSubmit={handleArtistFormSubmit}>
        <label htmlFor="artistName">Artist Name:</label>
        <input type="text" id="artistName" required value={artistName} onChange={(e) => setArtistName(e.target.value)} />
        <br /><br />
        <label htmlFor="artistImage">Artist Image:</label>
        <input type="file" id="artistImage" accept="image/*" required onChange={(e) => setArtistImage(e.target.files[0])} />
        <br /><br />
        <button type="submit">Add Artist</button>
      </form>
      {/* Artists List can be rendered here */}
      <h3>Ticket/NFT Details:</h3>
      <form onSubmit={handleNftFormSubmit}>
        <label htmlFor="totalTickets">Total Tickets/NFTs Available:</label>
        <input type="number" id="totalTickets" required value={totalTickets} onChange={(e) => setTotalTickets(e.target.value)} />
        <br /><br />
        <label htmlFor="ticketPrice">Ticket/NFT Price:</label>
        <input type="number" id="ticketPrice" required value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />
        <br /><br />
        <label htmlFor="pourcForWinners">Percentage for Winners:</label>
        <input type="number" id="pourcForWinners" required value={pourcForWinners} onChange={(e) => setPourcForWinners(e.target.value)} />
        <br /><br />
      </form>
      <hr />
      <button onClick={createVoteEvent}>Create Vote Event</button>
      <button id="viewEventsBtn" style={{ display: 'none' }} onClick={() => window.location.href='event-list.html'}>View Event List</button>
    </div>
  );
};

export default EventPage;
