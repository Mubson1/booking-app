import './DataTable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import useFetch from '../../hook/useFetch'
import axios from '../../auth/axiosInstance';

const DataTable = ({columns}) => {
    //this same datatable is rendered in users as well as products page. So, to identify which page we are in, we are using the useLocation hook
    const location = useLocation()
    const path = location.pathname.split('/')[1]

    const [list, setList] = useState([])

    const {data, loading, error} = useFetch(`/${path}`)

    useEffect(() => {
        setList(data)
    }, [data])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/${path}/${id}`)
            setList(list.filter(item => item._id !== id))
        } catch (error) {
            
        }
    }

    const actionColumn = [
        {field: "action", headerName: "Action", width: 200, renderCell: (params) => {
            return (
                <div className='cellAction'>
                    <Link to='/users/test' style={{textDecoration:"none"}}>
                        <div className='viewButton'>View</div>
                    </Link>
                    <div className='deleteButton' onClick={() => handleDelete(params.row._id)}>Delete</div>
                </div>
            )
        }}
    ]

    return (
        <div className='datatable'>
            <div className='datatableTitle'>
                {path}
                <Link to={`/${path}/new`} className='link'>
                    Add New
                </Link>
            </div>
            <DataGrid
                className='datagrid'
                rows={list}
                columns={columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                getRowId={row=>row._id}
            />
        </div>
    )
}

export default DataTable
