import React, { useState } from "react";
import Modal from "react-modal";
import { Button, TextField } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const EventDetailModal = ({ event, onClose, onUpdateEvent }) => {
  const [editedEvent, setEditedEvent] = useState(event);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdateEvent(editedEvent);
    setIsEditing(false);
  };

  return (
    <Modal isOpen={!!event} onRequestClose={onClose} className="p-5 bg-white rounded-lg">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {isEditing ? (
          <>
            <TextField
              label="Title"
              name="title"
              value={editedEvent.title}
              onChange={handleChange}
              fullWidth
            />

            <DateTimePicker
              label="Start Time"
              value={editedEvent.start}
              onChange={(newValue) => setEditedEvent({ ...editedEvent, start: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />

            <DateTimePicker
              label="End Time"
              value={editedEvent.end}
              onChange={(newValue) => setEditedEvent({ ...editedEvent, end: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />

            <TextField
              label="Meeting Link"
              name="meetingLink"
              value={editedEvent.meetingLink || ""}
              onChange={handleChange}
              fullWidth
            />

            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </>
        ) : (
          <>
            <h2>{event.title}</h2>
            <p><strong>Start:</strong> {event.start.toString()}</p>
            <p><strong>End:</strong> {event.end.toString()}</p>
            {event.meetingLink && (
              <p>
                <strong>Meeting Link:</strong> <a href={event.meetingLink} target="_blank" rel="noopener noreferrer">{event.meetingLink}</a>
              </p>
            )}
          </>
        )}
      </LocalizationProvider>

      <Button variant="contained" color="secondary" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Edit"}
      </Button>
      <Button variant="contained" onClick={onClose}>
        Close
      </Button>
    </Modal>
  );
};

export default EventDetailModal;
