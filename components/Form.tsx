"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";
import useRegisterModal from "@/hooks/useRegisterModal";
import Button from "./Button";
import Avatar from "./Avatar";

interface IFormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form:React.FC<IFormProps> = ({
  placeholder, isComment, postId
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const {data: currentUser} = useCurrentUser();
  const { mutate: mutatePosts } = usePosts(postId as "string");
  const { mutate: mutatePost } = usePost(postId as "string");

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";
      await axios.post(url, {body});
      toast.success("Chit created!");
      setBody("");
      mutatePosts();
      mutatePost();
    } catch(error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, mutatePost, isComment, postId]);
   
  return (
    <div className="border-b-[1px] border-gray-300 px-5 py-2">
      {currentUser ? (
        <div className="flex gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              placeholder={placeholder}
              className="w-full bg-white ring-0 mt-3 peer resize-none outline-0  disabled:opacity-80 text-[18px] placeholder-neutral-300 text-gray-700"
              >
            </textarea>
            <hr className="w-full border-neutral-300 opacity-0 peer-focus:opacity-100 h-[1px] transition" />
            <div className="flex justify-end mt-4">
              <Button 
                disabled={isLoading || !body }
                label="Chit" 
                onClick={onSubmit} 
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="mb-4 font-bold text-center text-2xl text-gray-600">Welcome to Chitter!</h1>
          <div className="flex items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
      
    </div>
  );
}
 
export default Form;