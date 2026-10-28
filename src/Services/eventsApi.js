import supabase from "./supabase";

export const getEvents = async () => {
  const { data, error } = await supabase
    .from("events")
    .select("*, profiles(full_name, avatar)")
    .order("start_time", { ascending: true });
  if (error) {
    console.error(error);
    throw new Error("Could not load events");
  }
  return data;
};

export const createEvent = async ({
  title,
  description,
  startTime,
  endTime,
  location,
}) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    throw new Error("User not Authenticated");
  }
  const userId = userData.user.id;
  const { data, error } = await supabase
    .from("events")
    .insert({
      host_id: userId,
      title,
      description,
      start_time: startTime,
      end_time: endTime,
      location,
    })
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Could not create event");
  }
  return data;
};

export const getEvent = async (id) => {
  const { data, error } = await supabase
    .from("events")
    .select("*, profiles(*)")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Could not load event");
  }
  return data;
};
