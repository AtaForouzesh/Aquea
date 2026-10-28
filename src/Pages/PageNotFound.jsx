import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <h2>Page you're looking for was not found</h2>
      <Button onClick={handleGoBack}>Go Back</Button>
    </div>
  );
};

export default PageNotFound;
