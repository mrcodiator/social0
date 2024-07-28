import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { commentSchema } from "../schema/post.schema"
import { useGlobalContext } from "./use-global"
import { useState } from "react"
import axios from "axios"
import { baseUrl } from "../lib/base-url"
import { toast } from "../components/ui/use-toast"

export const usePostComments = (postId: string) => {
    const [loading, setLoading] = useState(false);
    const { setLoading: setGlobalLoading } = useGlobalContext()

    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            text: "",
        }
    })
    async function onSubmit(values: z.infer<typeof commentSchema>) {
        setLoading(true);
        setGlobalLoading(true);

        try {

            const response = await axios.put(`${baseUrl + "post/" + postId + "/comment/add"}`, values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const { success, message: responseMessage } = response.data;

            if (success) {
                // form.reset()
                toast({ title: responseMessage });
            } else {
                toast({ title: responseMessage, variant: "destructive" });
            }

        } catch (err) {
            if (axios.isAxiosError(err)) {
                // Type guard for AxiosError
                const errorMessage = err.response?.data?.message || "An error occurred.";
                toast({ title: errorMessage, variant: "destructive" })
            } else {
                toast({ title: "An error occurred.", variant: "destructive" })
            }
        } finally {
            form.reset()
            setLoading(false);
            setGlobalLoading(false);
        }

    }

    async function deleteComment(commentId: string) {
        setLoading(true);
        setGlobalLoading(true);
        try {
            const response = await axios.put(`${baseUrl + "post/" + postId + "/comment/delete"}`, { commentId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const { success, message: responseMessage } = response.data;
            if (success) {
                toast({ title: responseMessage });
            } else {
                toast({ title: responseMessage, variant: "destructive" });
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // Type guard for AxiosError
                const errorMessage = err.response?.data?.message || "An error occurred.";
                toast({ title: errorMessage, variant: "destructive" })
            } else {
                toast({ title: "An error occurred.", variant: "destructive" })
            }
        } finally {
            setLoading(false);
            setGlobalLoading(false);
        }
    }

    return {
        form,
        loading,
        onSubmit,
        deleteComment
    }
}