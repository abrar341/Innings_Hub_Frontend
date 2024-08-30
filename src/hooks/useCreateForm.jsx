import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const useCreateForm = (validationSchema, onSubmitHandler) => {
    const [isOpen, setIsOpen] = useState(false);
    const [preview, setPreview] = useState(null);

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        await onSubmitHandler(data);
        resetForm();
        setIsOpen(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setValue("profilePicture", file);
            clearErrors("profilePicture");
        }
    };

    const resetForm = () => {
        reset();
        setPreview(null);
    };

    return {
        control,
        handleSubmit,
        errors,
        preview,
        isOpen,
        setIsOpen,
        handleFileChange,
        onSubmit,
        resetForm,
    };
};
