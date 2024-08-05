
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
import { Checkbox } from "../ui/checkbox"
import { useRegisterUser } from "../../hooks/use-register"
import { CheckCircle, Loader2, X } from "lucide-react"
import { useCheckUsername } from "../../hooks/use-check-username"



const SignUpForm = () => {
    const { form, register, loading } = useRegisterUser();
    const { checkUsername, loading: checkUsernameLoading, isAvailable } = useCheckUsername();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <Separator className="h-2 bg-primary w-11" />
                <CardDescription>
                    Already have an account?
                    <Link to={"/sign-in"}>
                        <Button variant={"link"} size={"sm"}>Sign In</Button>
                    </Link>
                </CardDescription>
            </CardHeader>
            <CardContent>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(register)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                checkUsername(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    <div>
                                        {checkUsernameLoading && field.value.length > 0 ? (
                                            <div className=" text-sm text-muted-foreground flex items-center gap-2">checking ...
                                                <Loader2 className="animate-spin h-5 w-5 text-green-500" />
                                            </div>
                                        ) : isAvailable ? (
                                            <div className=" text-sm text-muted-foreground flex items-center gap-2">
                                                username available <CheckCircle className="h-5 w-5 text-green-500" />
                                            </div>
                                        ) : field.value.length > 0 && (
                                            <div className=" text-sm text-muted-foreground flex items-center gap-2">
                                                username not available <X className="h-5 w-5 text-red-500" />
                                            </div>
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="********" type="password" {...field} />
                                    </FormControl>
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
                        <FormField
                            control={form.control}
                            name="termAndConditions"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />

                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormDescription>
                                            I agree to the <Link to={"/"} className="underline">terms and conditions</Link>
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={loading}>
                            {loading ?
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> waiting...
                                </>
                                : "Sign Up"
                            }

                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SignUpForm;
