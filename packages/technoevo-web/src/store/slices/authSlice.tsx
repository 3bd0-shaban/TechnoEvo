import { iUser } from "@/types/iUser";
import { StateCreator } from "zustand";

// add 
const authSlice: StateCreator<iUser> = (set, get) => ({
    isAuth: true,

})

export default authSlice;