import { useState } from "react";
import EventsFilter from "../Features/Events/EventsFiltter";
import EventsHeader from "../Features/Events/EventsHeader";
import EventsList from "../Features/Events/EventsList";
import { useEvents } from "../Features/Events/useEvents";
import { getEventStatus } from "../Utils/Helper";

const Events = () => {
  const { events, isLoadingEvents } = useEvents();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredEvents = events?.filter((event) => {
    if (filterStatus === "all") {
      return true;
    }
    const status = getEventStatus(event.start_time, event.end_time);
    return status === filterStatus;
  });
  const finalFilteredEvents = filteredEvents?.filter((event) => {
    const query = searchQuery.toLowerCase();
    return (
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query)
    );
  });
  return (
    <>
      <EventsHeader />
      <EventsFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <EventsList events={finalFilteredEvents} isLoading={isLoadingEvents} />
    </>
  );
};

export default Events;
