"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onModalToggle = useCallback(()=> {
    if (isLoading) return;

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, loginModal, registerModal])

  const onSubmit = useCallback(async ()=> {
    try {
      setIsLoading(true);

      await axios.post("api/register", {
        name, email, username, password
      });

      toast.success("Account created");

      signIn('credentials', {
        email,
        password
      });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.success("Opps, smth. went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, name, email, username, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(e)=>setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e)=>setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className="mt-4 text-center text-neutral-400">
      <span className="mr-2">Already have an account?</span>
      <a onClick={onModalToggle}
          className="
            text-sky-500
            cursor-pointer
            hover:opacity-70
            transition
          "
        > Sign in</a>
    </div>
  )

  return (
    <div>
      <Modal
        title="Create an account"
        actionLabel="Register"
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
}

export default RegisterModal;