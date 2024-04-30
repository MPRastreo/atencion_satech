import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/Components/ui/use-toast";
import { handlePost } from "@/utils/api-utils";
import { PlusCircleIcon } from "lucide-react";
import * as UIDialog from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import * as UIForm from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resolve } from "path";

const formSchema = z.object({
    category_id: z.number(),
    title: z.string({
        required_error: "El titulo es requerido",
        invalid_type_error: "El formato del titulo no es valido",
        message: "Ingresa el titulo del contenido"
    }).min(3, "El titulo debe tener al menos 3 caracteres"),
    description: z.string({
        required_error: "La descripción es requerida",
        message: "Ingresa la descripción del contenido"
    }).min(5).max(300),
})

const AddContent = () => {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category_id: "",
            title: "",
            description: ""
        },
    });

    const addRecord = async (values: z.infer<typeof formSchema>) => {
        try{

        }
    }
}
