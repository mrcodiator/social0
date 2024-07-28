import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "./components/ui/toaster";
import AuthLayout from "./pages/auth/AuthLayout";
import ForgotPasswordPage from "./pages/forgot-password/ForgotPasswordPage";
import NotFount from "./pages/404/NotFount";
import HomeLayout from "./pages/home/HomeLayout";
import SocialNavbar from "./components/navbar/SocialNavbar";
import CreatePostPage from "./pages/create-post/CreatePostPage";
import SettingsPage from "./pages/setting/SettingsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import FindUsers from "./components/display-users/FindUsers";
import NotificationComponent from "./components/notifications/NotificationComponent";
import PostPage from "./pages/post/PostPage";
import AuthNotFound from "./pages/404/AuthNotFound";
import AuthHomePage from "./pages/auth/AuthHomePage";
import HomePage from "./pages/home/HomePage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./lib/base-url";
import { useGlobalContext } from "./hooks/use-global";

const App = () => {
  const token = localStorage.getItem("token");

  const { setAuth, setUser, auth, loading } = useGlobalContext();

  useEffect(() => {
    if (token) {

      const fetchUser = async () => {
        try {
          const res = await axios.get(`${baseUrl}user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // console.log("Auth: ", res.data);


          if (res.data.success) {
            setAuth(true);
            setUser(res.data.data);
          } else {
            localStorage.removeItem("token");
            setAuth(false);
            setUser(undefined);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token");
          setAuth(false);
          setUser(undefined);
        }
      };

      fetchUser();
    } else {
      setAuth(false);
      setUser(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, auth, loading]);


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div className="min-h-dvh flex flex-col">
          {token ? <SocialNavbar /> : <Navbar />}

          <div className="flex-1 lg:px-10 h-full w-full mx-auto flex flex-col p-5">
            <Routes>
              <Route path="/verify" element={<AuthLayout children={<ForgotPasswordPage />} />} />
              {token ? (
                <>
                  <Route path="*" element={<NotFount />} />
                  <Route path="/" element={<HomeLayout children={<HomePage />} />} />
                  <Route path="/create-post" element={<HomeLayout children={<CreatePostPage />} />} />
                  <Route path="/settings" element={<HomeLayout children={<SettingsPage />} />} />
                  <Route path="/user/:username" element={<HomeLayout children={<ProfilePage />} />} />
                  <Route path="/find" element={<HomeLayout children={<FindUsers />} />} />
                  <Route path="/notifications" element={<HomeLayout children={<NotificationComponent />} />} />
                  <Route path="/post/:id" element={<PostPage />} />
                </>
              ) : (
                <>
                  <Route path="/sign-in" element={<AuthLayout children={<SignInPage />} />} />
                  <Route path="/sign-up" element={<AuthLayout children={<SignUpPage />} />} />
                  <Route path="/" element={<AuthHomePage />} />
                  <Route path="*" element={<AuthNotFound />} />
                </>
              )}
            </Routes>
          </div>

          <Toaster />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
