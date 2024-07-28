import axios from "axios";
import { baseUrl } from "../lib/base-url";
import { useState } from "react";

export const useCheckUsername = () => {
    const [loading, setLoading] = useState(false)
    const [isAvailable, setIsAvailable] = useState(false)

    const checkUsername = async (name: string) => {
        setLoading(true);
        // add a delay of 3 seconds
        await new Promise(resolve => setTimeout(resolve, 3000));

        if (!name) {
            setIsAvailable(false)
            return
        }

        try {
            const response = await axios.get(baseUrl + "user/check-username/" + name)
            const { success, data } = response.data

            if (success) {
                setIsAvailable(true)
                return data
            } else {
                setIsAvailable(false);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // Type guard for AxiosError
                const errorMessage = err.response?.data?.message || "An error occurred."
                console.log(errorMessage);

                setIsAvailable(false)
            } else {
                // Handle unexpected errors
                setIsAvailable(false);
            }
        } finally {
            setLoading(false)
        }
    }

    return { checkUsername, loading, isAvailable }
}
