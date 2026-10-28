import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../../../Services/ticketsApi";

export const useTickets = () => {
  const {
    data: tickets,
    error,
    isLoading: isLoadingTickets,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getTickets(),
  });
  return { tickets, error, isLoadingTickets, ticketsLength: tickets?.length };
};
