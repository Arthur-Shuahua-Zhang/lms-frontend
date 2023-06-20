import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Cookies from 'js-cookie';
import { Typography, Switch, FormControlLabel } from "@mui/material";
import RoleSelect from '../components/RoleSelect';



export default function Users() {
    const [users, setUsers] = useState([]);
    const [update, setUpdate] = useState(false);
    const [signupEnabled, setsignupEnabled] = useState(false);


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        { field: 'email', headerName: 'Email', width: 130 },
        // { field: 'role', headerName: 'Role', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },

        {
            field: "role",
            headerName: "Role",
            width: 160,
            renderCell: (params) => (
                <RoleSelect params={params} setUpdate={setUpdate} update={update} />
            ),
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get('jwt');

            if (!token) {
                console.error('No token found');
                return;
            }

            const response = await fetch('http://localhost:8081/user', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                setUsers(responseData);
            } else {
                console.error('Error fetching protected resource');
            }
        };

        fetchData();
    }, []);

    const switchSignUpPage = async (event) => {
        setsignupEnabled(event.target.checked)

        const token = Cookies.get('jwt');

        if (!token) {
            console.error('No token found');
            return;
        }
        const response = await fetch(`http://localhost:8081/opensignup?open=${event.target.checked}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
        });

        if (response.ok) {
            console.log('Data updated successfully:');
        } else {
            console.error('There was an error updating the data:');
        }
    }


    return (
        <div>
            <div style={{ height: '20vh', width: '100%', top: '100px' }}>
                <Typography variant="h5" color="primary">
                    User Management Tools
                </Typography>

                <FormControlLabel
                    control={
                        <Switch checked={signupEnabled} onChange={switchSignUpPage} />
                    }
                    label="Close/Open SignUp Service"
                />
            </div>

            <div style={{ height: '70vh', width: '100%', top: '100px' }}>
                <Typography variant="h5" color="primary">
                    Users Information
                </Typography>
                <DataGrid
                    rows={users}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>

        </div>



    );





}