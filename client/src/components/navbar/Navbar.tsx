import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { ModeToggle } from "../ui/mode-toggle"
// import { jwtDecode } from "jwt-decode"
// import { useEffect } from "react"

const Navbar = () => {
    // const router = useNavigate();
    // const isTokenExpired = (token: string) => {
    //     if (!token) return true;
    //     try {
    //         const decodedToken = jwtDecode(token);
    //         const currentTime = Date.now() / 1000;
    //         if (decodedToken.exp) return decodedToken.exp < currentTime;
    //     } catch (error) {
    //         console.error('Error decoding token:', error);
    //         return true;
    //     }
    // };

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         const token = localStorage.getItem('token');


    //         if (!token) return;
    //         console.log(isTokenExpired(token));

    //         if (isTokenExpired(token)) {
    //             localStorage.removeItem('token');
    //             router('/sign-in');
    //         }
    //     } else {
    //         router('/sign-in');
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <div className=" sticky z-10 bg-background/20 backdrop-blur-lg top-0 border-b w-full">
            <header className="container px-5 py-3 w-full flex items-center justify-between gap-4">
                <Link to={"/"}><h1 className="text-2xl font-bold">Social0</h1></Link>

                <div className=" flex items-center gap-2">
                    <ModeToggle />

                    <Link to={"/sign-in"}>
                        <Button>
                            Login
                        </Button>
                    </Link>

                    <Link to={"/sign-up"}>
                        <Button variant={"outline"}>
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default Navbar
