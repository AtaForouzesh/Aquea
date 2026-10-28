import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { useCreateUser } from "./useCreateUser";
import { useEditUser } from "./useEditUser";
import styled from "styled-components";
import FileInput from "../../ui/FileInput";
import { useState } from "react";

const StyledEditButton = styled.button`
  font-size: 1.2rem;
  font-weight: 500;
  color: #efeabb;
  background-color: #558467;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #446852;
  }
`;
const StyledCancelButton = styled.button`
  font-size: 1.2rem;
  font-weight: 500;
  color: #efeabb;
  background-color: #4b1426;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #3a0f1e;
  }
`;
const StyledSelect = styled.select`
  padding: 0.8rem 1.2rem;
  outline: none;
  border-radius: 6px;
  border: 1px solid #efeabb;
  background-color: #1b4d49;
  color: #efeabb;
  font-size: 1.4rem;
  &:hover {
    cursor: pointer;
  }
`;

const CreateUserForm = ({ userToEdit = {}, onCloseModal }) => {
  const { id: editId, ...editValue } = userToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });
  const { errors } = formState;
  const { isCreating, createUser } = useCreateUser();
  const { isEditing, editUser } = useEditUser();
  const isWorking = isEditing || isCreating;
  const [role, setRole] = useState(null);
  const onSubmit = (data) => {
    const avatar =
      typeof data.avatar === "string" ? data.avatar : data.avatar[0];
    if (isEditSession) {
      editUser(
        { newUserData: { ...data, avatar }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createUser(
        { ...data, avatar: avatar },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    }
  };
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Avatar" error={errors?.avatar?.message}>
        <FileInput
          type="file"
          id="avatar"
          disabled={isWorking}
          {...register("avatar")}
        />
      </FormRow>
      <FormRow label="FullName" error={errors?.full_name?.message}>
        <Input
          type="text"
          id="full_name"
          disabled={isWorking}
          {...register("full_name", { required: "FullName is Required" })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isWorking}
          {...register("email", {
            required: "Email is Required",
          })}
        />
      </FormRow>
      <FormRow label="Phone" error={errors?.phone?.message}>
        <Input
          type="tel"
          id="phone"
          disabled={isWorking}
          {...register("phone", {
            required: "Phone is Required",
          })}
        />
      </FormRow>
      <FormRow label="Role" error={errors?.role?.message}>
        <StyledSelect
          id="role"
          disabled={isWorking}
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
          {...register("role", { required: "Role is Required" })}
        >
          <option value="admin">Admin</option>
          <option value="host">Host</option>
          <option value="dealer">Dealer</option>
          <option value="advertiser">Advertiser</option>
          <option value="user">User</option>
        </StyledSelect>
      </FormRow>
      <FormRow>
        <StyledCancelButton
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </StyledCancelButton>
        <StyledEditButton type="submit" disabled={isWorking}>
          {isEditSession ? "Edit User" : "Create New User"}
        </StyledEditButton>
      </FormRow>
    </Form>
  );
};

export default CreateUserForm;
