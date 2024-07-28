import { useForgotPassword } from "../../hooks/use-forgot-password"
import { Card, CardFooter } from "../ui/card"
import ChangePasswordForm from "./ChangePasswordForm"
import SendEmail from "./SendEmail"
import VerifyOtp from "./VerifyOtp"

const ForgotPasswordComponent = () => {
    const { step } = useForgotPassword();

    return (
        <Card className=" border-none shadow-none">
            {step === 1 ?
                <SendEmail />
                :
                step === 2 ?
                    <VerifyOtp />
                    :
                    <ChangePasswordForm />
            }
            <CardFooter className=' w-full mt-10'>
                <div className=' grid grid-cols-3 gap-2 w-full'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div className={`${step === index + 1 ? "bg-primary" : "bg-secondary"}  h-2 w-full rounded-lg`} key={index}></div>
                    ))}
                </div>
            </CardFooter>
        </Card>
    )

}



export default ForgotPasswordComponent
