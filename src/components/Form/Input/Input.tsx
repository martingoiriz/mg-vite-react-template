import Button from "../../Button";

interface InputProps {
  type?: string;
  isLoading?: boolean;
}

const Input: React.FC<InputProps> = ({ type, isLoading }) => {
  if (isLoading) {
    return <Button isLoading>-</Button>;
  }

  return <input type={type} />;
};

export default Input;
