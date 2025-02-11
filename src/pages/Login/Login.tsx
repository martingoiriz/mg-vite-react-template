import { GoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "Api";
import { Button, Form, useToast } from "Components";
import { CONTEXT_ACTIONS } from "Constants";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "Services/context";
import styled from "styled-components";
import { localStorageSet } from "Utils";

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
      displayToast({ content: error, httpResponse: true, type: "ERROR" });
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
    <Form onSubmit={handleSubmit(handleLogin)}>
      <p>The form</p>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <input {...register("email")} placeholder="Email" value="mama@gmail.com" />
      <input {...register("password")} placeholder="Password" type="password" value="Abcd1234$" />
      <Button type="submit" isLoading={loginQuery.isPending}>
        Submit
      </Button>
      <SignUpText onClick={() => navigate("/reset-password")}>I forgot my password</SignUpText>
      <SignUpText onClick={() => navigate("/signup")}>
        You don't have an account? Sign Up here
      </SignUpText>
    </Form>
  );
};

export default Login;
