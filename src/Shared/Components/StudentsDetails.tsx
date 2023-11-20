import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import { GridApi, GridReadyEvent } from 'ag-grid-community'

interface TableProps {}

const StudentsDetails: React.FC<TableProps> = () => {
    const columnDefs = [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Age', field: 'age', tooltipField: 'name' },
        { headerName: 'Birth Year', field: 'birthYear' },
        {
            headerName: 'Phone Number',
            field: 'phoneNumber',
            tooltipField: 'name',
        },
    ]
    const rowData = [
        { name: 'Rahul', age: 19, phoneNumber: 9876543210, birthYear: 2001 },
        { name: 'David', age: 17, phoneNumber: 9827654310, birthYear: 2003 },
        { name: 'Dan', age: 25, phoneNumber: 9765438210, birthYear: 1995 },
    ]

    const defaultColDef = {
        sortable: true,
        editable: true,
        flex: 1,
        filter: true,
        floatingFilter: true,
    }

    let gridApi: GridApi | null = null // Explicit type declaration and initialization

    const onGridReady = (params: GridReadyEvent) => {
        if (params && params.api) {
            gridApi = params.api
        }
    }

    return (
        <>
            <h1>React-App</h1>
            <h3>Student Details</h3>
            <div className='ag-theme-alpine' style={{ height: '400px' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    enableBrowserTooltips={true}
                    tooltipShowDelay={200}
                ></AgGridReact>
            </div>
        </>
    )
}

export default StudentsDetails
