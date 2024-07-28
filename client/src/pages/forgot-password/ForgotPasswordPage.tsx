import ForgotPasswordComponent from "../../components/forgot-password/ForgotPasswordComponent"
import { ForgotPasswordContextProvider } from "../../context/forgot-password-context"

const ForgotPasswordPage = () => {
    return (
        <ForgotPasswordContextProvider>
            <ForgotPasswordComponent />
        </ForgotPasswordContextProvider>
    )
}

export default ForgotPasswordPage
