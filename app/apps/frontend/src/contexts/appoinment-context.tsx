 
import { UseFormReturnType } from "@mantine/form";
import { createContext } from "react";

export const AppoinmentContext = createContext<UseFormReturnType<any> | null>(null)