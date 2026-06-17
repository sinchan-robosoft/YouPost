// import { useQueryType } from "@/Types/reactQuery/useQueryType";
// import { useMutation, useQuery } from "@tanstack/react-query";

// export const useButtonClick = ({queryKey,queyFn,staleTime = 0,enabled = false,mutationCleanUp = () => {}} : useQueryType) => {
//     // return useQuery(
//     //         {
//     //             queryKey : [queryKey],
//     //             queryFn : queyFn,
//     //             staleTime : staleTime,
//     //             enabled : enabled,

//     //         },
//     //     );
//     return useMutation(
//         {
//             mutationFn : () => queyFn(),
//             mutationKey : [queryKey],
//             onSuccess : mutationCleanUp,
//             onError : (error) => {
//                 console.log(error)
//             }
//         }
//     )
// }

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface UseButtonClickProps {
  queryKey: string;
  queryFn: () => Promise<any>;  
  onSuccess?: (data: any) => void;  
  onError?: (error: any) => void;
}

export const useButtonClick = ({
  queryKey,
  queryFn,
  onSuccess = () => {},
  onError = () => {}
}: UseButtonClickProps) => {
  return useMutation({
    mutationFn: queryFn, 
    mutationKey: [queryKey],
    onSuccess: onSuccess,
    onError: (error) => {
      console.error("Error:", error);
      onError(error);
    }
  });
};