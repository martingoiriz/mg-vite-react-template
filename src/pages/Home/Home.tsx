import { useMutation } from "@tanstack/react-query";
import { random } from "Api";
import { useToast } from "Components";
import styled from "styled-components";
import { getErrorMessage } from "Utils";

const FormContainer = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  color: black;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  height: 100px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home = () => {
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

  const handleCallRandom = () => {
    randomQuery.mutate();
  };

  return (
    <FormContainer>
      <Title>Home</Title>
      <form onSubmit={() => handleCallRandom()}>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input type="text" id="name" name="name" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input type="email" id="email" name="email" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="message">Message:</Label>
          <TextArea id="message" name="message" required />
        </FormGroup>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default Home;
