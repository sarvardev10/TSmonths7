import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, MenuItem, Select, TextField, FormControl, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { OrderValidationSchema } from "../../../utils/validation";
import order from "../../../service/order";
import service from "../../../service/service";
import { useMask } from "@react-input/mask";
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

export default function AddOrder({ open, handleClose }) {
  const initialValues = {
    amount: "",
    client_full_name: "",
    client_phone_number: "+998",
    service_id: "",
  };
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await service.get();
      if (response.status === 200 && response?.data?.services) {
        setData(response?.data?.services);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    const intValues = {
      ...values,
      amount: parseInt(values.amount, 10),
    };

    console.log("Yuborilayotgan qiymatlar: ", intValues);
    try {
      const response = await order.create(intValues);
      console.log("Javob: ", response);
      if (response.status === 201) {
        console.log("Buyurtma muvaffaqiyatli yaratildi!");
        window.location.reload();
      } else {
        console.log("Buyurtmani yaratishda xatolik. Status kodi: ", response.status);
      }
    } catch (error) {
      console.log("Buyurtmani yaratishda xatolik: ", error);
    }
    setSubmitting(false);
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
          Buyurtma ma‘lumotlari
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
                type="tel"
                as={TextField}
                label="Phone number"
                fullWidth
                margin="normal"
                // inputRef={inputRef}
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
                <Field
                  name="service_id"
                  as={Select}
                  label="Xizmat"
                >
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
                  {isSubmitting ? "Yuborilmoqda" : "Yaratish"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
