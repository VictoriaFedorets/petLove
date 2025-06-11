import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button.jsx";
import Title from "../Title/Title";
import {
  selectError,
  selectIsLoading,
} from "../../redux/user/userSelectors.js";
import css from "./LoginForm.module.css";
import { loginUser } from "../../redux/user/userOperations.js";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Incorrect email")
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+.)+[a-zA-Z]{2,7}$/, "Incorrect email")
    .required("Required field"),
  password: yup
    .string()
    .min(7, "Password must be at least 7 characters")
    .required("Required field"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  //   const error = useSelector(selectError);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const emailValue = watch("email"); // Слідкуємо за полем email

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const clearEmail = () => {
    setValue("email", "");
  };

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/profile");
    } catch (error) {
      toast.error(error || "Login failed. Please try again.", {
        duration: 3000,
      });
    }
  };
  useEffect(() => {
    // Сохраняем иконку видимости пароля в зависимости от состояния showPassword
    const passwordInput = document.querySelector("input[type='password']");
    if (passwordInput) {
      passwordInput.type = showPassword ? "text" : "password";
    }
  }, [showPassword]);

  return (
    <form className={css.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.loginWrap}>
        <Title>Log in</Title>
        <p className={css.description}>
          Welcome! Please enter your credentials to login to the platform:
        </p>

        <div className={css.wrapper}>
          <input
            className={`${css.loginInput} ${
              errors.email ? css.errorLogin : ""
            }`}
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email")}
          />
          {emailValue && (
            <svg className={css.clearIcon} onClick={clearEmail}>
              <use href="#icon-close" />
            </svg>
          )}
          {errors.email && (
            <p className={css.loginError}>{errors.email.message}</p>
          )}
        </div>

        <div className={css.wrapper}>
          <input
            className={`${css.loginInput} ${
              errors.email ? css.errorPassword : ""
            }`}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register("password")}
          />
          <svg
            className={css.iconEye}
            onClick={(e) => {
              e.preventDefault();
              togglePasswordVisibility();
            }}
          >
            <use href={`#${showPassword ? "icon-eye" : "icon-eye-off"}`}></use>
          </svg>
          {errors.password && (
            <p className={css.loginError}>{errors.password.message}</p>
          )}
        </div>

        <Button className={css.btn} type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Log in"}
        </Button>

        <p className={css.textLink}>
          Don’t have an account?{" "}
          <Link className={css.link} to="/register">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}
