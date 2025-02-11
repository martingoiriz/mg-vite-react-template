import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "Api";
import { Button, Form, useToast } from "Components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "Utils";

const SignUp = () => {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const { displayToast } = useToast();

  const signUpQuery = useMutation({
    mutationFn: signUpUser,
    mutationKey: ["signUpUser"],
    onError: (error) => {
      const message = getErrorMessage(error);
      displayToast({ content: message, type: "ERROR" });
    },
    onSuccess: () => {
      displayToast({ content: "User created. Please login.", type: "SUCCESS" });
      reset();
      navigate("/login");
    },
  });

  const handleSignUp = (formData) => {
    signUpQuery.mutate(formData);
  };

  return (
    <Form onSubmit={handleSubmit(handleSignUp)}>
      <p>The form</p>
      <input {...register("name")} placeholder="Name" />
      <input {...register("lastName")} placeholder="Last Name" />
      <input {...register("email")} placeholder="Email" />
      <input {...register("password")} placeholder="Password" type="password" />
      <Button type="submit" isLoading={signUpQuery.isPending}>
        Submit
      </Button>
    </Form>
  );
};

export default SignUp;
