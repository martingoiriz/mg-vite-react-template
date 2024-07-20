import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "api";
import { Button, useToast } from "components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "utils";

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
    <>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <p>The form</p>
        <input {...register("name")} placeholder="Name" />
        <input {...register("email")} placeholder="Email" />
        <input {...register("password")} placeholder="Password" type="password" />
        <Button type="submit" isLoading={signUpQuery.isPending}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default SignUp;
