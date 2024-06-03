import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "api";
import { useToast } from "components";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "utils";

const SignUp = () => {
  const { register, handleSubmit, reset } = useForm();

  const { displayToast } = useToast();

  const signUpQuery = useMutation({
    mutationFn: (body) => signUpUser(body),
    mutationKey: ["signUpUser"],
    onError: (error) => {
      const message = getErrorMessage(error);
      displayToast({ content: message, type: "ERROR" });
    },
    onSuccess: (data) => {
      console.log(data);
      reset();
    },
  });

  const handleSignUp = (formData) => {
    signUpQuery.mutate(formData);
  };

  if (signUpQuery.isPending) return "Loading...";

  return (
    <>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <p>The form</p>
        <input {...register("name")} placeholder="Name" />
        <input {...register("email")} placeholder="Email" />
        <input {...register("password")} placeholder="Password" type="password" />
        <input type="submit" />
      </form>
    </>
  );
};

export default SignUp;
