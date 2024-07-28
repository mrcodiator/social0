import axios from "axios";
import { toast } from "../components/ui/use-toast";
import { useGlobalContext } from "./use-global"
import { baseUrl } from "../lib/base-url";
import { useState } from "react";

export const useLike = (id: string) => {
    const [loading, setLoading] = useState(false)

    const { setLoading: setGlobalLoading } = useGlobalContext();

    async function like() {
        setLoading(true);
        setGlobalLoading(true);

        try {
            console.log(id);
            const response = await axios.put(`${baseUrl}post/${id}/like`, id,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                toast({ title: response.data.message });
                // setTimeout(() => setGlobalLoading(false), 2000)
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
            setLoading(false);
            setGlobalLoading(false);
        }
    }

    async function dislike() {
        setLoading(true);
        setGlobalLoading(true);

        try {
            console.log(id);
            const response = await axios.put(`${baseUrl}post/${id}/dislike`, id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                toast({ title: response.data.message })
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
            setLoading(false);
            setGlobalLoading(false);
        }
    }

    return {
        like,
        dislike,
        loading
    }

}