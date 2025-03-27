import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventDetailModal from "./EventDetailModal";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const initialEvents = [
  { id: 1, title: "Meeting with Team", start: new Date(2025, 2, 26, 10, 0), end: new Date(2025, 2, 26, 11, 0) },
  { id: 2, title: "Deadline", start: new Date(2025, 3, 10), end: new Date(2025, 3, 10) },
  { id: 3, title: "Conference", start: new Date(2025, 4, 15), end: new Date(2025, 4, 15) }
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

const CalendarComponent = () => {
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: new Date(), end: new Date() });
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setNewEvent(event);
    setEditing(true);
    setOpenModal(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ title: "", start, end });
    setEditing(false);
    setOpenModal(true);
  };

  const handleSaveEvent = () => {
    if (!newEvent.title.trim()) {
      alert("Please enter an event title.");
      return;
    }
    if (editing) {
      setEvents((prevEvents) => prevEvents.map((event) => (event.id === newEvent.id ? newEvent : event)));
    } else {
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    }
    setOpenModal(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom></Typography>
      <Button variant="contained" color="primary" onClick={() => { setEditing(false); setOpenModal(true); }}>+ Add Event</Button>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "600px", margin: "20px" }} 
        selectable
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]} // ✅ Fixed view selection
        defaultView={Views.MONTH}
        date={date}
        onNavigate={handleNavigate}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
  <Box sx={modalStyle}>
    {/* Close Button (X) on Top Right */}
    <IconButton 
      sx={{ position: "absolute", top: 8, right: 8 }} 
      onClick={() => setOpenModal(false)}
    >
      <Close />
    </IconButton>

    <Typography variant="h6">{editing ? "Edit Event" : "Add Event"}</Typography>

    <TextField
      fullWidth
      label="Event Title"
      variant="outlined"
      margin="normal"
      value={newEvent.title}
      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
    />

    <TextField
      fullWidth
      label="Start Date & Time"
      type="datetime-local"
      margin="normal"
      InputLabelProps={{ shrink: true }}
      value={format(newEvent.start, "yyyy-MM-dd'T'HH:mm")}
      onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
    />

    <TextField
      fullWidth
      label="End Date & Time"
      type="datetime-local"
      margin="normal"
      InputLabelProps={{ shrink: true }}
      value={format(newEvent.end, "yyyy-MM-dd'T'HH:mm")}
      onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
    />

    {/* 🔹 Google Meet Link Input */}
    <TextField
      fullWidth
      label="Google Meet Link"
      variant="outlined"
      margin="normal"
      value={newEvent.meetingLink || ""}
      onChange={(e) => setNewEvent({ ...newEvent, meetingLink: e.target.value })}
      placeholder="https://meet.google.com/xyz-abc-def"
    />

    {/* 🔹 Display Clickable Link When Editing */}
    {editing && newEvent.meetingLink && (
      <Box mt={2}>
        <Typography variant="body1">
          Join Meeting:{" "}
          <a href={newEvent.meetingLink} target="_blank" rel="noopener noreferrer" style={{ color: "#1976d2" }}>
            {newEvent.meetingLink}
          </a>
        </Typography>
      </Box>
    )}

    <Box mt={2} display="flex" justifyContent="space-between">
      <Button variant="contained" color="primary" onClick={handleSaveEvent}>
        {editing ? "Save Changes" : "Save Event"}
      </Button>

      {editing && (
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            handleDeleteEvent(newEvent.id);
            setOpenModal(false);
          }}
        >
          Delete
        </Button>
      )}
    </Box>
  </Box>
</Modal>


    </div>
  );
};

export default CalendarComponent;