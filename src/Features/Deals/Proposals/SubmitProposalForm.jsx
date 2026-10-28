import { useForm } from "react-hook-form";
import Form from "../../../ui/Form";
import { useCreateProposal } from "./useCreateProposal";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import FileInput from "../../../ui/FileInput";
import styled from "styled-components";

const SubmitButton = styled.button`
  font-size: 20px;
  font-weight: 500;
  color: #efeabb;
  background-color: #558467;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  transition: all 0.3s linear;

  &:hover {
    cursor: pointer;
    background-color: #446852;
  }
`;
const CancelButton = styled.button`
  font-size: 20px;
  font-weight: 500;
  color: #efeabb;
  background-color: #4b1426;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  transition: all 0.3s linear;
  &:hover {
    cursor: pointer;
    background-color: #3a0f1e;
  }
`;

const SubmitProposalForm = ({ dealId, onCloseModal }) => {
  const { reset, handleSubmit, register, formState } = useForm();
  const { errors } = formState;
  const { isCreatingProposal, createProposal } = useCreateProposal();

  const onSubmit = (data) => {
    createProposal(
      {
        dealId,
        description: data.description,
        file: data.file_url?.[0],
        bidAmount: data.bid_amount,
        estimatedTime: data.estimated_time,
      },
      {
        onSuccess: () => {
          onCloseModal?.();
          reset();
        },
      },
    );
  };
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          placeholder="Enter your name"
          disabled={isCreatingProposal}
          {...register("name", { required: "Name is Required" })}
        />
      </FormRow>
      <FormRow label="Description" error={errors?.description?.message}>
        <Input
          type="text"
          id="description"
          placeholder="Explain what you can do with this proposal"
          disabled={isCreatingProposal}
          {...register("description", {
            required: "Explanation is Required",
          })}
        />
      </FormRow>
      <FormRow label="Bid Amount" error={errors?.bid_amount?.message}>
        <Input
          type="text"
          id="bid_amount"
          placeholder="Enter your bid"
          disabled={isCreatingProposal}
          {...register("bid_amount", {
            required: "Bid Amount is Required",
          })}
        />
      </FormRow>
      <FormRow label="Estimated Time" error={errors?.estimated_time?.message}>
        <Input
          type="text"
          id="estimated_time"
          placeholder="Enter how long it takes to finish"
          {...register("estimated_time", {
            required: "Estimated Time is Required",
          })}
        />
      </FormRow>
      <FormRow label="File" error={errors?.file_url?.message}>
        <FileInput
          type="file"
          id="file"
          disabled={isCreatingProposal}
          {...register("file_url")}
        />
      </FormRow>
      <FormRow>
        <CancelButton
          type="reset"
          disabled={isCreatingProposal}
          onClick={() => {
            onCloseModal?.();
          }}
        >
          Cancel
        </CancelButton>
        <SubmitButton type="submit" disabled={isCreatingProposal}>
          Submit Proposal
        </SubmitButton>
      </FormRow>
    </Form>
  );
};

export default SubmitProposalForm;
