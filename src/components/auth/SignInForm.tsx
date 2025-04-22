import { useState, useEffect} from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { account } from "../../appwrite/config";

import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        console.log("User labels:", user.labels); // Debug: Log labels
        if (user.labels?.includes("admin")) {
          console.log("Active admin session found, redirecting...");
          navigate("/home");
        } else {
          
          await account.deleteSession("current");
        }
      } catch (err) {
        
        console.log("No active session or error:", err);
      }
    };
    checkSession();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Client-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError("Please enter a password");
      setIsLoading(false);
      return;
    }

    try {
      
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      console.log("User labels:", user.labels); 
      if (!user.labels?.includes("admin")) {
        await account.deleteSession("current");
        throw new Error("Unauthorized: Admin access required");
      }
      alert("Login successful!");
      navigate("/home");
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.message.includes("session is active")) {
        setError("A session is already active. Please log out first.");
      } else {
        setError(err.message || "Invalid email or password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Optional: Add logout button for active sessions
  // const handleLogout = async () => {
  //   try {
  //     await account.deleteSession("current");
  //     setError("");
  //     alert("Logged out successfully");
  //   } catch (err) {
  //     console.error("Logout error:", err);
  //     setError("Failed to log out. Please try again.");
  //   }
  // };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-center text-title-sm dark:text-white/90 sm:text-title-md">
              Welcome Again! 
              Please Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your admin email and password to sign in!
            </p>
          </div>
          <div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
            </div>
            <form onSubmit={handleSignIn}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                    error={!!error}
                    hint={error || "Enter your admin email"}
                    className={error ? "animate-shake" : ""}
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                   
                      error={!!error}
                      hint={error || "Enter your password"}
                      className={error ? "animate-shake" : ""}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {error && (
                  <p className="text-sm text-error-500">{error}</p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="flex gap-4">
                  <Button
                    className="w-full"
                    size="sm"
                    // disabled={isLoading}
                    // isLoading={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                  {/* <Button
                    className="w-full"
                    size="sm"
                    variant="outline"
                    onClick={handleLogout}
                    disabled={isLoading}
                  >
                    Log Out
                  </Button> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}