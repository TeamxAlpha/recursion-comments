import React, { useState } from 'react';
import './App.css'; 

interface CommentProps {
  text: string;
  replies: CommentProps[];
}

const Comment: React.FC<CommentProps> = ({ text, replies }) => (
  <div className="comment">
    <p>{text}</p>
    <div className="replies">
      {replies.map((reply, index) => (
        <Comment key={index + 1} {...reply} />
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [comments, setComments] = useState<CommentProps[]>([]);

  const addReply = (commentIndex: number, replyText: string) => {
    const updatedComments = [...comments];
    const reply: CommentProps = { text: replyText, replies: [] };
    updatedComments[commentIndex].replies.push(reply);
    setComments(updatedComments);
    setNewReplyText(''); 
  };

  const addComment = (commentText: string) => {
    const newComment: CommentProps = {
      text: commentText,
      replies: [],
    };
    setComments([...comments, newComment]);
    setNewCommentText('');
  };

  const [newCommentText, setNewCommentText] = useState('');
  const [newReplyText, setNewReplyText] = useState('');

  return (
    <div className="app">
      <h1>Comment Section</h1>
      <div className="add-comment">
        <input
          type="text"
          placeholder="Add a new comment"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <button onClick={() => addComment(newCommentText)}>Add Comment</button>
      </div>
      {comments.map((comment, index) => (
        <div className="comment-container" key={index}>
          <Comment {...comment} />
          <div className="add-reply">
            <input
              type="text"
              placeholder={`Add a reply to comment ${index + 1}`}
              value={newReplyText}
              onChange={(e) => setNewReplyText(e.target.value)}
            />
            <button onClick={() => addReply(index, newReplyText)} >Add Reply</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
