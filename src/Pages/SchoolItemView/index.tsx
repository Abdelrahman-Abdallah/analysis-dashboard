import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "src/store";

type ParamsType = {
  id: string;
};

const SchoolItemView = () => {
  const { id } = useParams<ParamsType>();
  const navigate = useNavigate();
  const rawData = useSelector((state) => state.data.data);
  const selectedItem = rawData.find((item) => item.id === id);

  function handleBack() {
    navigate(-1);
  }

  return (
    <div>
      {selectedItem && (
        <>
          <div>
            {selectedItem.school}/{selectedItem.camp}/{selectedItem.lessons}
          </div>
          <button onClick={handleBack}>Go back</button>
        </>
      )}
    </div>
  );
};

export default SchoolItemView;
