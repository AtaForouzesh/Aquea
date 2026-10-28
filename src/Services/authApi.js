import supabase from "./supabase";
export const signupApi = async ({ full_name, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        avatar: "",
      },
    },
  });
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
};

export const loginApi = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data?.user;
};

export const logoutApi = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
