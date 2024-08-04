import axios from "axios"
import { useState } from "react"
import { baseUrl } from "../lib/base-url"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "../schema/auth.schema"
import { z } from "zod"
import { toast } from "../components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "./use-global"

export const useLoginUser = () => {
    const [loading, setLoading] = useState(false)
    const { setAuth } = useGlobalContext();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function login(values: z.infer<typeof signInSchema>) {
        // console.log(values);
        setLoading(true)

        try {
            const response = await axios.post(`${baseUrl}user/login`, values);

            const { success, message: responseMessage, data } = response.data;

            if (success) {
                toast({ title: responseMessage })
                localStorage.setItem("token", data.token)
                setAuth(true)
                navigate("/")
            } else {
                toast({ title: responseMessage, variant: "destructive" })
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // Type guard for AxiosError
                const errorMessage = err.response?.data?.message || "An error occurred.";
                console.log(err);


                if (errorMessage.includes("Please verify your account")) {
                    toast({ title: errorMessage, variant: "destructive" })
                    return navigate("/verify")
                }
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


    return { login, loading, form }
}

