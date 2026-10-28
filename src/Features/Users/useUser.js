import { useQuery } from "@tanstack/react-query";
import supabase from "../../Services/supabase";

export const useUser = () => {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });
  const isAuthenticated = !!session?.user;

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw new Error("Could not load user profile");
      return data;
    },
    enabled: isAuthenticated,
  });

  return {
    isLoading: isUserLoading,
    isAuthenticated,
    user: session?.user,
    role: user?.role,
  };
};
