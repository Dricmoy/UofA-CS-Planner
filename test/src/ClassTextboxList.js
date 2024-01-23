import React, { useState } from 'react';
import ClassTextbox from './ClassTextbox';
const ClassTextboxList = () => {
    const [textboxes, setTextboxes] = useState([]); // Initial values, you can set them as needed
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setTextboxes((prev) => {
            let helper = [...prev];
            helper[e.target.name] = e.target.value;
            console.log(e.target.name)
            console.log(e.target.value)
            return helper;
        });
    }
    
    const addTextbox = () => {
        setTextboxes(prevTextboxes => [...prevTextboxes,
        <input
            name={prevTextboxes.length}
            type="text"
            value={value}
            onChange={(e)=>{onChange(e)}}
            placeholder = "Insert class here"
        />
        ]);
    };

    const removeTextBox = () =>{
        const newValues = [...textboxes];
        newValues.pop();
        setTextboxes(newValues);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <button onClick={addTextbox}>Add Textbox</button>
                {textboxes.map(textboxes => textboxes)}
            </div>

      </div>
    );
}

export default ClassTextboxList