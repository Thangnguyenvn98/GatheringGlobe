import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  axiosInstance,
  createPaymentIntent,
  fetchCreateIngress,
  fetchStreamerToken,
  fetchViewerToken,
  getCurrentUser,
  getEventById,
  getOrderDetailsById,
  getRoom,
  getRooms,
  validateToken,
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
    queryKey: ["auth", validateToken],
    queryFn: validateToken,
    retry: false, // Do not retry on failure
  });
};

export const useStreamerToken = (roomName: string) => {
  return useQuery({
    queryKey: ["streamerToken", roomName],
    queryFn: () => fetchStreamerToken(roomName),
    enabled: !!roomName,
  });
};

export const useViewerToken = (roomName: string, identity: string) => {
  return useQuery({
    queryKey: ["viewerToken", roomName, identity],
    queryFn: () => fetchViewerToken(roomName, identity),
    enabled: !!roomName && !!identity,
  });
};

export const useCreateIngress = (
  roomName: string,
  ingressType: IngressInput,
) => {
  return useQuery({
    queryKey: ["createIngress", roomName, ingressType],
    queryFn: () => fetchCreateIngress(roomName, ingressType),
    enabled: !!roomName,
  });
};
