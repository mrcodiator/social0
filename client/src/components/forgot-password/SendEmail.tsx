import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSendEmail } from '../../hooks/use-verification'


const SendEmail = () => {
    const { form, send, loading } = useSendEmail()
    return (
        <div>
            <CardHeader>
                <CardTitle>Send Email</CardTitle>
                <Separator className='h-2 w-11 bg-primary' />
                <CardDescription>Enter your email and we&apos;ll send you otp to verify.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(send)} className=" space-y-4">

                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        We&apos;ll never share your email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=' flex items-center gap-2'>
                            <Link to={"/sign-in"}>
                                <Button variant={"secondary"}>Back</Button>
                            </Link>

                            <Button type="submit" disabled={loading}>
                                {loading ? <><Loader2 className='h-4 w-4 mr-2' />wait...</>
                                    :
                                    <>Send</>
                                }
                            </Button>
                        </div>
                    </form>

                </Form>
            </CardContent>
        </div>
    )
}

export default SendEmail
