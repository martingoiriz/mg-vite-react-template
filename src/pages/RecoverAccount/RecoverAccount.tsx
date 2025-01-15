import { useMutation } from "@tanstack/react-query";
import { recoverAccount } from "api";
import { Button, useToast } from "components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "utils";

const RecoverAccount = ({ location }) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { displayToast } = useToast();

  // const params = new URLSearchParams(location.search);
  console.log(location);

  const recoverAccountQuery = useMutation({
    mutationFn: recoverAccount,
    mutationKey: ["recoverAccount"],
    onError: (error) => {
      const message = getErrorMessage(error);
      displayToast({ content: message, type: "ERROR" });
    },
    onSuccess: () => {
      displayToast({ content: "Please check your email.", type: "SUCCESS" });
      reset();
      navigate("/login");
    },
  });

  const handleRecover = (formData) => {
    recoverAccountQuery.mutate(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleRecover)}>
        <p>Recover form</p>
        <input {...register("email")} placeholder="Email" />
        <Button type="submit" isLoading={recoverAccountQuery.isPending}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default RecoverAccount;
