import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import Loader from "./components/Loader/Loader.jsx";
import SharedLayout from "./components/SharedLayout/SharedLayout.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import RestrictedRoute from "./components/Routes/RestrictedRoute.jsx";
import PrivateRoute from "./components/Routes/PrivateRoute.jsx";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/user/userOperations.js";
import { setAuthToken } from "./services/apiOperations.js";
import { selectToken } from "./redux/user/userSelectors.js";

// const MainPage = lazy(() => import("./pages/MainPage/MainPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const NewsPage = lazy(() => import("./pages/NewsPage/NewsPage.jsx"));
const NoticesPage = lazy(() => import("./pages/NoticesPage/NoticesPage.jsx"));
const FriendsPage = lazy(() => import("./pages/FriendsPage/FriendsPage.jsx"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage.jsx")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage.jsx"));
const AddPetPage = lazy(() => import("./pages/AddPetPage/AddPetPage.jsx"));
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);
const savedToken = localStorage.getItem("token");
if (savedToken) {
  setAuthToken(savedToken);
}

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      dispatch(refreshUser());
    }
  }, [token, dispatch]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />
      <Suspense
        fallback={<div>Loading...</div>}
        // fallback={<Loader />}
      >
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            {/* <Route index element={<MainPage />} /> */}
            <Route index element={<HomePage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="notices" element={<NoticesPage />} />
            <Route path="friends" element={<FriendsPage />} />

            <Route
              path="login"
              element={
                <RestrictedRoute
                  component={<LoginPage />}
                  redirectTo="/profile"
                />
              }
            />
            <Route
              path="register"
              element={
                <RestrictedRoute
                  component={<RegistrationPage />}
                  redirectTo="/profile"
                />
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute component={<ProfilePage />} redirectTo="/login" />
              }
            />

            <Route
              path="add-pet"
              element={
                <PrivateRoute component={<AddPetPage />} redirectTo="/login" />
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
