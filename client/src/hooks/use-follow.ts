import axios from "axios";
import { useGlobalContext } from "./use-global"
import { baseUrl } from "../lib/base-url";
import { toast } from "../components/ui/use-toast";

export const useFollowHook = (id: string) => {
    const { loading, setLoading } = useGlobalContext();
    async function follow() {
        setLoading(true);

        try {
            console.log(id);
            const response = await axios.put(`${baseUrl}user/${id}/follow`, id,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                toast({ title: response.data.message });
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
        }
    }

    async function unfollow() {
        setLoading(true);

        try {
            console.log(id);
            const response = await axios.put(`${baseUrl}user/${id}/unfollow`, id, {
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
        }
    }

    return {
        follow,
        unfollow,
        loading
    }
}