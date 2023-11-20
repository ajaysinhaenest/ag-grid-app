import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS

interface TableProps {}

const Table2: React.FC<TableProps> = () => {
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

    const onGridReady = (params: any) => {
        console.log('grid is ready')
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then((resp) => resp.json())
            .then((resp) => {
                console.log(resp)
                params.api.applyTransaction({ add: resp })
            })
    }

    const rowSelectionType = 'multiple'

    //function will trigger once selection changed
    const onSelectionChanged = (event: any) => {
        console.log(event.api.getSelectedRows())
    }

    //function to allow selection to row
    const isRowSelectable = (node: any) => {
        return node.data
            ? node.data.id % 2 === 0 || node.data.email.includes('.org')
            : false
    }

    return (
        <>
            <h1>React-App</h1>
            <h3>Student Details</h3>
            <div className='ag-theme-alpine' style={{ height: '400px' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    rowSelection={rowSelectionType}
                    onSelectionChanged={onSelectionChanged}
                    rowMultiSelectWithClick={true}
                    isRowSelectable={isRowSelectable}
                ></AgGridReact>
            </div>
        </>
    )
}

export default Table2
