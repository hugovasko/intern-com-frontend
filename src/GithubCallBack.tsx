import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const GitHubCallback: React.FC = () => {
  const { loginWithGitHub } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      loginWithGitHub(code).catch((error) => {
        console.error("GitHub login failed:", error);
      });
    }
  }, [loginWithGitHub]);

  return <div>Authenticating with GitHub...</div>;
};

export default GitHubCallback;
