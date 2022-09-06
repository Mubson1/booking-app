import './Table.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Table_ = () => {
    const rows = [
        {
            id: 23423,
            product: "Acer Nitro 5",
            img: "https://thebytefactoryshop.com/wp-content/uploads/2022/01/Img1-14.jpg",
            customer: "Mubson Karki",
            date: "16 June",
            amount: 108000,
            method: "Cash on Delivery",
            status: "Approved"
        },
        {
            id: 643543,
            product: "Acer Nitro 4",
            img: "https://thebytefactoryshop.com/wp-content/uploads/2022/01/Img1-14.jpg",
            customer: "Mubson Potter",
            date: "16 October",
            amount: 105000,
            method: "Cash on Delivery",
            status: "Pending"
        },
        {
            id: 345465,
            product: "Acer Nitro 3",
            img: "https://thebytefactoryshop.com/wp-content/uploads/2022/01/Img1-14.jpg",
            customer: "Mubson John",
            date: "16 September",
            amount: 102000,
            method: "Online",
            status: "Approved"
        },
        {
            id: 123213,
            product: "Acer Nitro 2",
            img: "https://thebytefactoryshop.com/wp-content/uploads/2022/01/Img1-14.jpg",
            customer: "Mubson Cena",
            date: "16 August",
            amount: 104000,
            method: "Online Delivery",
            status: "Pending"
        },
        {
            id: 32423,
            product: "Acer Nitro 1",
            img: "https://thebytefactoryshop.com/wp-content/uploads/2022/01/Img1-14.jpg",
            customer: "Mubson Smith",
            date: "16 July",
            amount: 106000,
            method: "Cash on Delivery",
            status: "Pending"
        }
    ]

    return (
        <TableContainer component={Paper} className='table'>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell className='tableCell'>Tracking ID</TableCell>
                    <TableCell className='tableCell'>Product</TableCell>
                    <TableCell className='tableCell'>Customer</TableCell>
                    <TableCell className='tableCell'>Date</TableCell>
                    <TableCell className='tableCell'>Amount</TableCell>
                    <TableCell className='tableCell'>Payment Method</TableCell>
                    <TableCell className='tableCell'>Status</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell className='tableCell'>{row.id}</TableCell>
                        <TableCell className='tableCell'>
                            <div className='cellWrapper'>
                                <img src={row.img} alt='' className='image' />
                                {row.product}
                            </div>
                        </TableCell>
                        <TableCell className='tableCell'>{row.customer}</TableCell>
                        <TableCell className='tableCell'>{row.date}</TableCell>
                        <TableCell className='tableCell'>{row.amount}</TableCell>
                        <TableCell className='tableCell'>{row.method}</TableCell>
                        <TableCell className='tableCell'>
                            <span className={`status ${row.status}`}>
                                {row.status}
                            </span>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Table_
