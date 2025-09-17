import React, { useState, useEffect } from 'react';

const SimpleTicketCount = ({ value, onChange, min = 1, max = 10 }) => {
  const [ticketCount, setTicketCount] = useState(value || 1);

  useEffect(() => {
    if (value && value !== ticketCount) {
      setTicketCount(value);
    }
  }, [value]);

  const handleChange = (newValue) => {
    const safeValue = Math.max(min, Math.min(max, Number(newValue) || min));
    setTicketCount(safeValue);
    if (onChange) {
      onChange(safeValue);
    }
  };

  return (
    <input
      type="number"
      value={ticketCount}
      min={min}
      max={max}
      onChange={(e) => handleChange(e.target.value)}
      style={{
        width: '100%',
        padding: '12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px'
      }}
    />
  );
};

export default SimpleTicketCount;
