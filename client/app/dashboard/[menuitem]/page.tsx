"use client";
import { useToast } from "@/components/ui/use-toast";
import { getJWT } from "@/data/cookies/getCookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Members from "./_pages/Members";
import Notice from "./_pages/Notice";
import Profile from "./_pages/Profile";

function Page({ params }: { params: { menuitem: string } }) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchToken = () => {
      const jwt = getJWT();
      setToken(jwt || "");
      if (!jwt) {
        toast({
          title: "Session expired",
          description: "Login in to use dashboard",
          duration: 3000,
        });
        router.push("/signin");
      }
    };
    fetchToken();
  }, []);

  if (token === null) {
    return <div>Loading...</div>;
  }

  switch (params.menuitem) {
    case "profile":
      return <Profile />;
    case "members":
      return <Members />;
    case "notice":
      return <Notice />;

    default:
      return (
        <div className="flex flex-col items-center space-y-2 pt-16 h-screen">
          <h1>This is {params.menuitem} page</h1>
          <p>token: {token ? "availbe" : "not availble"}</p>
        </div>
      );
  }
}

export default Page;
