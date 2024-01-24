import React, { useState } from 'react';
const Classes = () => {
    const [classes, setClasses] = useState([]);
    const addSemester = () => {
        setClasses(prevClasses => [...prevClasses, <ClassTextboxList key = {prevClasses.length}/>]);
    };
    return (
        <div style={{ display: 'flex' }}>
            <button onClick={addSemester}>Add Semester</button>
            {classes.map(classes => classes)}
      </div>
    );
}
export default Classes;