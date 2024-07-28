
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useCreatePost } from "../../hooks/use-create-post";
import { Loader2 } from "lucide-react";


const CreatePostComponent = () => {
    const { form, create, loading } = useCreatePost();


    return (
        <Card>
            <CardHeader>
                <CardTitle>Create Post</CardTitle>
                <Separator className="h-2 w-11 bg-primary" />
                <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, ex.</CardDescription>
            </CardHeader>

            <CardContent>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(create)} className="space-y-8">

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Post Text</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write your post here..." {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Share your thoughts with the community.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="media"
                            render={({ field }) => (

                                <FormItem>
                                    <FormLabel>Upload Media</FormLabel>
                                    <FormControl>
                                        <Input type="file" placeholder="shadcn" onChange={(e) => {
                                            const target = e.target as HTMLInputElement;
                                            const file = target.files?.[0] || null;
                                            field.onChange(file);
                                        }} />
                                    </FormControl>
                                    <FormDescription>
                                        Upload an image or video to accompany your post.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />

                        <Button type="submit" disabled={loading}>
                            {loading ?
                                <>
                                    <Loader2 className="h-4 w-4 mr-2" /> waiting...
                                </>
                                : "create"
                            }

                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CreatePostComponent;
