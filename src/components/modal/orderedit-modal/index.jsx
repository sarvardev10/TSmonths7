// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { Button, TextField } from "@mui/material";
// import { useState } from "react";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import { OrderValidationSchema } from "../../../utils/validation";
// import service from "../../../service/service";


// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   borderRadius: 1.3,
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #fff",
//   boxShadow: 24,
//   p: 3,
//   outline: "none",
// };

// export default function AddService() {
//     const initialValues = {
//         amount: "",
//         client_full_name: "",
//         client_phone_number: "+998",
//         service_id: "",
//       };

//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleSubmit = async (values) => {
//     if (item) {
//       const payload = {id: item.id, ...values}
//     }
//     try {
//       const responce = await service.update(values);
//       if(responce.status === 201){
//         window.location.reload()
//       }
      
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <Button onClick={handleOpen} variant="contained">
//         Add Service
//       </Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <div>
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               Edit Order
//             </Typography>
//             <Formik
//           initialValues={initialValues}
//           onSubmit={handleSubmit}
//           validationSchema={OrderValidationSchema}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <Field
//                 name="amount"
//                 type="number"
//                 as={TextField}
//                 label="Nechta kerak"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 helperText={
//                   <ErrorMessage
//                     name="amount"
//                     component="span"
//                     className="text-[red] text-[15px]"
//                   />
//                 }
//               />
//               <Field
//                 name="client_full_name"
//                 type="text"
//                 as={TextField}
//                 label="Mijoz ism sharifi"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 helperText={
//                   <ErrorMessage
//                     name="client_full_name"
//                     component="span"
//                     className="text-[red] text-[15px]"
//                   />
//                 }
//               />
//               <Field
//                 name="client_phone_number"
//                 type="text"
//                 as={TextField}
//                 label="Telefon raqami"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 helperText={
//                   <ErrorMessage
//                     name="client_phone_number"
//                     component="span"
//                     className="text-[red] text-[15px]"
//                   />
//                 }
//               />
//               <FormControl fullWidth margin="normal" variant="outlined">
//                 <InputLabel>Xizmatlar</InputLabel>
//                 <Field
//                   name="service_id"
//                   as={Select}
//                   label="Xizmat"
//                 >
//                   {data.map((item, index) => (
//                     <MenuItem key={index} value={item.id}>
//                       {item.name}
//                     </MenuItem>
//                   ))}
//                 </Field>
//                 <ErrorMessage
//                   name="service_id"
//                   component="p"
//                   className="text-[red] text-[15px]"
//                 />
//               </FormControl>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "end",
//                   gap: "12px",
//                   marginTop: "5px",
//                 }}
//               >
//                 <Button
//                   onClick={handleClose}
//                   type="button"
//                   variant="contained"
//                   color="warning"
//                 >
//                   Chiqish
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="success"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Yuborilmoqda" : "Yaratish"}
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//           </div>
//         </Box>
//       </Modal>
//     </div>
//   );
// }



import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"; // Added imports for FormControl, InputLabel, Select, MenuItem
import { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { OrderValidationSchema } from "../../../utils/validation";
import service from "../../../service/service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: 1.3,
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 3,
  outline: "none",
};

export default function AddService({ item }) { // Accept item as a prop for edit functionality
  const initialValues = {
    amount: item ? item.amount : "",
    client_full_name: item ? item.client_full_name : "",
    client_phone_number: item ? item.client_phone_number : "+998",
    service_id: item ? item.service_id : "",
  };

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]); // Added state for service data

  useEffect(() => {
    // Fetch service data
    const fetchData = async () => {
      try {
        const response = await service.getServices(); // Adjust the service method as per your API
        setData(response.data.services);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (values) => {
    try {
      let response;
      if (item) {
        // Update existing item
        response = await service.update({ id: item.id, ...values });
      } else {
        // Create new item
        response = await service.create(values);
      }

      if (response.status === 201 || response.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Add Service
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {item ? "Edit Order" : "Add Order"} {/* Dynamic title */}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={OrderValidationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="amount"
                  type="number"
                  as={TextField}
                  label="Nechta kerak"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="amount"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="client_full_name"
                  type="text"
                  as={TextField}
                  label="Mijoz ism sharifi"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="client_full_name"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="client_phone_number"
                  type="text"
                  as={TextField}
                  label="Telefon raqami"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="client_phone_number"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Xizmatlar</InputLabel>
                  <Field name="service_id" as={Select} label="Xizmat">
                    {data.map((item, index) => (
                      <MenuItem key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="service_id"
                    component="p"
                    className="text-[red] text-[15px]"
                  />
                </FormControl>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "12px",
                    marginTop: "5px",
                  }}
                >
                  <Button
                    onClick={handleClose}
                    type="button"
                    variant="contained"
                    color="warning"
                  >
                    Chiqish
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Yuborilmoqda" : item ? "Yangilash" : "Yaratish"} {/* Dynamic button text */}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
