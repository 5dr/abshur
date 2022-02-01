import { toast, ToastContainerProps } from 'react-toastify';

export const toastOptions: ToastContainerProps = {
  position:  'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl:  false,
  pauseOnFocusLoss: false,
  draggable: false,
  bodyStyle: {
    direction: 'ltr',
    fontSize: '1.2rem',
    textAlign: 'start',
  },
};
// toast.configure();

export const successToast = (msg: string) => {
  return toast.success(msg);
};

export const errorToast = (msg: string) => {
  return toast.error(msg);
};

export const infoToast = (msg: string) => {
  return toast.info(msg);
};

export const warnToast = (msg: string) => {
  return toast.warning(msg);
};
