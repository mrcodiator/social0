import axios from "axios";
import { useGlobalContext } from "./use-global"
import { toast } from "../components/ui/use-toast";
import { baseUrl } from "../lib/base-url";

export const useNotification = () => {
    const { loading, setLoading } = useGlobalContext();

    async function markSeen(id: string) {
        setLoading(true);
        try {
            const response = await axios.put(`${baseUrl}notify/${id}/seen`, id,
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

    async function markAllSeen() {
        setLoading(true);
        try {
            const response = await axios.put(`${baseUrl}notify/seen-all`, {},
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
        } finally {
            setLoading(false);
        }
    }

    return { markSeen, loading, markAllSeen }
}