import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";
import { Country, getCountries } from "../../helper/get-countries";
import { useEditUserDetails } from "../../hooks/use-settings";
import { Loader2 } from "lucide-react";
import { getProfessions, Profession } from "../../helper/get-professions";


const EditUserDetails = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const { form, edit, loading } = useEditUserDetails();
    const professions = getProfessions;



    useEffect(() => {
        const fetchCountries = async () => {
            const countriesList = await getCountries();
            setCountries(countriesList);
        };
        fetchCountries();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit User Details</CardTitle>
                <Separator className="h-2 w-11 bg-primary" />
                <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, ex.</CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(edit)} className="space-y-6">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
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
                                        <Input placeholder="Enter your username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter your bio" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="profession"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profession</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a profession" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {professions.map((profession: Profession, index: number) => (
                                                <SelectItem key={index} value={profession.name}>{profession.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {countries && countries.length > 0 &&


                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a location" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {countries.map((country, index) => (
                                                    <SelectItem key={index} value={country.name}>
                                                        {country.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        }

                        <FormField
                            control={form.control}
                            name="logo"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Logo</FormLabel>
                                        <FormControl>
                                            <Input type="file" placeholder="shadcn" onChange={(e) => {
                                                const target = e.target as HTMLInputElement;
                                                const file = target.files?.[0] || null;
                                                field.onChange(file);
                                            }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <Button type="submit" disabled={loading}>
                            {loading ?
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> waiting...
                                </>
                                : "Update"
                            }
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card >
    );
};

export default EditUserDetails;



