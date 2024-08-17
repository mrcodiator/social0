import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../schema/post.schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "../components/ui/use-toast";
import { useUpload } from "./use-upload";
import { baseUrl } from "../lib/base-url";
import { useGlobalContext } from "./use-global";
import { useState } from "react";



export const useCreatePost = () => {
    const { upload } = useUpload();
    const [loading, setLoading] = useState(false);
    const { setLoading: setGlobalLoading } = useGlobalContext();
    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            content: "",
            media: undefined
        },
    });

    async function create(values: z.infer<typeof postSchema>) {
        setLoading(true);
        setGlobalLoading(true);


        try {
            console.log({ values: values });

            const media = values.media ? await upload(values.media) : undefined;

            // console.log({ media: media });

            const data = { ...values, media };
            // const data = { ...values, media: "https://images.pexels.com/photos/8351272/pexels-photo-8351272.jpeg?auto=compress&cs=tinysrgb&w=800" };

            const response = await axios.post(`${baseUrl}post/create`, data, {
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

    async function deletePost(postId: string) {
        setLoading(true);
        setGlobalLoading(true);
        try {
            const response = await axios.delete(`${baseUrl + "post/" + postId + "/delete"}`, {
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

    return { form, create, loading, deletePost };
}