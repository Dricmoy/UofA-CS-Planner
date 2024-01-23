import React, { useState } from 'react';
import ClassTextbox from './ClassTextbox';
const ClassTextboxList = () => {
    const [textboxes, setTextbox] = useState([]); // Initial values, you can set them as needed
    

    const addTextbox = () => {
        setTextbox(prevTextboxes => [...prevTextboxes, <input type="text" key={prevTextboxes.length} />]);
    };

    const removeTextBox = (index) =>{
        const newValues = [...textboxes];
        newValues[index].pop();
        setTextbox(newValues);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <button onClick={addTextbox}>Add Textbox</button>
            {textboxes.map(textboxes => textboxes)}
      </div>
    );
}

export default ClassTextboxList