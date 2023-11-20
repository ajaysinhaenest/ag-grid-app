import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import { GridApi, GridReadyEvent } from 'ag-grid-community'

interface TableProps {}

const Table: React.FC<TableProps> = () => {
    const data = [
        { name: 'Rahul', age: 19, phoneNumber: 9876543210, birthYear: 2001 },
        { name: 'David', age: 17, phoneNumber: 9827654310, birthYear: 2003 },
        { name: 'Dan', age: 25, phoneNumber: 9765438210, birthYear: 1995 },
    ]

    const columnDefs: {
        headerName: string
        field: string
        checkboxSelection?: boolean
        floatingFilter?: boolean
        flex?: number
        cellClass?: (p: any) => string
    }[] = [
        { headerName: 'Name', field: 'name' },
        {
            headerName: 'Age',
            field: 'age',
            // cellStyle:(params)=>(params.value>18?{borderLeft:"4px green solid"}:{borderLeft:"4px red solid"})
            cellClass: (params) =>
                params.value > 18 ? 'moreThan18' : 'lessThan18',
        },
        { headerName: 'Birth Year', field: 'birthYear' },
        { headerName: 'Phone Number', field: 'phoneNumber' },
    ]

    const defaultColDef = {
        sortable: true,
        editable: true,
        filter: true,
    }

    let gridApi: GridApi | null = null // Explicit type declaration and initialization

    const onGridReady = (params: GridReadyEvent) => {
        if (params && params.api) {
            gridApi = params.api
        }
    }

    const onExportClick = () => {
        if (gridApi) {
            gridApi.exportDataAsCsv()
        }
    }
    return (
        <>
            <button onClick={onExportClick}>Export</button>
            <div
                className='ag-theme-alpine'
                style={{ height: 400, width: '100%' }}
            >
                <AgGridReact
                    rowData={data}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                />
            </div>
        </>
    )
}

export default Table
