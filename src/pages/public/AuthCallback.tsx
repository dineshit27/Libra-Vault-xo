import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store";
import { getProfile, type AppUser } from "@/lib/auth";

const AuthCallback = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const sbUser = session.user;
        // Sync profile immediately to update store before navigation
        const profile = await getProfile(sbUser.id);
        if (profile) {
          setUser(profile);
        } else {
          const meta = sbUser.user_metadata;
          const fallback: AppUser = {
            id: sbUser.id,
            fullName: meta?.full_name || meta?.name || sbUser.email?.split("@")[0] || "User",
            email: sbUser.email || "",
            role: (meta?.role as "member" | "admin") || "member",
            avatarUrl: meta?.avatar_url || meta?.picture,
            membershipType: "basic",
          };
          setUser(fallback);
        }

        const user = useAuthStore.getState().user;
        const dest = user?.role === "admin" ? "/admin" : "/dashboard";
        navigate(dest, { replace: true });
      } else {
        navigate("/signin", { replace: true });
      }
    });
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="font-heading font-bold text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
