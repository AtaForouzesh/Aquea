import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent as createEventApi } from "../../Services/eventsApi";
import toast from "react-hot-toast";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  const { isPending: isCreatingEvent, mutate: createEvent } = useMutation({
    mutationFn: ({ title, description, startTime, endTime, location }) =>
      createEventApi({
        title,
        description,
        startTime,
        endTime,
        location,
      }),
    onSuccess: () => {
      toast.success("Event Successfully Created");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreatingEvent, createEvent };
};
