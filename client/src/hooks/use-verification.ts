import { useState } from "react";
import { useForgotPassword } from "./use-forgot-password";
import { forgotPasswordSchema, sendEmailSchema, verifyOtpSchema } from "../schema/auth.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../components/ui/use-toast";
import axios from "axios";
import { baseUrl } from "../lib/base-url";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./use-global";

import emailjs from '@emailjs/browser';

export async function sendEmailWithEmailJS({ email, code }: { email: string, code: string }) {
    try {

        const templateParams = {
            email: email,
            message: `Your verification code is ${code}`,
        };


        const response = await emailjs.send(
            process.env.REACT_APP_PUBLIC_SERVICE_ID || "",
            process.env.REACT_APP_PUBLIC_TEMPLATE_ID || "",
            templateParams,
            {
                publicKey: process.env.REACT_APP_PUBLIC_KEY || "",
                // privateKey: process.env.PRIVATE_KEY || "",
            }
        );

        console.log('SUCCESS!', response.status, response.text);
        return true;
    } catch (err) {
        console.log('FAILED...', err);
        return false;
    }
}
export const useSendEmail = () => {
    const { setStep } = useForgotPassword();
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof sendEmailSchema>>({
        resolver: zodResolver(sendEmailSchema),
        defaultValues: {
            email: ""
        }
    })

    async function send(values: z.infer<typeof sendEmailSchema>) {
        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}user/send-otp`, values);
            console.log("response", response);

            const { success, message: responseMessage, data } = response.data;

            if (success) {
                // toast({ title: responseMessage, description: data.otp })
                sendEmailWithEmailJS({ email: values.email, code: data.otp })
                setStep(2)
                return data;
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

    return { form, send, loading }

}

export const useVerifyEmail = () => {
    const { setStep } = useForgotPassword();
    const [loading, setLoading] = useState(false)
    const { setAuth } = useGlobalContext()

    const form = useForm<z.infer<typeof verifyOtpSchema>>({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: {
            otp: "",
        },
    })

    async function verify(values: z.infer<typeof verifyOtpSchema>) {
        setLoading(true);
        // console.log(values);

        try {
            const response = await axios.post(`${baseUrl}user/verify-otp`, values);
            // console.log("response", response);

            const { success, message: responseMessage, data } = response.data;

            if (success) {
                toast({ title: responseMessage })
                localStorage.setItem("token", data.token)
                setAuth(true);
                setStep(3)
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

    return { form, verify, loading, setStep }
}

export const useUpdatePassword = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    })
    async function update(values: z.infer<typeof forgotPasswordSchema>) {
        setLoading(true);
        // console.log(values);

        try {
            const response = await axios.post(`${baseUrl}user/change-password`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("response", response);

            const { success, message } = response.data;

            if (success) {
                toast({ title: message })
                navigate("/")
            } else {
                toast({ title: message, variant: "destructive" })
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

    return { form, update, loading }
}
