import { useMutation } from "@tanstack/react-query";
import { random } from "Api";
import { Button, Form, useToast } from "Components";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { getErrorMessage } from "Utils";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Home = () => {
  const { register, handleSubmit } = useForm();
  const { displayToast } = useToast();

  const randomQuery = useMutation({
    mutationFn: random,
    mutationKey: ["randomQuery"],
    onError: (error) => {
      const message = getErrorMessage(error);
      displayToast({ content: message, type: "ERROR" });
    },
    onSuccess: () => {
      console.log("success");
    },
  });

  const handleCallRandom = (formData) => {
    console.log(formData);

    randomQuery.mutate();
  };

  return (
    <Layout>
      <Title>Home</Title>
      <Form onSubmit={handleSubmit(handleCallRandom)}>
        <FormGroup>
          <label htmlFor="name">Name:</label>
          <input {...register("random")} type="text" id="random" name="random" />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </Layout>
  );
};

export default Home;
