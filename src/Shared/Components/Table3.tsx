import { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { GridApi, GridReadyEvent, ColumnApi } from 'ag-grid-community'

interface TableProps {}

const Table3: React.FC<TableProps> = () => {
    const [gridApi, setGridApi] = useState<GridApi | null>(null)
    const [gridColumnApi, setGridColumnApi] = useState<ColumnApi | null>(null)
    const [hideColumn, setHideColumn] = useState(false)

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
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name' },
        { field: 'email', headerName: 'Email' },
        { field: 'dob', headerName: 'Date of Birth' },
    ]

    function onGridReady(params: GridReadyEvent) {
        setGridApi(params.api)
        setGridColumnApi(params.columnApi)
    }

    const showColumn = () => {
        if (gridColumnApi) {
            gridColumnApi.setColumnsVisible(['dob', 'email'], !hideColumn)
        }
        setHideColumn(!hideColumn)
        if (gridApi) {
            gridApi.sizeColumnsToFit()
        }
    }

    return (
        <>
            <h1>React-App</h1>
            <h3>Student Details</h3>
            <button onClick={showColumn}>Toggle DOB and Email</button>
            <div className='ag-theme-alpine' style={{ height: 300 }}>
                <AgGridReact
                    onGridReady={onGridReady}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{ flex: 1 }}
                />
            </div>
        </>
    )
}

export default Table3
