import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { Loader2 } from 'lucide-react'
import { useUpdatePassword } from '../../hooks/use-verification'
import { Link } from 'react-router-dom'


const ChangePasswordForm = () => {
    const { form, update, loading } = useUpdatePassword()
    return (
        <div>
            <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <Separator className='h-2 w-11 bg-primary' />
                <CardDescription>Enter your email and we&apos;ll send you otp to verify.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(update)} className=" space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="********" type="password" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please Enter your password.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="********" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className=' flex items-center gap-2'>
                            <Link to={"/"}>
                                <Button variant={"secondary"}>Home</Button>
                            </Link>

                            <Button type="submit" disabled={loading}>
                                {loading ? <><Loader2 className='h-4 w-4 mr-2' />wait...</>
                                    :
                                    <>Submit</>
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </div>
    )
}
export default ChangePasswordForm
