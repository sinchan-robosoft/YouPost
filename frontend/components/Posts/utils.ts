import AxiosInstance from "@/api/Axios/AxiosInstance"

export const getUSerPosts = async (userName  : string) => {
    console.log(userName)
    const response = await AxiosInstance.post("/getUserPosts",
        {
            userName : userName
        },{
            headers : {
                "Content-Type" : "application/json"
            }
        }
    );
    return response.data;
}