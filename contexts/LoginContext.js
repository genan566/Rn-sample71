import { createContext, useState } from "react";

export const LoginContext = createContext({});

export function LoginContextProvider({ children }) {
    const [state, setState] = useState({});

    return <LoginContext.Provider value={{
        frame: state,
        onChange: setState
    }}>
        {children}
    </LoginContext.Provider>
}