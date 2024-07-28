import { useState } from "react";
import { baseUrl } from "../lib/base-url";
import axios from "axios";
import { toast } from "../components/ui/use-toast";

export const useUpload = () => {
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState<string | null>(null)
    async function upload(file: File) {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post(`${baseUrl}upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.data.success) {
                // console.log("URL: ", response.data);

                // toast({ title: response.data.message })
                setUrl(response.data.data.url)
                return response.data.data.url as string;
            } else {
                toast({ title: response.data.message, variant: "destructive" })
                return null
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
        }
        finally {
            setLoading(false)
        }
    }

    return { upload, loading, url };
}