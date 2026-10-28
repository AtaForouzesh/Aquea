import supabase from "./supabase";

export const getDeals = async ({ minPrice, maxPrice, selectedSkills }) => {
  let query = supabase.from("deals").select("*").neq("status", "closed");
  if (minPrice !== "" && minPrice !== undefined && !isNaN(minPrice)) {
    query = query.gte("min_price", Number(minPrice));
  }
  if (maxPrice !== "" && maxPrice !== undefined && !isNaN(maxPrice)) {
    query = query.lte("max_price", Number(maxPrice));
  }
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error("Failed to load deals");
  }
  if (selectedSkills && selectedSkills.trim() !== "") {
    const searchTerm = selectedSkills.toLowerCase();
    return data.filter((deal) =>
      deal.skills?.some((skill) => {
        return skill?.toLowerCase().includes(searchTerm);
      }),
    );
  }
  return data;
};

export const getDeal = async (id) => {
  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Failed to fetch the deal");
  }
  return data;
};

export const createDeal = async (newDealData) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (!userData.user || userError) {
    throw new Error("User is not authenticated");
  }
  const userId = userData.user.id;
  const { data, error } = await supabase
    .from("deals")
    .insert([
      {
        ...newDealData,
        dealer_id: userId,
        status: newDealData.status || "open",
      },
    ])
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Failed to create the deal");
  }
  return data;
};

export const updateDeal = async ({ id, updateDealData }) => {
  const { data, error } = await supabase
    .from("deals")
    .update(updateDealData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating deal ${id}:`, error.message);
    throw new Error("Deal could not be updated");
  }

  return data;
};

export const deleteDeal = async (id) => {
  const { data, error } = await supabase.from("deals").delete().eq("id", id);
  if (error) {
    console.error(`Error deleting deal: ${id}`, error.message);
    throw new Error("Deal could not be deleted");
  }
  return data;
};
