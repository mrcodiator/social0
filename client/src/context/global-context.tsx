import { createContext, useState, ReactNode } from "react";
import { User } from "../types/user.type";

export interface GlobalContextType {
    loading: boolean,
    auth: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>,
    user: User | undefined,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState<User | undefined>(undefined);

    return (
        <GlobalContext.Provider value={{ loading, auth, setLoading, setAuth, user, setUser }}>
            {children}
        </GlobalContext.Provider>
    );
};
