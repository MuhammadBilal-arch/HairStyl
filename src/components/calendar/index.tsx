import { useState } from 'react';

export const useCalendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  const onHandleSelectedDates = (selectedRanges: any) => {
    const { startDate, endDate } = selectedRanges.selection;
    setStartDate(startDate);
    setEndDate(endDate);
  };


  const onToggleCalendar = () => setShowCalendar(!showCalendar);
  return {
    onHandleSelectedDates,
    startDate,
    endDate,
    showCalendar,
    onToggleCalendar,
    selectionRange,
  };
};
