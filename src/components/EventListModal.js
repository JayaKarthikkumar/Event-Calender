import React from "react";
import Modal from "react-modal";
import { Button } from "@mui/material";

const EventListModal = ({ events, onClose, onSelectEvent }) => {
  return (
    <Modal isOpen={!!events.length} onRequestClose={onClose} className="p-5 bg-white rounded-lg">
      <h2 className="text-lg font-bold">Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="border p-2 my-2 cursor-pointer hover:bg-gray-200" onClick={() => onSelectEvent(event)}>
            {event.title} - {event.time}
          </li>
        ))}
      </ul>
      <Button variant="contained" color="secondary" onClick={onClose}>Close</Button>
    </Modal>
  );
};

export default EventListModal;
