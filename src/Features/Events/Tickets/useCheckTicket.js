import { useQuery } from "@tanstack/react-query";
import { checkTicket } from "../../../Services/ticketsApi";

export const useCheckTicket = (eventId) => {
  const {
    data: hasBoughtTicket,
    isLoading: isCheckingTicket,
    error,
  } = useQuery({
    queryKey: ["tickets", eventId],
    queryFn: () => checkTicket(eventId),
    enabled: Boolean(eventId),
  });
  return { hasBoughtTicket, isCheckingTicket, error };
};
