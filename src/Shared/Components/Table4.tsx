import { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { GridApi, GridReadyEvent, ColumnApi } from 'ag-grid-community'
import { Button } from '@mui/material'

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

const Table4: React.FC<TableProps> = () => {
    const [gridApi, setGridApi] = useState<GridApi | null>(null)
    const [gridColumnApi, setGridColumnApi] = useState<ColumnApi | null>(null)
    const [tableData, setTableData] = useState<UserData[] | null>(null)

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

    const getUsers = async () => {
        const data = await fetch(url)
        const json = await data.json()
        setTableData(json)
    }

    const searchDivStyle = { backgroundColor: '#dedede', padding: 10 }
    const searchStyle = {
        width: '100%',
        padding: '10px 20px',
        borderRadius: 20,
        outline: 0,
        border: '2px #68bf40 solid',
        fontSize: '100%',
    }

    function onGridReady(params: GridReadyEvent) {
        setGridApi(params.api)
        setGridColumnApi(params.columnApi)
    }

    const onFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gridApi) {
            gridApi.setQuickFilter(e.target.value)
        }
    }

    return (
        <>
            <h1>React-App</h1>
            <h4>Quick search in Ag Grid</h4>

            <div className='ag-theme-alpine' style={{ height: 300 }}>
                <AgGridReact
                    onGridReady={onGridReady}
                    rowData={tableData}
                    columnDefs={columnDefs}
                    defaultColDef={{ flex: 1 }}
                />
            </div>
        </>
    )
}

export default Table4
