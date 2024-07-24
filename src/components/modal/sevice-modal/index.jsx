import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ServiceValidationSchema } from "../../../utils/validation";
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

export default function EditService({ row, open, handleClose }) {
  const initialValues = {
    name: row.name || "",
    price: row.price || 0,
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const data = {
      id: row?.id,
      ...values,
    };
    try {
      if (row.id) {
        const response = await service.update(data);
        if (response.status === 200) {
          window.location.reload();
        }
      } else {
        const response = await service.add(values);
        if (response.status === 201) {
          window.location.reload();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {row.id ? "Edit Service" : "Add Service"}
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={ServiceValidationSchema}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="name"
                type="text"
                as={TextField}
                label="Service Name"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Field
                name="price"
                type="number"
                as={TextField}
                label="Service Price"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="price"
                    component="span"
                    className="text-[red] text-[15px]"
                  />
                }
              />
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
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={isSubmitting}
                >
                  {row.id ? "Update" : "Add"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
