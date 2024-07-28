import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "../schema/auth.schema";
import { useEffect } from "react";
import { baseUrl } from "../lib/base-url";
import axios from "axios";
import { toast } from "../components/ui/use-toast";
import { useGlobalContext } from "./use-global";
import { useUpload } from "./use-upload";

export const useEditUserDetails = () => {
    // const [loading, setLoading] = useState(false);
    const { user, setLoading, loading } = useGlobalContext();
    const { upload } = useUpload();

    const defaultValues: z.infer<typeof editProfileSchema> = {
        name: "",
        username: "",
        bio: "",
        profession: "",
        location: "",
        logo: undefined,
    };

    const form = useForm<z.infer<typeof editProfileSchema>>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: defaultValues,
    });

    useEffect(() => {
        if (user) {
            form.reset(
                {
                    name: user.name,
                    username: user.username,
                    bio: user.bio,
                    profession: user.profession,
                    location: user.location,
                }
            )
        }
    }, [user, form]);




    async function edit(values: z.infer<typeof editProfileSchema>) {

        // console.log(values);


        try {
            setLoading(true)
            // console.log("formData", formData);
            const logo = values.logo ? await upload(values.logo) : user?.logo || undefined;
            const data = { ...values, logo };

            // console.log("SENDING DATA: ", data);


            const response = await axios.put(`${baseUrl}user/edit`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const { success, message: responseMessage } = response.data;

            if (success) {
                // form.reset()
                toast({ title: responseMessage });
            } else {
                toast({ title: responseMessage, variant: "destructive" });
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message || "An error occurred.";
                console.log("error message: ", errorMessage);
                toast({ title: errorMessage, variant: "destructive" });
            } else {
                toast({ title: "An error occurred.", variant: "destructive" });
            }
        } finally {
            setLoading(false);
        }
    }



    return { form, edit, loading };
};

