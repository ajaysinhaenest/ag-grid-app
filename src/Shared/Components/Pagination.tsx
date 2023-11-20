import { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import { GridApi, GridReadyEvent } from 'ag-grid-community'

interface TableProps {}

const Pagination: React.FC<TableProps> = () => {
    const [gridApi, setGridApi] = useState<GridApi | null>(null) // Define the type explicitly

    const columnDefs = [
        {
            headerName: 'ID',
            field: 'id',
            checkboxSelection: true,
            headerCheckboxSelection: true,
        },
        { headerName: 'Name', field: 'name' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'Body', field: 'body' },
    ]

    const defaultColDef = {
        sortable: true,
        editable: true,
        flex: 1,
        filter: true,
        floatingFilter: true,
    }

    const onGridReady = (params: GridReadyEvent) => {
        setGridApi(params.api)
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then((resp) => resp.json())
            .then((resp) => {
                params.api.applyTransaction({ add: resp }) //adding API data to grid
                params.api.paginationGoToPage(10)
            })
    }

    const onPaginationChange = (pageSize: number) => {
        if (gridApi) {
            gridApi.paginationSetPageSize(pageSize)
        }
    }

    return (
        <>
            <h1>React-App</h1>
            <h3>Student Details</h3>
            <select
                onChange={(e) => onPaginationChange(Number(e.target.value))}
            >
                <option value=''></option>
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
            </select>
            <div className='ag-theme-alpine' style={{ height: '400px' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    pagination={true}
                    paginationPageSize={20}
                    // paginationAutoPageSize={true}
                ></AgGridReact>
            </div>
        </>
    )
}

export default Pagination
