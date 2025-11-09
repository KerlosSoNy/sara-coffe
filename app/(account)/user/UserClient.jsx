"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { loginUser, registerUser } from "@/lib/woocommerce";
import Title from "@/components/Title";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";

export default function UserClient() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const { user, token, login, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  // const redirectTo = searchParams?.redirect || "/";

  useEffect(() => {
    if (!loading && user && token) {
      console.log("✅ User logged in, redirecting to:", redirectTo);
      router.replace(redirectTo);
    }
  }, [user, token, loading, redirectTo, router]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const validatePassword = (password) => {
    const minLength = 6;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    return password.length >= minLength && hasNumber && hasLetter;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isLogin && !validatePassword(password)) {
      toast({
        title: "Password is too weak",
        description:
          "Password must be at least 6 characters and include both numbers and letters.",

        variant: "destructive",
      });
      return;
    }

    try {
      if (isLogin) {
        const response = await loginUser({ username: email, password });
        login(response.token, response.user_display_name);
        toast({
          title: "Login Successful",
          description: "Welcome 👋",
        });
        // no manual router.replace here
      } else {
        await registerUser({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          phone,
        });

        const loginResponse = await loginUser({ username: email, password });
        login(loginResponse.token, loginResponse.user_display_name);

        toast({
          title: "Registration Successful",
          description: "You are now logged into your account",
        });
        // no manual router.replace here
      }
    } catch (err) {
      console.error("Auth Error:", err.response?.data || err.message);
      const message =
        err.response?.data?.message ||
        "An error occurred during the operation.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setError(message);
    }
  };

  return (
    <div className="w-[80%] md:w-[40%] border border-solid container rounded-md pt-5 pb-5 mt-10 mb-20">
      <Title tag="h1" className="font-medium text-2xl pb-8">
        {isLogin ? "Login" : "Register"}
      </Title>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="grid w-full items-center gap-1.5 mb-5">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="First Name"
              />
            </div>
            <div className="grid w-full items-center gap-1.5 mb-5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Last Name"
              />
            </div>
            <div className="grid w-full items-center gap-1.5 mb-5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="97150XXXXXXX"
              />
            </div>
          </>
        )}

        <div className="grid w-full items-center gap-1.5 mb-5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>

        <div className="grid w-full items-center gap-1.5 mb-5 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <span
            className="absolute top-[30px] right-3 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <Button
          type="submit"
          className="bg-[#773D2D] hover:bg-[#964733] w-full"
        >
          {isLogin ? "Login" : "Register"} <MoveRight />
        </Button>
      </form>

      <div className="flex justify-center items-center pt-5">
        <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>

        <Button
          variant="link"
          onClick={toggleForm}
          className="toggle-button ml-2"
        >
          {isLogin ? "Register" : "Login"}
        </Button>
      </div>
    </div>
  );
}
