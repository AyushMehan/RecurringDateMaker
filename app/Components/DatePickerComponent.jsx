'use client'; // Client-side component

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './styles.css';
import MiniCalendar from './MiniCalendar';

export default function DatePickerComponent() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [recurrence, setRecurrence] = useState('none');
  const [customRecurrence, setCustomRecurrence] = useState({
    interval: 1,
    daysOfWeek: [],
  });

  const handleStartDateChange = (value) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
  };

  const handleRecurrenceChange = (event) => {
    setRecurrence(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setCustomRecurrence({
      ...customRecurrence,
      interval: parseInt(event.target.value, 10),
    });
  };

  const handleDaysOfWeekChange = (event) => {
    const day = event.target.value;
    const updatedDays = customRecurrence.daysOfWeek.includes(day)
      ? customRecurrence.daysOfWeek.filter((d) => d !== day)
      : [...customRecurrence.daysOfWeek, day];

    setCustomRecurrence({ ...customRecurrence, daysOfWeek: updatedDays });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Date Picker with Recurrence</h1>
      <div className='flex justify-around'>
        
      <div className="mb-4">
        <label className="block mb-2">Start Date:</label>
        <Calendar onChange={handleStartDateChange} value={startDate} />
      </div>

      <div className="mb-4">
        <label className="block mb-2">End Date:</label>
        <Calendar onChange={handleEndDateChange} value={endDate} />
      </div>
    </div>  
    <div className='flex justify-around'>

      <div className="mb-4">
        <label className="block mb-2">Recurrence:</label>
        <select value={recurrence} onChange={handleRecurrenceChange} className="border rounded p-2 text-black">
          <option value="none">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {recurrence !== 'none' && (
        <div className="mb-4">
          <label className="block mb-2">Recurrence Interval:</label>
          <input
            type="number"
            min="1"
            value={customRecurrence.interval}
            onChange={handleIntervalChange}
            className="border rounded p-2 text-black"
            />
        </div>
      )}

      {recurrence === 'weekly' && (
          <div className="mb-4">
          <label className="block mb-2">Days of the Week:</label>
          <div className="flex gap-2">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <label key={day}>
                <input
                  type="checkbox"
                  value={day}
                  checked={customRecurrence.daysOfWeek.includes(day)}
                  onChange={handleDaysOfWeekChange}
                  className="mr-2"
                  />
                {day}
              </label>
            ))}
          </div>
        </div>
      )}

      </div>
      <MiniCalendar
        startDate={startDate}
        endDate={endDate}
        recurrence={recurrence}
        customRecurrence={customRecurrence}
      />
    </div>
  );
}
