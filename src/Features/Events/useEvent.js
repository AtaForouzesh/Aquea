import { useQuery } from "@tanstack/react-query";
import { getEvent } from "../../Services/eventsApi";

export const useEvent = (id) => {
  const {
    data: event,
    isLoading: isLoadingEvent,
    error: errorEvent,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
  });
  return { event, isLoadingEvent, errorEvent };
};
