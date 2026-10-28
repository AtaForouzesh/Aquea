import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCreateDeal } from "./useCreateDeal";
import { useForm } from "react-hook-form";
import Headings from "../../Components/Headings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "../Users/useUser";
import { HiArrowLeft } from "react-icons/hi";

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

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  margin: 0px;
  font-size: 24px;
  background-color: #558467;
  color: #efeabb;
  border: none;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #466d55;
    cursor: pointer;
  }
  & svg {
    font-size: 24px;
  }
`;

const CreateDeal = () => {
  const navigate = useNavigate();
  const { role, isLoading: isLoadingUser } = useUser();
  const isDealer = role === "dealer";
  const { isCreatingDeal, createDeal } = useCreateDeal();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    const skillsArray = data.skills
      ? data.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : [];
    const newDealData = {
      title: data.title,
      description: data.description,
      min_price: Number(data.min_price),
      max_price: Number(data.max_price),
      expected_duration: data.expected_duration,
      skills: skillsArray,
    };
    createDeal(newDealData, {
      onSuccess: () => {
        reset();
        navigate("/deals");
      },
    });
  };
  const onError = (errors) => {
    console.log(errors);
  };

  if (isLoadingUser) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          color: "#efeabb",
          fontSize: "28px",
          textAlign: "center",
        }}
      >
        Loading User Details...
      </div>
    );
  }

  if (!isDealer) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          margin: "10px 20px",
          padding: "0px",
        }}
      >
        <StyledButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <HiArrowLeft />
          Go Back
        </StyledButton>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            color: "#efeabb",
            fontSize: "28px",
            textAlign: "center",
          }}
        >
          You're not authenticated to have access to this page
        </div>
      </div>
    );
  }

  return (
    <div>
      <Headings as="h1" style={{ color: "#efeabb", margin: "30px 20px" }}>
        Create New Deal
      </Headings>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="title" error={errors?.title?.message}>
          <Input
            id="title"
            disabled={isCreatingDeal}
            placeholder="Enter Deal Title"
            type="text"
            {...register("title", { required: "Title is required" })}
          />
        </FormRow>
        <FormRow label="description" error={errors?.description?.message}>
          <Input
            id="description"
            disabled={isCreatingDeal}
            placeholder="Enter Deal Description"
            type="text"
            {...register("description", {
              required: "Description is required",
            })}
          />
        </FormRow>
        <FormRow label="minPrice" error={errors?.min_price?.message}>
          <Input
            id="minPrice"
            disabled={isCreatingDeal}
            placeholder="Enter Deal Min Price"
            type="text"
            {...register("min_price", {
              required: "Min Price is required",
            })}
          />
        </FormRow>
        <FormRow label="maxPrice" error={errors?.max_price?.message}>
          <Input
            id="maxPrice"
            disabled={isCreatingDeal}
            placeholder="Enter Deal Max Price"
            type="text"
            {...register("max_price", {
              required: "Max Price is required",
            })}
          />
        </FormRow>
        <FormRow
          label="expectedDuration"
          error={errors?.expected_duration?.message}
        >
          <Input
            id="expectedDuration"
            disabled={isCreatingDeal}
            placeholder="Enter Deal Expected Duration"
            type="text"
            {...register("expected_duration", {
              required: "Expected Duration is required",
            })}
          />
        </FormRow>
        <FormRow label="skills" error={errors?.skills?.message}>
          <Input
            id="skills"
            disabled={isCreatingDeal}
            placeholder="Enter Deal Skills"
            type="text"
            {...register("skills", {
              required: "Skills are required",
            })}
          />
        </FormRow>
        <FormRow>
          <CancelButton
            onClick={() => {
              reset();
              navigate("/deals");
            }}
            type="reset"
            disabled={isCreatingDeal}
          >
            Cancel
          </CancelButton>
          <SubmitButton type="submit" disabled={isCreatingDeal}>
            {isCreatingDeal ? "Creating..." : "Create Deal"}
          </SubmitButton>
        </FormRow>
      </Form>
    </div>
  );
};

export default CreateDeal;
