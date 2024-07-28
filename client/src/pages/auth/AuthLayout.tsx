
const AuthLayout = ({ children }: { children: React.ReactNode }) => {



    return (
        <div className="flex-1 h-full w-full flex flex-col items-center justify-center">
            <div className=" max-w-md w-full">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout
