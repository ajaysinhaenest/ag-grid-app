import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import { GridApi, GridReadyEvent } from 'ag-grid-community'

interface TableProps {}

const Table1: React.FC<TableProps> = () => {
    const data = [
        { name: 'Dan', modal: 'toyota', price: 35000 },
        { name: 'Mac', modal: 'mondeo', price: 45000 },
        { name: 'David', modal: 'boxter', price: 67000 },
    ]

    const actionButton = (p: any) => {
        console.log(p)
    }

    const columnDefs: {
        headerName: string
        field: string
        cellRenderer?: (params: any) => JSX.Element
    }[] = [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Modal', field: 'modal' },
        { headerName: 'Price', field: 'price' },
        {
            headerName: 'Action',
            field: 'price',
            cellRenderer: (params) => (
                <div>
                    <button onClick={() => actionButton(params)}>
                        click me
                    </button>
                </div>
            ),
        },
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

export default Table1
