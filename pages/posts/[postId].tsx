import { useRouter  } from "next/router";
import usePost from "@/hooks/usePost";
import { PuffLoader } from "react-spinners";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import Form from "@/components/Form";
import CommentFeed from "@/components/posts/CommentFeed";

const Post = () => {
  const router = useRouter();

  const { postId } = router.query;
  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <PuffLoader color="lightblue" size={70} />
      </div>
    )
  }

  return ( 
    <>
      <Header label="Chit" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form postId={postId as string} isComment placeholder="Chit your reply" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
}
 
export default Post;