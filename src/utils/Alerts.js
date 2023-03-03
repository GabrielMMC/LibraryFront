import { Typography } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from "react-bootstrap-sweetalert";
import { toast, ToastContainer } from "react-toastify";

export function renderAlert({ id, deleteFunction, article, item }) {
  return (
    <SweetAlert
      title={`Deletar ${item} selecionad${article}?`}
      onConfirm={() => deleteFunction(id)}
      onCancel={() => console.log('cancelou')}>
      <form>
        <Typography>{`Uma vez deletad${article}, não dará para recuperá-l${article}!`}</Typography>
      </form>
    </SweetAlert>
  )
}

export function ToastContent() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  )
}

export function renderToast(props) {
  toast[props.type](props.msg, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}