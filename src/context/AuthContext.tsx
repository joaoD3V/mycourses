import { createContext, ReactNode, useState } from "react";

type AuthContextType = {
  tokenAuth: Token;
  handleSetToken: (token: Token) => void;
}


type AuthContextProviderProps = {
  children: ReactNode;
}

type Token = {
  token: string;
}



export const AuthContext = createContext({} as AuthContextType);



export function AuthContextProvider(props: AuthContextProviderProps){

  const [tokenAuth, setTokenAuth] = useState<Token>({} as Token);

  function handleSetToken(token: Token){
    console.log(token);
    setTokenAuth(token);
  }
 


  return (
    <AuthContext.Provider value={{ tokenAuth, handleSetToken }}>
      {props.children}
    </AuthContext.Provider>
  );

}