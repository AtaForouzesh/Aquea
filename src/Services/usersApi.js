import supabase from "../Services/supabase";

export const getUsers = async ({
  filterRole = "all",
  sortBy = "high-to-low",
}) => {
  let query = supabase.from("profiles_with_rank").select("*");
  if (filterRole && filterRole !== "all") {
    query = query.eq("role", filterRole);
  }
  const isAscending = sortBy === "high-to-low";
  query = query.order("role_priority", { ascending: isAscending });
  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }
  return data;
};

export const createEditUser = async (newUser, id) => {
  const hasImagePath = newUser.avatar?.startsWith?.(supabase.Url);
  const avatarName = `${Math.random()}-${newUser.avatar.name}`.replace("/", "");
  const avatarUrl = hasImagePath
    ? newUser.avatar
    : `https://nckxglzowhonsshanezj.supabase.co/storage/v1/object/public/avatars/${avatarName}`;
  let query = supabase.from("profiles");
  const { role_priority, avatar, ...userPayLoad } = newUser;
  const finalUser = userPayLoad;

  if (!id) {
    query = query.upsert([{ ...finalUser, avatar: avatarUrl }]);
  }
  if (id) {
    query = query
      .update({ ...finalUser, avatar: avatarUrl })
      .eq("id", id)
      .select();
  }
  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }
  if (hasImagePath) {
    return data;
  }
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, newUser.avatar);
  if (storageError) {
    console.error(storageError);
    throw new Error("Avatar could not be uploaded");
  }
  return data;
};

export const deleteUser = async (id) => {
  const { data, error } = await supabase.rpc("delete_user_completely", {
    user_id: id,
  });
  if (error) {
    console.error(error);
    throw new Error("User could not be deleted");
  }
  return data;
};
