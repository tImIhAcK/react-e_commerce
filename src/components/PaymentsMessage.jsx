import { toast } from "react-toastify";

const PaymentsMessage = ({ message }) => {
  toast.info(message);
};

export default PaymentsMessage;
