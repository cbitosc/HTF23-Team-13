// EventForm.js
import { useState, useEffect } from 'react';
import './CreateEvent.css';
import UserService from '../services/userServices';
import authService from '../services/authService';
import { useNavigate } from "react-router-dom";



const EventForm = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [amount, setAmount] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  },[]);
  const navigate = useNavigate();
  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleCheckboxChange = (e) => {
    setIsPaid(e.target.checked);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDateChange = (e) => {
    setEventDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setEventTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform the form submission logic here, e.g., send data to the server
    UserService.createEvent(eventName,currentUser.user.userId,description,image,isPaid,amount,eventDate,eventTime).then((res) => {
      navigate('/myEvents');
      window.location.reload();
    })
    // Reset the form fields
    setEventName('');
    setDescription('');
    setImage(null);
    setIsPaid(false);
    setAmount('');
    setEventDate('');
    setEventTime('');
  };

  return (
    <div className="event-form-container">
      <h1>Create the Event</h1>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventName}
            onChange={handleEventNameChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="image-preview"
            />
          )}
        </div>

        <div className="form-group">
          <label>Payment:</label>
          <div>
            <label>
              <input
                type="checkbox"
                checked={isPaid}
                onChange={handleCheckboxChange}
              />{' '}
              Paid
            </label>
          </div>
          {isPaid && (
            <div>
              <label htmlFor="amount">Amount:</label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={amount}
                onChange={handleAmountChange}
                required
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="eventDate">Event Date:</label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={eventDate}
            onChange={handleDateChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventTime">Event Time:</label>
          <input
            type="time"
            id="eventTime"
            name="eventTime"
            value={eventTime}
            onChange={handleTimeChange}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
