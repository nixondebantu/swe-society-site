"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { BACKENDURL } from "@/data/urls";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export function SignInCard() {
  const { toast } = useToast();
  const [regno, setRegno] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [longsession, setLongsession] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (regno === "" || password === "") {
      toast({
        variant: "destructive",
        title: "Credential missing",
        description: "Enter registration number and password to login",
        duration: 3000,
      });
    } else {
      try {
        const response = await axios.post(`${BACKENDURL}auth/login`, {
          regno,
          password,
          longsession,
        });
        if (response.status === 200) {
          toast({
            title: "Logged in successfully",
            description: `${response.data.user.fullname} welcome to SWE Society`,
          });
          // redirect to "/dashboard/profile"
        }
      } catch (error: any) {
        if (error.response.status === 404) {
          toast({
            title: error.response.data.message,
          });
        } else if (error.response.status === 500) {
          toast({
            title: error.response.data.message,
            description: error.response.data.details,
          });
        }
      }
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Enter your credential below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="number">Registration Number</Label>
          <Input
            id="number"
            type="number"
            placeholder="2020831000"
            value={regno}
            onChange={(e) => setRegno(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-items-start items-center gap-2">
          <Checkbox
            id="remember"
            checked={longsession}
            onClick={(e) => setLongsession(!longsession)}
          />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me for a month
          </label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col ">
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Sign in
        </Button>
        <Link
          href="/forgetpass"
          className="ml-auto py-2 inline-block text-sm underline"
        >
          Forgot your password?
        </Link>
      </CardFooter>
    </Card>
  );
}
