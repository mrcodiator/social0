import axios from "axios"
import { useState } from "react"
import { baseUrl } from "../lib/base-url"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "../schema/auth.schema"
import { z } from "zod"
import { toast } from "../components/ui/use-toast"
import { useNavigate } from "react-router-dom"

export const useRegisterUser = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        },
    })

    async function register(values: z.infer<typeof signUpSchema>) {
        setLoading(true)
        try {
            const response = await axios.post(`${baseUrl}user/register`, values);
            console.log("response", response);

            const { success, message: responseMessage } = response.data;

            if (success) {
                toast({ title: responseMessage })
                navigate("/verify")
            } else {
                toast({ title: responseMessage, variant: "destructive" })
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // Type guard for AxiosError
                const errorMessage = err.response?.data?.message || "An error occurred.";
                console.log("error message: ", errorMessage);
                toast({ title: errorMessage, variant: "destructive" })
            } else {
                toast({ title: "An error occurred.", variant: "destructive" })
            }
        } finally {
            form.reset()
            setLoading(false);
        }
    }


    return { register, loading, form }
}

