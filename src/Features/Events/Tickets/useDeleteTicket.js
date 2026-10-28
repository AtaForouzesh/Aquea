import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTicket as deleteTicketApi } from "../../../Services/ticketsApi";
import toast from "react-hot-toast";

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeletingTicket, mutate: deleteTicket } = useMutation({
    mutationFn: (ticketId) => deleteTicketApi(ticketId),
    onSuccess: () => {
      toast.success("Ticket deleted successfully");
      queryClient.invalidateQueries({ queryKey: "tickets" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeletingTicket, deleteTicket };
};
