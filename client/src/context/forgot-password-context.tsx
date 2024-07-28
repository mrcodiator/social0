import { createContext, useState } from "react";

export interface ForgotPasswordContextType {
    step: number
    setStep: (step: number) => void
}

export const ForgotPasswordContext = createContext<ForgotPasswordContextType>(null!)

export function ForgotPasswordContextProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [step, setStep] = useState(1);

    return (
        <ForgotPasswordContext.Provider
            value={{
                step,
                setStep
            }}
        >
            {children}
        </ForgotPasswordContext.Provider>
    )
}