"use client"
import { useState } from "react";
import userRegister from "@/libs/Auth/userRegister";
import { useRouter } from 'next/navigation';
import InputForm from "@/components/InputForm";
import CircularProgress from '@mui/material/CircularProgress';

const SignUp = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    const role = 'user';
    e.preventDefault();
    setError("");
    setLoading(true);

    if(tel.length != 0 && /[^0-9]/.test(tel)){
      setError("Invalid Tel.");
      setLoading(false);
      return;
    }

    if(password.length < 6){
      setError("Password is too short");
      setLoading(false);
      return;
    }

    if(name && email && password && role && tel){
      const response = await userRegister(name,email,password,role,tel);
      if(response.success){
        setLoading(false);
        router.push('/');
      }
      else{
        setLoading(false);
        setError("Invalid information");
      }
    }
  };

    if(loading){
        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <CircularProgress />
            </div>
        )
    }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 bg-blue-900">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-white">
      Sign Up
    </h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSignUp} className="space-y-6">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <InputForm onInputChange={(value: string) => { setName(value); }} labelText="Name" />
      <InputForm onInputChange={(value: string) => { setEmail(value); }} labelText="Email" />
      <InputForm onInputChange={(value: string) => { setPassword(value); }} labelText="Password" />
      <InputForm onInputChange={(value: string) => { setTel(value); }} labelText="Tel." />

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-400">
      Already a Member?{' '}
      <a href="/auth/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
        Sign In
      </a>
    </p>
  </div>
</div>

  );
};

export default SignUp;
