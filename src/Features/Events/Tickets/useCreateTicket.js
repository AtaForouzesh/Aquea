import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTicket as createTicketApi } from "../../../Services/ticketsApi";
import toast from "react-hot-toast";

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  const { isPending: isCreatingTicket, mutate: createTicket } = useMutation({
    mutationFn: (eventId) => createTicketApi(eventId),
    onSuccess: () => {
      toast.success("Ticket created successfully");
      queryClient.invalidateQueries(["tickets"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isCreatingTicket, createTicket };
};
