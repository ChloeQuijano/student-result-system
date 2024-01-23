import React from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'firstName', headerName: 'First Name', width: 300 },
    { field: 'lastName', headerName: 'Last Name', width: 300 },
    { field: 'dateOfBirth', headerName: 'Date of Birth', width: 200 },
];

const StudentGrid = ({ triggerFetch }) => {
    const [tableData, setTableData] = React.useState([]);
    const [selectedRows, setSelectedRows] = React.useState([]);

    const fetchStudentData = () => {
        fetch('/api/students')
          .then((response) => response.json())
          .then((data) => {
            const formattedData = data.map((student) => ({
                ...student,
                dateOfBirth: new Date(student.dateOfBirth).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }),
              }));
            console.log(formattedData);
            setTableData(formattedData);
          })
          .catch((error) => {
            console.error('Error fetching student data:', error);
          });
    };

    React.useEffect(() => {
        fetchStudentData();
    }, [triggerFetch]);
    
    const handleDeleteSelectedRows = () => {
        // Create an array of selected row IDs
        const studentIdsToDelete = selectedRows.map((selectedRow) => selectedRow._id);

        // Make a DELETE request to the server
        fetch('/api/students/delete', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ studentIds: studentIdsToDelete }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setSelectedRows([]);
        })
        .catch((error) => {
            console.error('Error deleting students:', error);
        });
    };

    // Function to map selected row data to their IDs
    const getSelectedRowIds = (newSelection) => {
        return newSelection.map((selectedIndex) => tableData[selectedIndex]._id);
    };

    return (
        <div style={{ height: 700, width: '100%' }}>
            <Button onClick={handleDeleteSelectedRows}>Delete Selected Students</Button>
            <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={12}
                getRowId={(row) => row._id}
                checkboxSelection
                onSelectionModelChange={(newSelection) => {
                    setSelectedRows(getSelectedRowIds(newSelection));
                }}
                selectionModel={selectedRows}
            />
        </div>
    )
}

export default StudentGrid