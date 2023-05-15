import CommentItem from "./CommentItem";

interface ICommentFeedProps {
  comments: Record<string, any>[];
}

const CommentFeed:React.FC<ICommentFeedProps> = ({comments = []}) => {
  return (
    <>
      {comments.map((comment)=> (
          <CommentItem key={comment.id} data={comment} />
        )
      )}
    </>
  );
}
 
export default CommentFeed;