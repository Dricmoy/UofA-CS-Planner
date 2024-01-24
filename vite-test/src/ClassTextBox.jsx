import React, { useState } from 'react';

const ClassTextbox = (id) => {
  const [value, setValue] = useState('');

  return (
    <input
      name={id}
      type="text"
      value={value}
      onChange={(e)=>{setValue(e.target.value)}}
      placeholder = "Insert class here"
    />
  );
};

export default ClassTextbox;
