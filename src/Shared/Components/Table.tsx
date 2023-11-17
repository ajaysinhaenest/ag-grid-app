import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import { GridApi, GridReadyEvent } from 'ag-grid-community'

interface TableProps {}

const Table: React.FC<TableProps> = () => {
    const data = [
        { name: 'Dan', phoneNumber: 9856758898, birthYear: 2000 },
        { name: 'Mac', phoneNumber: 9856758898, birthYear: 2000 },
        { name: 'David', phoneNumber: 9856758898, birthYear: 2000 },
        { name: 'john', phoneNumber: 9856758898, birthYear: 2000 },
    ]

    const columnDefs: { headerName: string; field: string }[] = [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Phone Number', field: 'phoneNumber' },
        { headerName: 'Birth Year', field: 'birthYear' },
    ]

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
            {/* <button>Export</button> */}
            <div
                className='ag-theme-alpine'
                style={{ height: 400, width: '100%' }}
            >
                <AgGridReact
                    rowData={data}
                    columnDefs={columnDefs}
                    // defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                />
            </div>
        </>
    )
}

export default Table
