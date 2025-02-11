import { useMutation } from "@tanstack/react-query";
import { recoverAccount, resetPassword } from "api";
import { Button, useToast } from "components";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { getErrorMessage } from "utils";

const RecoverAccount = () => {
  const { register, handleSubmit, reset } = useForm();
  const { displayToast } = useToast();

  const navigate = useNavigate();
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);

  const token = queryParams.get("token");

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

  const resetPasswordQuery = useMutation({
    mutationFn: resetPassword,
    mutationKey: ["resetPassword"],
    onError: (error) => {
      const message = getErrorMessage(error);
      displayToast({ content: message, type: "ERROR" });
    },
    onSuccess: () => {
      displayToast({ content: "Successfully reset your password.", type: "SUCCESS" });
      reset();
      navigate("/login");
    },
  });

  const handleRecover = (formData) => {
    if (token) {
      resetPasswordQuery.mutate({ ...formData, token });
    } else {
      recoverAccountQuery.mutate(formData);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleRecover)}>
        <p>Recover form</p>
        <input {...register("email")} placeholder="Email" />

        {token && <input {...register("newPassword")} placeholder="New Password" />}

        <Button type="submit" isLoading={recoverAccountQuery.isPending}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default RecoverAccount;
