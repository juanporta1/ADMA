 
import { UseFormReturnType } from "@mantine/form";
import { createContext } from "react";

export const AppointmentContext = createContext<UseFormReturnType<any> | null>(null)