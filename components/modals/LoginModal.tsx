import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal  from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onModalToggle = useCallback(()=> {
    if (isLoading) return;

    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, loginModal, registerModal])

  const onSubmit = useCallback (async ()=> {
    try {
      setIsLoading(true);

      await signIn("credentials", {
        email,
        password
      })

      loginModal.onClose();
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
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
      <span className="mr-2">First time here?</span>
      <a onClick={onModalToggle}
          className="
            text-sky-500
            cursor-pointer
            hover:opacity-70
            transition
          "
        >Create account</a>
    </div>
  )

  return (
    <div>
      <Modal
        title="Login"
        actionLabel="Sign in"
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
}

export default LoginModal;