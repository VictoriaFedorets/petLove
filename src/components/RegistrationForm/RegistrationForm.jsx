import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/user/userOperations.js";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import { selectIsLoading } from "../../redux/user/userSelectors.js";
import Title from "../Title/Title.jsx";
import Button from "../Button/Button.jsx";
// import Loader from "../Loader/Loader.jsx";

const emailRegEx = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .matches(emailRegEx, "Enter a valid email address"),

  password: Yup.string()
    .required("Password is required")
    .min(7, "Password must be at least 7 characters.")
    .matches(/^[^\s]*$/, "Password should not contain spaces.")
    // .max(64, "The password must be no longer than 64 characters")
    .test("is-secure", "Password is secure", (value) => {
      return value && value.length >= 7;
    }),
  //   confirmPassword: Yup.string()
  //     .oneOf([Yup.ref("password")], "Passwords must match")
  //     .required("Confirm password is required"),
  // });
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  // .test(
  //   "confirmPassword-test",
  //   "Confirm password invalid",
  //   (value, context) => {
  //     console.log("Confirm password:", value);
  //     console.log("Password field value:", context.parent.password);
  //     return value === context.parent.password;
  //   }
  // ),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isLoading = useSelector(selectIsLoading);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleSubmit = async (
    { name, email, password },
    { setSubmitting, resetForm, validateForm, setErrors }
  ) => {
    await validateForm();
    console.log("Form values:", { name, email, password });

    try {
      const data = await dispatch(registerUser({ name, email, password }));
      if (!data.error) {
        resetForm();
        navigate("/profile");
      } else if (
        data.payload &&
        data.payload.message === "Such email already exists"
      ) {
        setErrors({ email: "This email is already registered" });
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ errors, touched, setFieldValue, values, isValid }) => (
        <Form className={css.formRegister} autoComplete="off">
          <div className={css.form}>
            <Title>Registration</Title>
            <p className={css.description}>
              Thank you for your interest in our platform.
            </p>

            <label className={css.label}>
              <Field
                name="name"
                type="name"
                placeholder="Name"
                className={
                  errors.name && touched.name
                    ? `${css.input} ${css.inputError}`
                    : css.input
                }
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </label>

            <label className={css.label}>
              <div className={css.inputContainer}>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={
                    errors.email && touched.email
                      ? `${css.input} ${css.inputError}`
                      : css.input
                  }
                />
                {values.email.length > 0 && (
                  <svg
                    className={css.clearIcon}
                    width={16}
                    height={16}
                    onClick={(e) => {
                      e.preventDefault();
                      setFieldValue("email", "");
                    }}
                  >
                    <use href="#icon-close" />
                  </svg>
                )}
              </div>

              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </label>

            <label className={css.label}>
              <div className={css.inputContainer}>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`${css.input} ${
                    errors.password && touched.password
                      ? css.inputError
                      : !errors.password && touched.password
                      ? css.inputValid
                      : ""
                  }`}
                />
                {!errors.password && touched.password && values.password && (
                  <svg className={css.checkIcon}>
                    <use href="#icon-check" />
                  </svg>
                )}
                <svg
                  className={css.icon}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleShowPassword();
                  }}
                >
                  {showPassword ? (
                    <use href="#icon-eye" />
                  ) : (
                    <use href="#icon-eye-hidden" />
                  )}
                </svg>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />

              {!errors.password && touched.password && values.password && (
                <div className={css.passwordMessage}>Password is secure</div>
              )}
            </label>

            <label className={css.label}>
              <div className={css.inputContainer}>
                <Field
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? `${css.input} ${css.inputError}`
                      : css.input
                  }
                />

                <svg
                  className={css.icon}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleShowConfirmPassword();
                  }}
                >
                  {showConfirmPassword ? (
                    <use href="#icon-eye" />
                  ) : (
                    <use href="#icon-eye-off" />
                  )}
                </svg>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={css.error}
              />
            </label>

            <Button
              type="submit"
              className={css.btn}
              disabled={isLoading || !isValid}
            >
              {isLoading ? "Loading..." : "Registration"}
            </Button>

            <p className={css.endLink}>
              Already have an account?{" "}
              <Link className={css.link} to="/login">
                Login
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}
