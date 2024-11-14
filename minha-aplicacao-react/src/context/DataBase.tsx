// src/context/DataBase.tsx
import React from 'react';

interface UserData {
  nome: string;
  email: string;
  senha: string;
}

interface DataBaseProps {
  children: React.ReactNode;
}

const DataBase: React.FC<DataBaseProps> = ({ children }) => {
  const saveUserData = (data: UserData) => {
    localStorage.setItem('usuario', JSON.stringify(data));
    console.log('Usuário salvo com sucesso:', data);
  };

  return (
    <DataBaseContext.Provider value={{ saveUserData }}>
      {children}
    </DataBaseContext.Provider>
  );
};

interface DataBaseContextType {
  saveUserData: (data: UserData) => void;
}

const DataBaseContext = React.createContext<DataBaseContextType | null>(null);

export const useDataBase = () => {
  const context = React.useContext(DataBaseContext);
  if (!context) {
    throw new Error("useDataBase deve ser usado dentro de um DataBase");
  }
  return context;
};

export default DataBase;
