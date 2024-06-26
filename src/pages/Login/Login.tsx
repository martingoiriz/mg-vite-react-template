import { useMutation } from "@tanstack/react-query";
import { loginUser } from "api";
import { useToast } from "components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "utils";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const { displayToast } = useToast();

  const loginQuery = useMutation({
    mutationFn: (body) => loginUser(body),
    mutationKey: ["loginUser"],
    onError: (error) => {
      const message = getErrorMessage(error);
      displayToast({ content: message, type: "ERROR" });
    },
    onSuccess: (data) => {
      console.log(data);
      reset();
    },
  });

  const handleLogin = (formData) => {
    loginQuery.mutate(formData);
  };

  if (loginQuery.isPending) return "Loading...";

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <p>The form</p>
        <input {...register("email")} placeholder="Email" />
        <input {...register("password")} placeholder="Password" type="password" />
        <input type="submit" />
      </form>
      <button onClick={() => navigate("/signup")}>Sign up</button>
    </>
  );
};

export default Login;
