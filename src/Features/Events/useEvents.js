import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../Services/eventsApi";

export const useEvents = () => {
  const {
    data: events,
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
  return { events, isLoadingEvents, errorEvents, eventsCount: events?.length };
};
