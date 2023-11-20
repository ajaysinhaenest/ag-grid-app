import { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { GridApi, GridReadyEvent, ColumnApi } from 'ag-grid-community'
import { Button } from '@mui/material'
import FormDialog from './dialogBox/FormDialog'

interface TableProps {}

interface UserData {
    id: string
    name: string
    email: string
    phone: string
    dob: string
}

const initialValue: UserData = {
    id: '',
    name: '',
    email: '',
    phone: '',
    dob: '',
}

const Table5: React.FC<TableProps> = () => {
    const [gridApi, setGridApi] = useState<any>(null) // Adjust the type as per your need
    const [tableData, setTableData] = useState<UserData[] | null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [formData, setFormData] = useState<UserData>(initialValue)

    const [rowData, setRowData] = useState([
        {
            id: 1,
            name: 'Neeraj',
            email: 'neeraj2020@gmail.com',
            dob: '23/01/1996',
        },
        { id: 2, name: 'Raj', email: 'raj@gmail.com', dob: '08/07/1996' },
        { id: 3, name: 'Mayank', email: 'mayank@gmail.com', dob: '09/09/1964' },
        { id: 4, name: 'Vishal', email: 'vk462@gmail.com', dob: '15/01/2020' },
    ])
    const columnDefs = [
        { headerName: 'ID', field: 'id' },
        { headerName: 'Name', field: 'name' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'phone', field: 'phone' },
        { headerName: 'Date of Birth', field: 'dob' },
        {
            headerName: 'Actions',
            field: 'id',
            cellRendererFramework: (params: any) => (
                <div>
                    <Button
                        variant='outlined'
                        color='primary'
                        // onClick={() => handleUpdate(params.data)}
                    >
                        Update
                    </Button>
                    <Button
                        variant='outlined'
                        color='secondary'
                        // onClick={() => handleDelete(params.value)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ]

    const url = 'http://localhost:4000/users'

    useEffect(() => {
        getUsers()
    }, [])

    const onChange = (e: any) => {
        const { value, id } = e.target
        // console.log(value,id)
        setFormData({ ...formData, [id]: value })
    }

    const getUsers = async () => {
        const data = await fetch(url)
        const json = await data.json()
        setTableData(json)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setFormData(initialValue)
    }

    function onGridReady(params: GridReadyEvent) {
        setGridApi(params.api)
    }

    const handleUpdate = (oldData: UserData) => {
        setFormData(oldData)
        handleClickOpen()
    }

    const handleDelete = (id: string) => {
        const confirm = window.confirm(
            'Are you sure, you want to delete this row',
        )
        if (confirm) {
            fetch(`${url}/${id}`, { method: 'DELETE' })
                .then((resp) => resp.json())
                .then(() => getUsers())
                .catch((error) => console.error('Error deleting user: ', error))
        }
    }

    const handleFormSubmit = () => {
        if (formData.id) {
            const confirm = window.confirm(
                'Are you sure, you want to update this row ?',
            )
            confirm &&
                fetch(`${url}/${formData.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(formData),
                    headers: {
                        'content-type': 'application/json',
                    },
                })
                    .then((resp) => resp.json())
                    .then(() => {
                        handleClose()
                        getUsers()
                    })
                    .catch((error) =>
                        console.error('Error updating user: ', error),
                    )
        } else {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'content-type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then(() => {
                    handleClose()
                    getUsers()
                })
                .catch((error) => console.error('Error adding user: ', error))
        }
    }

    return (
        <>
            <h1>React-App</h1>
            <h4>Quick search in Ag Grid</h4>
            <button onClick={handleClickOpen}>Add User</button>
            <div className='ag-theme-alpine' style={{ height: 300 }}>
                <AgGridReact
                    onGridReady={onGridReady}
                    rowData={tableData}
                    columnDefs={columnDefs}
                    defaultColDef={{ flex: 1 }}
                />
            </div>
            <FormDialog
                open={open}
                handleClose={handleClose}
                data={formData}
                onChange={onChange}
                handleFormSubmit={handleFormSubmit}
            />
        </>
    )
}

export default Table5
