import React, { useState } from 'react';

const TimeRangeSelector = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState([]);
  const [excludedTime, setExcludedTime] = useState(["13-14", "17"]);

  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  const toggleTimeSlot = (timeSlot) => {
    if (selectedTimeRange.includes(timeSlot)) {
      setSelectedTimeRange(selectedTimeRange.filter(t => t !== timeSlot));
    } else {
      setSelectedTimeRange([...selectedTimeRange, timeSlot]);
    }
    console.log({ selectedTimeRange, excludedTime });
  };

  const isExcluded = (timeSlot) => {
    return excludedTime.some(range => {
      const [start, end] = range.split('-').map(Number);
      return timeSlot >= start && timeSlot < end;
    });
  };

  return (
    <div style={styles.container}>
      <h1>Select Time Range:</h1>
      <div style={styles.timeSlots}>
        {timeSlots.map(timeSlot => (
          <button
            key={timeSlot}
            onClick={() => !isExcluded(timeSlot) && toggleTimeSlot(timeSlot)}
            style={{
              ...styles.timeSlot,
              ...(selectedTimeRange.includes(timeSlot) ? styles.selected : {}),
              ...(isExcluded(timeSlot) ? styles.excluded : {})
            }}
          >
            {timeSlot}:00
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  timeSlots: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  timeSlot: {
    padding: '10px',
    margin: '5px',
    borderRadius: '5px',
    border: '1px solid #000',
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: 'lightgreen',
  },
  excluded: {
    backgroundColor: 'lightcoral',
  },
};

export default TimeRangeSelector;
