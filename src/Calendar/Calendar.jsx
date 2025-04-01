import React, { useState, useEffect } from "react";
import axios from "axios";

const Calendar = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "", minutes: "" });
  const [eventNote, setEventNote] = useState("");
  const [eventCompany, setEventCompany] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [scheduleData, setScheduleData] = useState(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDate();

  useEffect(() => {
    axios
      .get("http://localhost:5065/api/interviewNote")
      .then((response) => {
        setScheduleData(response.data);
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    setSelectedDate(clickedDate);
    setShowEventPopup(true);
    setEventNote("");
    setEventTime({ hours: "", minutes: "" });
    setEditingEvent(null);
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleEventSubmit = async (event) => {
    event.preventDefault();
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectedDate,
      eventHour: `${eventTime.hours.padStart(2, "0")}`,
      eventMinute: `${eventTime.minutes.padStart(2, "0")}`,
      company: eventCompany,
      note: eventNote,
    };

    console.log(newEvent);

    let updatedEvents = [...events];

    if (editingEvent) {
      updatedEvents = updatedEvents.map((event) =>
        event.id === editingEvent.id ? newEvent : event
      );
    } else {
      updatedEvents.push(newEvent);
    }

    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    setEvents(updatedEvents);
    setEventTime({ hours: "", minutes: "" });
    setEventNote("");
    setEventCompany("");
    setShowEventPopup(false);
    setEditingEvent(null);

    console.log(event);

    const response = await axios.post(
      "http://localhost:5065/api/interviewNote",
      newEvent,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(newEvent);
  };

  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date));
    setEventTime({
      hours: event.time.split(":")[0],
      minutes: event.time.split(":")[1],
    });
    setEventNote(event.text);
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  const handleDeleteEvent = async (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);

    setEvents(updatedEvents);

    const response = await axios.delete(
      `http://localhost:5065/api/interviewNote/${eventId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    setEventTime((prevTime) => ({
      ...prevTime,
      [name]: value.padStart(2, ""),
    }));
  };

  return (
    <div className="appliation-calendar">
      <div className="calendar">
        <h1 className="heading">Calendar</h1>
        <div className="navigate-date">
          <h2 className="month"> {monthOfYear[currentMonth]},</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>
        <div className="weekdays">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="days">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current-day"
                  : ""
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="events">
        {showEventPopup && (
          <div className="event-popup">
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
                value={eventTime.hours}
                onChange={handleTimeChange}
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
                value={eventTime.minutes}
                onChange={handleTimeChange}
              />
            </div>
            <div className="event-popup-company-name">
              <div className="companyName">Company Name</div>
              <input
                placeholder="Enter Company Name"
                value={eventCompany}
                onChange={(e) => setEventCompany(e.target.value)}
              />
            </div>
            <textarea
              placeholder="Enter Event Text (Maximum 60)"
              value={eventNote}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setEventNote(e.target.value);
                }
              }}
            ></textarea>
            <button className="event-popup-btn" onClick={handleEventSubmit}>
              {editingEvent ? "Update Event" : "Add Event"}
            </button>
            <button
              className="close-event-popup"
              onClick={() => setShowEventPopup(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}
        {events.map((event, index) => (
          <div className="event" key={index}>
            <div className="event-date-wrapper">
              <div className="event-date">{event.date.toString()}</div>
            </div>
            <div className="event-company">{event.company}</div>
            <div className="event-buttons">
              <i
                Style="font-size:200%"
                className="bx bxs-edit-alt"
                onClick={() => handleEditEvent(event)}
              ></i>
              <i
                Style="font-size:200%"
                className="bx bxs-message-alt-x"
                onClick={() => handleDeleteEvent(event.id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
