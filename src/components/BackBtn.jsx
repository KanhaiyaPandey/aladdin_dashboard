import { RollbackOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
const navigate = useNavigate();
const goBack = () => {
        navigate(-1);
  };

  return (
     <button onClick={goBack} className='btn' title='back'><RollbackOutlined /></button>
  )
}

export default BackBtn