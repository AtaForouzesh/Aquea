import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCreateEvent } from "./useCreateEvent";
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

const CreateEvent = () => {
  const navigate = useNavigate();
  const { role, isLoading: isLoadingUser } = useUser();
  const isHost = role === "host";
  const { isCreatingEvent, createEvent } = useCreateEvent();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const onSubmit = (data) => {
    const formatedStartTime = new Date(data.start_time).toISOString();
    const formatedEndTime = new Date(data.end_time).toISOString();
    createEvent(
      {
        title: data.title,
        description: data.description,
        startTime: formatedStartTime,
        endTime: formatedEndTime,
        location: data.location,
      },
      {
        onSuccess: () => {
          navigate("/events");
          reset();
        },
      },
    );
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
  if (!isHost) {
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
        Create New Event
      </Headings>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Title" error={errors?.title?.message}>
          <Input
            id="Title"
            disabled={isCreatingEvent}
            placeholder="Enter Event Title"
            type="text"
            {...register("title", { required: "Title is required" })}
          />
        </FormRow>
        <FormRow label="Description" error={errors?.description?.message}>
          <Input
            id="Description"
            disabled={isCreatingEvent}
            placeholder="Enter Event Description"
            type="text"
            {...register("description", {
              required: "Description is required",
            })}
          />
        </FormRow>
        <FormRow label="Location" error={errors?.location?.message}>
          <Input
            id="Location"
            disabled={isCreatingEvent}
            placeholder="Enter Event Location"
            type="text"
            {...register("location", {
              required: "Location is required",
            })}
          />
        </FormRow>
        <FormRow label="StartTime" error={errors?.start_time?.message}>
          <Input
            id="StartTime"
            disabled={isCreatingEvent}
            placeholder="Enter Event StartTime"
            type="datetime-local"
            {...register("start_time", {
              required: "StartTime is required",
            })}
          />
        </FormRow>
        <FormRow label="EndTime" error={errors?.end_time?.message}>
          <Input
            id="EndTime"
            disabled={isCreatingEvent}
            placeholder="Enter Event EndTime"
            type="datetime-local"
            {...register("end_time", {
              required: "EndTime is required",
            })}
          />
        </FormRow>
        <FormRow>
          <CancelButton
            onClick={() => {
              reset();
              navigate("/events");
            }}
            type="reset"
            disabled={isCreatingEvent}
          >
            Cancel
          </CancelButton>
          <SubmitButton type="submit" disabled={isCreatingEvent}>
            {isCreatingEvent ? "Creating..." : "Create Event"}
          </SubmitButton>
        </FormRow>
      </Form>
    </div>
  );
};

export default CreateEvent;
