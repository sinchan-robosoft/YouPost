import AxiosInstance from "@/api/Axios/AxiosInstance";
import { userPayload } from "@/Types/SignUpPage/SignUpPageType";

export const handleSignUp = async ({ email , password , reTypePass } : userPayload) => {
    const response = await AxiosInstance.post("/signUp",{
        userName : email,
        userPass : password,
        reTypePass : reTypePass
    });
    return response?.data;
};