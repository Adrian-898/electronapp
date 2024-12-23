import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div
      className="btn-link start-0 top-0 m-0 p-0"
      onClick={handleBack}
      title="Regresar"
    >
      <i className="bi bi-arrow-return-left fs-1"></i>
    </div>
  );
};

export default BackButton;
