import AxiosInstance from "@/api/Axios/AxiosInstance"

export const getHomeData = async () => {
    const data = await AxiosInstance.get("/getHomeData");
    return data?.data?.data;
}