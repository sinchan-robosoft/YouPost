
import { useQueryType } from "@/Types/reactQuery/useQueryType";
import {useQuery} from "@tanstack/react-query";

export const useReactQuery = ({queryKey,queyFn,staleTime = 50000} : useQueryType) => {
    return(
        useQuery(
            {
                queryKey : [queryKey],
                queryFn : queyFn,
                staleTime : 50000
            }
        )
    )
}