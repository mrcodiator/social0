import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../hooks/use-global";

const SignOut = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const { setAuth } = useGlobalContext()


    const handleSignOut = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            localStorage.removeItem("token");
            setAuth(false);
        }
        navigate("/sign-in")
    }

    return (
        <div className="w-full h-full" onClick={handleSignOut}>
            {children}
        </div>
    )
}

export default SignOut
