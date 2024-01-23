import React from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'courseName', headerName: 'Course Name', width: 300 },
];

const CourseGrid = ({ triggerFetch }) => {
    const [tableData, setTableData] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);

    const fetchCourseData = () => {
        fetch('/api/courses')
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setTableData(data);
          })
          .catch((error) => {
            console.error('Error fetching course data:', error);
          });
      };
    
    React.useEffect(() => {
        fetchCourseData();
    }, [triggerFetch]);
    
    const handleDeleteSelectedRows = () => {
        // Create an array of selected row IDs
        const courseIdsToDelete = selectedRows.map((selectedRow) => selectedRow._id);

        // Make a DELETE request to the server
        fetch('/api/courses/delete', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ courseIds: courseIdsToDelete }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setSelectedRows([]);
        })
        .catch((error) => {
            console.error('Error deleting courses:', error);
        });
    };

    return (
        <div style={{ height: 700, width: '100%' }}>
            <Button onClick={handleDeleteSelectedRows}>Delete Selected Courses</Button>
            <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={12}
                getRowId={(row) => row._id}
                checkboxSelection
                onSelectionModelChange={(newSelection) => {
                    setSelectedRows(newSelection.selectionModel);
                }}
            />
        </div>
    )
}

export default CourseGrid