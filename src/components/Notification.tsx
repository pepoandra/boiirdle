// src/components/Notification.tsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  font-size: 1.5rem;
  color: red;
`;

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  useEffect(() => {
    toast.dismiss(); // Dismiss all existing toasts before showing a new one
    if (message) {
      if (message === 'BOIII') {
        toast.success(message, { position: 'top-center', autoClose: 5000 });
      } else if (message === 'REPOST!!!') {
        toast.error(`REPOST! YOU GET 1 MINUTE TIMEOUT`, {
          position: 'top-center',
          autoClose: 60000,
          closeButton: false,
          draggable: false,
          closeOnClick: false,
          pauseOnHover: false,
        });
      } else if (message === 'UNBOII') {
        toast.error(message, { position: 'top-center', autoClose: 5000 });
      } else {
        toast.info(message, { position: 'top-center', autoClose: 5000 });
      }
    }
  }, [message]);

  return (
    <>
      <NotificationContainer>
        {'\u00A0'} {/* Non-breaking space to maintain height */}
      </NotificationContainer>
      <ToastContainer limit={1} /> {/* Ensure only 1 toast is shown at a time */}
    </>
  );
};

export default Notification;
