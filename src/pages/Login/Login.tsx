import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "api";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();

  const { error, data, isLoading } = useQuery({
    queryFn: () => getCharacters(),
    queryKey: ["getCharacters"],
  });

  const sendFormData = (formData) => {
    console.log(formData);
    reset();
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <form onSubmit={handleSubmit((v) => sendFormData(v))}>
      <p>The {data.name} form</p>
      <input {...register("email")} placeholder="Email" />
      <input {...register("password")} placeholder="Password" type="password" />
      <input type="submit" />
    </form>
  );
};

export default Login;
