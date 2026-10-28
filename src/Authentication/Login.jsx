import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useLogin } from "./useAuth";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Form from "../ui/Form";
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
const Login = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { isLogging, login } = useLogin();
  const navigate = useNavigate();
  const onSubmit = ({ email, password }) => {
    login({ email, password });
  };
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLogging}
          {...register("email", { required: "Email is Required" })}
        />
      </FormRow>
      <FormRow label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isLogging}
          {...register("password", { required: "Password is Required" })}
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
              Don't have an account?{" "}
            </span>
            <StyledButton
              type="button"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </StyledButton>
          </div>
          <StyledButton type="submit" disabled={isLogging}>
            {isLogging ? "Logging In..." : "Login"}
          </StyledButton>
        </div>
      </FormRow>
    </Form>
  );
};

export default Login;
