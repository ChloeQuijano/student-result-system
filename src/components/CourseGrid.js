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
            const formattedData = data.map((course) => ({
                ...course,
                id: course._id,
            }));

            console.log(formattedData);
            setTableData(formattedData);
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

        console.log(courseIdsToDelete)

        if (courseIdsToDelete.length === 0) {
            return;
        }

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
                    console.log(newSelection);
                    setSelectedRows(newSelection);
                }}
                selectionModel={selectedRows}
            />
        </div>
    )
}

export default CourseGrid