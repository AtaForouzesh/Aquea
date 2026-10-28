import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useSignup } from "./useAuth";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useNavigate } from "react-router-dom";

const StyledButton = styled.button`
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
const SignUp = () => {
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;
  const { isSigningUp, signup } = useSignup();
  const navigate = useNavigate();
  const onSubmit = ({ full_name, email, password }) => {
    signup({ full_name, email, password });
  };
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="FullName" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("full_name", { required: "FullName is Required" })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", { required: "Email is Required" })}
        />
      </FormRow>
      <FormRow label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", { required: "Password is Required" })}
        />
      </FormRow>
      <FormRow
        label="Confirm Password"
        error={errors?.confirmPassword?.message}
      >
        <Input
          type="password"
          id="confirmPassword"
          disabled={isSigningUp}
          {...register("confirmPassword", {
            required: "Confirm Password is Required",
            validate: (value) =>
              value === getValues().password || "Password does not match",
          })}
        />
      </FormRow>
      <FormRow>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.2rem",
          }}
        >
          <div>
            <span style={{ fontSize: "1.4rem", color: "#efeabb" }}>
              Already have an account?{" "}
            </span>
            <StyledButton
              type="button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </StyledButton>
          </div>
          <StyledButton type="submit" disabled={isSigningUp}>
            {isSigningUp ? "Signing Up..." : "Sign Up"}
          </StyledButton>
        </div>
      </FormRow>
    </Form>
  );
};

export default SignUp;
