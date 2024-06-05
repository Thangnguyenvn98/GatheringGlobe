import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import {
  axiosInstance,
  createPaymentIntent,
  fetchCreateIngress,
  getAllEvents,
  getAllStreamDetails,
  getBlockUser,
  getCurrentUser,
  getCurrentUserById,
  getCurrentUserByUsername,
  getEventById,
  getOrderDetailsById,
  getRoom,
  getRooms,
  getStreamDetails,
  validateToken,
  fetchEventFiltered,
} from "./api";
import { useSocket } from "@/components/providers/socket-provider";
import { CartItem } from "@/hooks/use-cart-store";
import { IngressInput } from "@/types/IngressInput";

export function useRooms() {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
}

export const useCurrentUserByUsername = (username: string) => {
  return useQuery({
    queryKey: ["user", username],
    queryFn: () => getCurrentUserByUsername(username),
    enabled: !!username,
  });
};

export function useCurrentStream(userId: string) {
  return useQuery({
    queryKey: ["stream", userId],
    queryFn: () => getStreamDetails(userId),
    enabled: !!userId,
  });
}

export function useGetAllStreams() {
  return useQuery({
    queryKey: ["stream"],
    queryFn: () => getAllStreamDetails(),
  });
}

export const useCurrentUserById = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getCurrentUserById(userId),
    enabled: !!userId,
  });
};

export const useCurrentEventDetail = (eventId: string) => {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(eventId),
    enabled: !!eventId,
  });
};

export const useCurrentOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderDetailsById(orderId),
    enabled: !!orderId,
  });
};

export const usePaymentIntent = (cartItems: CartItem[]) => {
  return useQuery({
    queryKey: ["paymentIntent", cartItems],
    queryFn: () => createPaymentIntent(cartItems),
    enabled: cartItems.length > 0,
  });
};

export const useChatQuery = (roomId: string | undefined) => {
  const { isConnected } = useSocket();
  const fetchMessages = async ({
    pageParam,
  }: {
    pageParam: number | undefined;
  }) => {
    if (!roomId) {
      return { messages: [], nextCursor: undefined, hasNextPage: false };
    }
    const endpoint = `/api/messages/${roomId}?cursor=${pageParam || 0}`;
    const response = await axiosInstance.get(endpoint);
    return response.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["messages", roomId],
      queryFn: fetchMessages,
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        // Determine the logic for getting the next page based on the last page's data
        lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};

export const useRoom = (roomId: string | undefined) => {
  return useQuery({
    queryKey: ["room", roomId],
    queryFn: () => getRoom({ roomId }),
    enabled: !!roomId,
  });
};

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: validateToken,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export const useCreateIngress = (ingressType: IngressInput) => {
  return useQuery({
    queryKey: ["createIngress", ingressType],
    queryFn: () => fetchCreateIngress(ingressType),
    enabled: !!ingressType,
  });
};

export const useAllEventsPagination = (page = 1) => {
  return useQuery({
    queryKey: ["events", page],
    queryFn: () => getAllEvents(page),
    placeholderData: keepPreviousData,
  });
};

export const useGetCurrentBlockByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["block", userId],
    queryFn: () => getBlockUser(userId),
    enabled: !!userId,
  });
};

export const useFilterParams = (params: string) => {
  return useQuery({
    queryKey: ["filterParams", params],
    queryFn: () => fetchEventFiltered(params),
  });
};
