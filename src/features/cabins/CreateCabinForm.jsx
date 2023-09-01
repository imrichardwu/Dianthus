import styled from "styled-components";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins";
import {toast} from "react-hot-toast";
import {UseCreateCabin} from "./UseCreateCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import {useEditCabin} from "./useEditCabin";

function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
    const {id: editId, ...editValues} = cabinToEdit;
    const isEditSession = Boolean(editId);

    const {register, handleSubmit, reset, getValues, formState} = useForm({
        defaultValues: isEditSession ? editValues : {},
    });
    const {errors} = formState;

    const {isCreating, createCabin} = UseCreateCabin();

    const {isEditing, editCabin} = useEditCabin();

    const isWorking = isCreating || isEditing;

    function onSubmit(data) {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];

        if (isEditSession)
            editCabin(
                {newCabinData: {...data, image}, id: editId},
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        else createCabin({...data, image}, {onSuccess: () => reset()});
    }

    function onError(errors) {
        // console.log(errors);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register("name", {required: "This field is required"})}
                    disabled={isWorking}
                />
            </FormRow>
            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register("maxCapacity", {
                        required: "This filed is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>
            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register("regularPrice", {
                        required: "This filed is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>
            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isWorking}
                    defaultValue={0}
                    {...register("discount", {
                        required: "This filed is required",
                        validate: (value) =>
                            value <= getValues().regularPrice ||
                            "Discount should be less than regular price",
                    })}
                />
            </FormRow>
            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    disabled={isWorking}
                    defaultValue=""
                    {...register("description", {
                        required: "This filed is required",
                    })}
                />
            </FormRow>
            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "This filed is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    onClick={() => onCloseModal?.()}
                    type="reset"
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit Cabin" : "Create new cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
