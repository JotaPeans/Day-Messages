import { createContext } from "react";
import IUser from "../Interfaces/IUser";

interface IProvider {
    user?: IUser | null,
    setUser?: React.Dispatch<React.SetStateAction<IUser | null>>,
    success?: boolean,
    setSuccess?: React.Dispatch<React.SetStateAction<boolean>>,
}

const AppContext = createContext<IProvider>({});

export default AppContext;