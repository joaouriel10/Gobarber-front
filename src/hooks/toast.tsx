import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContexData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContex = createContext<ToastContexData>({} as ToastContexData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({type, title, description}: Omit<ToastMessage, 'id'>)=> {
    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description,
    };

    setMessages((state) =>[...state, toast]);

  }, []);

  const removeToast = useCallback((id: string)=> {
    setMessages((state) => state.filter(message=> message.id !== id));
  }, []);

  return (
    <ToastContex.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContex.Provider>
  )
}

function useToast(): ToastContexData {
  const contex = useContext(ToastContex);

  if (!contex) {
    throw new Error('useToast must beused within a ToastProvider');
  }

  return contex;
}

export { ToastProvider, useToast };