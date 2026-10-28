import supabase from "./supabase";

export const getComments = async ({ dealId, eventId }) => {
  let query = supabase
    .from("comments")
    .select("*, profiles(full_name, avatar, role)")
    .order("created_at", { ascending: false });

  if (dealId) {
    query = query.eq("deal_id", dealId);
  }
  if (eventId) {
    query = query.eq("event_id", eventId);
  }
  const { data, error } = await query;
  if (error) {
    throw new Error("Couldn't load comments");
  }
  return data;
};

export const createComment = async ({ content, dealId, eventId }) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    throw new Error("User Not Authenticated");
  }
  const userId = userData?.user?.id;
  const { data, error } = await supabase
    .from("comments")
    .insert({
      content,
      user_id: userId,
      deal_id: dealId || null,
      event_id: eventId || null,
    })
    .select("*")
    .single();
  if (error) {
    throw new Error("Couldn't Create Comment");
  }
  return data;
};

export const deleteComment = async (commentId) => {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);
  if (error) {
    throw new Error("Couldn't Delete Comment");
  }
  return data;
};
