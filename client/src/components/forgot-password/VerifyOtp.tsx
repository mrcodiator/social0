import { Button } from "../ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "../ui/input-otp"
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { Loader2 } from "lucide-react"
import { useVerifyEmail } from "../../hooks/use-verification"


export default function VerifyOtp() {

    const { verify, form, loading, setStep } = useVerifyEmail()


    return (
        <div>
            <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <Separator className='h-2 w-11 bg-primary' />
                <CardDescription>Enter your email and we&apos;ll send you otp to verify.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(verify)} className=" space-y-4">
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>One-Time Password</FormLabel>
                                    <FormControl>
                                        <InputOTP className="w-full" maxLength={6} {...field}>
                                            <InputOTPGroup className=" w-full">
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription>
                                        Please enter the one-time password sent to your phone.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=' flex items-center gap-2'>
                            <Button onClick={() => setStep(1)} variant={"secondary"}>Resend</Button>

                            <Button type="submit" disabled={loading}>
                                {loading ? <><Loader2 className='h-4 w-4 mr-2' />wait...</>
                                    :
                                    <>Verify</>
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </div>
    )
}

