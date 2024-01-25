// UniversityPlanner.jsx
import React, { useState } from 'react';

const UniversityPlanner = () => {
  const maxSemesterLimit = 5;
  const maxCourseLimit = 7;

  const [semesterCount, setSemesterCount] = useState(3);
  const [courseCount, setCourseCount] = useState(3);

  const [plannerData, setPlannerData] = useState(() => {
    const initialSemesters = Array.from({ length: semesterCount }, (_, index) => `Semester ${index + 1}`);
    const initialCourses = Array.from({ length: courseCount }, () => Array(semesterCount).fill(''));
    return [initialSemesters, ...initialCourses];
  });

  const updatePlannerData = () => {
    const initialSemesters = Array.from({ length: semesterCount }, (_, index) => `Semester ${index + 1}`);
    const initialCourses = Array.from({ length: courseCount }, () => Array(semesterCount).fill(''));
    setPlannerData([initialSemesters, ...initialCourses]);
  };

  const addSemester = () => {
    if (semesterCount < maxSemesterLimit) {
      setSemesterCount((prevCount) => prevCount + 1);
      updatePlannerData();
    } else {
      alert("You've hit the semester limit!");
    }
  };

  const removeSemester = () => {
    if (semesterCount > 1) {
      setSemesterCount(prevCount => prevCount - 1);
      updatePlannerData();
    }
  };

  const addCourse = () => {
    if (courseCount < maxCourseLimit) {
      setCourseCount((prevCount) => prevCount + 1);
      updatePlannerData();
    }
  };

  const removeCourse = () => {
    if (courseCount > 1) {
      setCourseCount(prevCount => prevCount - 1);
      updatePlannerData();
    }
  };

  const updateCell = (courseIndex, semesterIndex, value) => {
    const updatedData = [...plannerData];
    updatedData[courseIndex][semesterIndex] = value;
    setPlannerData(updatedData);
  };

  return (
    <div className="university-planner">
      <div className="course-counter">Courses: {courseCount}</div>
      <div className="buttons">
        <button onClick={addSemester} disabled={semesterCount >= maxSemesterLimit}>
          Add Semester
        </button>
        <button onClick={removeSemester}>Remove Semester</button>
        <button onClick={addCourse} disabled={courseCount >= maxCourseLimit}>
          Add Course
        </button>
        <button onClick={removeCourse}>Remove Course</button>
      </div>
      <table>
        <tbody>
          {plannerData.map((row, courseIndex) => (
            <tr key={courseIndex}>
              {row.map((cell, semesterIndex) => (
                <td key={semesterIndex}>
                  {courseIndex === 0 ? (
                    <strong>{cell}</strong>
                  ) : (
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => updateCell(courseIndex, semesterIndex, e.target.value)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniversityPlanner;
