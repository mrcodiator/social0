import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "../components/ui/use-toast"; // Adjust this import based on your project structure
import { baseUrl } from "../lib/base-url";
import { useGlobalContext } from "./use-global";
// import { useNavigate } from "react-router-dom";

interface FetchDataResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

interface UseFetchDataResponse<T> {
    data: T | null;
    loading: boolean;
    error: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setData: React.Dispatch<React.SetStateAction<T | null>>;
    refetch: () => void;
}

export const useFetchData = <T = unknown>(url: string | undefined): UseFetchDataResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Initially set loading to true
    const { loading: globalLoading, setAuth } = useGlobalContext();
    // const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        setLoading(true);

        try {
            const response = await axios.get<FetchDataResponse<T>>(baseUrl + url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                // console.log("response.data.data", response.data.data);

                setData(response.data.data);
            } else {
                setError(true);
                toast({ title: response.data.message || "Data fetch unsuccessful.", variant: "destructive" });
            }
        } catch (err) {
            setError(true);
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    toast({ title: "Unauthorized. Please login.", variant: "destructive" });
                    setAuth(false);
                    localStorage.removeItem("token");
                }
                const errorMessage = err.response?.data?.message || "An error occurred.";
                toast({ title: errorMessage, variant: "destructive" });
            } else {
                toast({ title: "An error occurred.", variant: "destructive" });
            }
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    useEffect(() => {
        if (!url) return;
        fetchData();
    }, [url, fetchData, globalLoading]);

    return { data, loading, setData, setLoading, error, refetch: fetchData };
};

