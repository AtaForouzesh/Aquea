import supabase from "./supabase";

export const checkUserProposal = async (dealId) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    throw new Error("User not Authenticated");
  }
  const userId = userData.user.id;
  const { data, error } = await supabase
    .from("proposals")
    .select("id")
    .eq("deal_id", dealId)
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throw new Error("Could not check Proposal status");
  }
  return data.length > 0;
};

export const createProposal = async ({
  dealId,
  description,
  file,
  bidAmount,
  estimatedTime,
}) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    throw new Error("User not Authenticated");
  }
  const userId = userData.user.id;

  let filePath = null;

  if (file) {
    const fileName = `${Math.random()}-${file.name}`.replaceAll("/", "");

    const { error: storageError } = await supabase.storage
      .from("proposal-attachments")
      .upload(fileName, file);

    if (storageError) {
      console.error(storageError);
      throw new Error("File attachment failed to upload");
    }

    const { data: publicUrlData } = supabase.storage
      .from("proposal-attachments")
      .getPublicUrl(fileName);

    filePath = publicUrlData.publicUrl;
  }
  const { data, error } = await supabase
    .from("proposals")
    .insert([
      {
        deal_id: dealId,
        user_id: userId,
        file_url: filePath,
        description,
        bid_amount: Number(bidAmount),
        estimated_time: estimatedTime,
      },
    ])
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Proposal could not be submitted");
  }
  return data;
};

export const getProposals = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    throw new Error("User not Authenticated");
  }
  const userId = userData.user.id;
  const { data, error } = await supabase
    .from("proposals")
    .select("*, deals(id,dealer_id, title, description, min_price, max_price)")
    .eq("user_id", userId);
  if (error) {
    console.error(error);
    throw new Error("Could not load user's proposals");
  }
  return data;
};

export const getDealerProposals = async () => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    throw new Error("User not Authenticated");
  }
  const userId = userData.user.id;

  const { data, error } = await supabase
    .from("proposals")
    .select(
      "*, profiles(full_name, avatar, role), deals!inner(id, dealer_id, title, expected_duration)",
    )
    .eq("deals.dealer_id", userId)
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error("Could not load dealer's proposals");
  }
  return data;
};

export const updateProposalStatus = async ({ proposalId, status }) => {
  const { data, error } = await supabase
    .from("proposals")
    .update({ status })
    .eq("id", proposalId)
    .select()
    .single();
  if (error) {
    throw new Error("Could not update proposal status");
  }
  if (status === "accepted" && data?.deal_id) {
    const { error: dealError } = await supabase
      .from("deals")
      .update({ status: "closed" })
      .eq("id", data?.deal_id);
    if (dealError) {
      throw new Error("Could not update deal status");
    }
    const { error: rejectError } = await supabase
      .from("proposals")
      .update({ status: "rejected" })
      .eq("deal_id", data?.deal_id)
      .neq("id", proposalId)
      .eq("status", "pending");
    if (rejectError) {
      throw new Error("Could not reject other proposals");
    }
  }
  return data;
};
