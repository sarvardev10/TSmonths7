import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "../../service/index";
import { Notification } from "../../utils/index";
import {signInValidationSchema} from "../../utils/validation"
import {SignInModal} from "../../components/modal"

const Index = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (values) => {
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        localStorage.setItem("access_token", response?.data?.access_token);
        Notification({
          title: "Sign In Successfuly",
          type: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 2300);
      }
    } catch (error) {
      console.error(error);
      Notification({
        title: "Sign In Failed",
        type: "error",
      })
    }
  };
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <SignInModal open={open}/>
      <div className="h-screen flex-col flex items-center justify-center p-5">
        <h1 className="text-[35px] font-normal sm:text-[36px] md:text-[56px]">
          Sign In
        </h1>
        <div className="max-w-[600px]">
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signInValidationSchema}>
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email address"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-[red] text-[15px]"
                    />
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <p
                  className="mb-3 cursor-pointer hover:text-blue-500"
                  onClick={() => setOpen(true)}
                >
                  Forgot Password?
                </p>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ marginBottom: "8px" }}
                >
                  {isSubmitting ? "Signing" : "Sign In"}
                </Button>
                <span
                  onClick={() => navigate("/sign-up")}
                  className=" text-blue-300 cursor-pointer hover:text-blue-500"
                >
                  Sign Up
                </span>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Index;
