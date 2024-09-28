'use client';

import React, { useState, useEffect } from 'react';
import { addDays, addWeeks, addMonths, addYears, isValid, getDay, subDays } from 'date-fns';
import { format } from 'date-fns';

export default function MiniCalendar({ recurrence, startDate, endDate, customRecurrence }) {
  const [recurringDates, setRecurringDates] = useState([]);

  const getRecurringDates = () => {
    if (!startDate || !isValid(new Date(startDate))) return [];
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : addYears(start, 1); 

    let dates = [];

    if (recurrence === 'daily') {
      for (let day = start; day <= end; day = addDays(day, customRecurrence.interval)) {
        dates.push(new Date(day));
      }
    } else if (recurrence === 'weekly') {
      const daysOfWeekIndices = customRecurrence.daysOfWeek.map((day) =>
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day)
      );
      let currentWeekStart = subDays(start,start.getDay());
      
      while (currentWeekStart <= end) {
        daysOfWeekIndices.forEach((dayIndex) => {
          const recurringDay = addDays(currentWeekStart, dayIndex);
          if (recurringDay >= start && recurringDay <= end) {
            dates.push(new Date(recurringDay));
          }
        });
        currentWeekStart = addWeeks(currentWeekStart, customRecurrence.interval);
      }
    } else if (recurrence === 'monthly') {
      let currentMonth = start;
      while (currentMonth <= end) {
        dates.push(new Date(currentMonth));
        currentMonth = addMonths(currentMonth, customRecurrence.interval);
      }
    } else if (recurrence === 'yearly') {
      let currentYear = start;
      while (currentYear <= end) {
        dates.push(new Date(currentYear));
        currentYear = addYears(currentYear, customRecurrence.interval);
      }
    }

    return dates;
  };

  useEffect(() => {
    setRecurringDates(getRecurringDates());
  }, [recurrence, startDate, endDate, customRecurrence]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Recurring Dates Preview:</h2>
      {recurringDates.length > 0 ? (
        <ul>
          {recurringDates.map((date, index) => (
            <li key={index} className="text-blue-500">
              {format(date, 'MMMM d, yyyy')}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No recurring dates available.</p>
      )}
    </div>
  );
}
