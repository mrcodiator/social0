import { useState, useEffect } from "react";

export const useSkeleton = () => {
    const [initialLoading, setInitialLoading] = useState(true);
    useEffect(() => {
        setInitialLoading(true);
        setTimeout(() => {
            setInitialLoading(false);
        }, 2000);
    }, []);
    return { initialLoading, setInitialLoading };
}