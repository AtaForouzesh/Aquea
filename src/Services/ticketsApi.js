import supabase from "./supabase";

export const getTickets = async () => {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("tickets")
    .select(
      "*, events!inner(id, title, description, start_time, end_time, location)",
    )
    .gte("events.end_time", now)
    .order("event_id", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Could not load tickets");
  }
  return data;
};

export const checkTicket = async (eventId) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    throw new Error("User not Authenticated");
  }
  const userId = userData.user.id;
  const { data, error } = await supabase
    .from("tickets")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throw new Error("Could not check ticket status");
  }
  return data.length > 0;
};

export const createTicket = async (eventId) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    throw new Error("User not Authenticated");
  }
  const userId = userData.user.id;
  const { data, error } = await supabase
    .from("tickets")
    .insert({
      event_id: eventId,
      user_id: userId,
    })
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Failed to buy ticket");
  }
  return data;
};

export const deleteTicket = async (ticketId) => {
  const { data, error } = await supabase
    .from("tickets")
    .delete()
    .eq("id", ticketId);
  if (error) {
    console.error(error);
    throw new Error("Could not delete ticket");
  }
  return data;
};
