import { useContext } from "react";
import { ForgotPasswordContext } from "../context/forgot-password-context";

export const useForgotPassword = () => {
    const context = useContext(ForgotPasswordContext);

    if (context === undefined) {
        throw new Error(
            "useForgotPassword must be used within a ForgotPasswordProvider"
        );
    }

    return context;
};
