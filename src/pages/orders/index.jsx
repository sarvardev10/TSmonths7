// import Pagination from '@mui/material/Pagination';
// import AddOrder from "../../components/modal/order-modal";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import order from "../../service/order";
// import { useEffect, useState } from "react";
// import { Button } from "@mui/material";
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const Index = () => {
//   const [open, setOpen] = useState(false);
//   const [count, setCount] = useState(0);
//   const [params, setParams] = useState({
//     limit: 5,
//     page: 1,
//     name: ""

//   });

//   const [data, setData] = useState([]);
//   const getData = async () => {
//     try {
//       const response = await order.get(params);
//       console.log(response?.data?.orders_list?.client_id);
//       if (response.status === 200 && response?.data?.orders_list) {
//         setData(response.data.orders_list);
//         let total = Math.ceil(response?.data?.total / params.limit)
//         setCount(total);
//       }
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [params]);

//   const deleteItem = async (id) => {
//     console.log(`Deleting item with id: ${id}`);
//     try {
//       const response = await order.delete(id);
//       console.log(response);
//       if (response.status === 200) {
//         getData();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleChange = (event, value) => {
//     setParams((prevParams) => ({
//       ...prevParams,
//       page: value
//     }));
//   };
//   const handleInputChange = (e) => {
//     console.log(e.target.value);
//     setParams({
//       ...params,
//       name: e.target.value
//     })
//   }
//   return (
//     <div>
//       <div className="flex w-full justify-between items-center mb-6">
//         <h1 className="text-2xl">Buyurtmalar</h1>
//         <div className='flex gap-5 ' >
//           <TextField id="outlined-search" label="Search field" type="search" onChange={handleInputChange} />
//           <Button
//             onClick={() => setOpen(true)}
//             variant="contained"
//           >
//             Buyurtma yaratish
//           </Button>
//           <AddOrder open={open} handleClose={handleClose} />

//         </div>
//       </div>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell></StyledTableCell>
//               <StyledTableCell>Miqdori</StyledTableCell>
//               <StyledTableCell>Ism Sharifi</StyledTableCell>
//               <StyledTableCell align="right">Telefon raqami</StyledTableCell>
//               <StyledTableCell align="right">Xizmat ID</StyledTableCell>
//               <StyledTableCell align="right">Action</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data &&
//               data.map((row) => (
//                 <StyledTableRow key={row.id}>
//                   <StyledTableCell align="right">
//                     <form>
//                       <input type="checkbox" />
//                     </form>
//                   </StyledTableCell>
//                   <StyledTableCell>{row.amount}</StyledTableCell>
//                   <StyledTableCell>{row.client_name}</StyledTableCell>
//                   <StyledTableCell align="right">{row.client_phone_number}</StyledTableCell>
//                   <StyledTableCell align="right">{row.status}</StyledTableCell>
//                   <StyledTableCell align="right">
//                     <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
//                       <DeleteIcon
//                         style={{ cursor: "pointer" }}
//                         onClick={() => deleteItem(row.id)}
//                       />
//                       <EditIcon
//                         style={{ cursor: "pointer" }}
//                         onClick={() => editItem(row)}
//                       />
//                     </div>
//                   </StyledTableCell>
//                 </StyledTableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Pagination count={count} page={params.page} onChange={handleChange} />
//     </div>
//   );
// };

// export default Index;



import Pagination from '@mui/material/Pagination';
import AddOrder from "../../components/modal/order-modal";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import order from "../../service/order";
import { useEffect, useState } from "react";
import { Button, Box, TextField } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Index = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState({
    limit: 5,
    page: 1,
    name: ""
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await order.get(params);
      if (response.status === 200 && response?.data?.orders_list) {
        setData(response.data.orders_list);
        let total = Math.ceil(response?.data?.total / params.limit);
        setCount(total);
      } else {
        setError("Failed to fetch data.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);

  const deleteItem = async (id) => {
    console.log(`Deleting item with id: ${id}`);
    try {
      const response = await order.delete(id);
      if (response.status === 200) {
        getData();
      } else {
        setError("Failed to delete item.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while deleting item.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(null);
  };

  const handleChange = (event, value) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: value
    }));
  };

  const handleInputChange = (e) => {
    setParams({
      ...params,
      name: e.target.value
    });
  };

  const editItem = (row) => {
    setEdit(row);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-6">
        <h1 className="text-2xl">Buyurtmalar</h1>
        <div className="flex gap-5">
          <TextField id="outlined-search" label="Search field" type="search" onChange={handleInputChange} />
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
          >
            Buyurtma yaratish
          </Button>
          <AddOrder open={open} handleClose={handleClose} order={edit} />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Miqdori</StyledTableCell>
                <StyledTableCell>Ism Sharifi</StyledTableCell>
                <StyledTableCell align="right">Telefon raqami</StyledTableCell>
                <StyledTableCell align="right">Xizmat ID</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="right">
                      <form>
                        <input type="checkbox" />
                      </form>
                    </StyledTableCell>
                    <StyledTableCell>{row.amount}</StyledTableCell>
                    <StyledTableCell>{row.client_name}</StyledTableCell>
                    <StyledTableCell align="right">{row.client_phone_number}</StyledTableCell>
                    <StyledTableCell align="right">{row.status}</StyledTableCell>
                    <StyledTableCell align="right">
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                        <DeleteIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteItem(row.id)}
                        />
                        <EditIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => editItem(row)}
                        />
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Pagination count={count} page={params.page} onChange={handleChange} />
    </div>
  );
};

export default Index;
