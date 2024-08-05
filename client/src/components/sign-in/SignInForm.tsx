
import { Button } from "../ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form"
import { Input } from "../ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Link } from "react-router-dom"
import { Separator } from "../ui/separator"
import { useLoginUser } from "../../hooks/use-login"
import { Loader2 } from "lucide-react"



const SignInForm = () => {
    const { form, login, loading } = useLoginUser()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <Separator className="h-2 bg-primary w-11" />
                <CardDescription>Don't  have an account?

                    <Link to={"/sign-up"}>
                        <Button variant={"link"} size={"sm"}>Sign Up</Button>
                    </Link>
                </CardDescription>
            </CardHeader>
            <CardContent>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(login)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@gmail.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please Enter your Email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className=" flex items-center gap-2 justify-between">
                                        <FormLabel>Password</FormLabel>
                                        <Link to={"/verify"}>
                                            <Button type="button" variant={"link"} size={"sm"}>Forgot Password?</Button>
                                        </Link>
                                    </div>
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
                        <Button type="submit" disabled={loading}>
                            {loading ?
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> waiting...
                                </>
                                : "Sign In"
                            }

                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SignInForm
