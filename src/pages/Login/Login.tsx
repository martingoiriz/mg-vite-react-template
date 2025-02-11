import { GoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "api";
import { Button, FormWrapper, useToast } from "components";
import { CONTEXT_ACTIONS } from "constants";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "services/context";
import styled from "styled-components";
import { getErrorMessage, localStorageSet } from "utils";

const SignUpText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Login = () => {
  const { register, handleSubmit, reset } = useForm();

  const { dispatch } = useAppContext();

  const navigate = useNavigate();

  const { displayToast } = useToast();

  const loginQuery = useMutation({
    mutationFn: loginUser,
    mutationKey: ["loginUser"],
    onError: (error) => {
      const message = getErrorMessage(error);
      displayToast({ content: message, type: "ERROR" });
    },
    onSuccess: ({ data }) => {
      reset();
      dispatch({
        data,
        type: CONTEXT_ACTIONS.SET_USER_DATA,
      });
      localStorageSet("userData", data);
      navigate("/home");
    },
  });

  const handleLogin = (formData) => {
    loginQuery.mutate(formData);
  };

  return (
    <>
      <FormWrapper onSubmit={handleSubmit(handleLogin)}>
        <p>The form</p>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <input {...register("email")} placeholder="Email" value="martingoiriz@gmail.com" />
        <input {...register("password")} placeholder="Password" type="password" value="Abcd1234@" />
        <Button type="submit" isLoading={loginQuery.isPending}>
          Submit
        </Button>
        <SignUpText onClick={() => navigate("/reset-password")}>I forgot my account</SignUpText>
        <SignUpText onClick={() => navigate("/signup")}>
          You don't have an account? Sign up here
        </SignUpText>
      </FormWrapper>
    </>
  );
};

export default Login;
