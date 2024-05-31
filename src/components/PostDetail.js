// src/components/PostDetail.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, updateDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const postRef = doc(db, 'posts', postId);
    const unsubscribePost = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        setPost({ id: doc.id, ...doc.data() });
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribePost();
    };
  }, [postId]);

  const handleReply = async () => {
    if (!user) {
      alert('You must be logged in to reply to a post.');
      return;
    }
    try {
      const postRef = doc(db, 'posts', postId);
      const updatedReplies = [...(post.replies || []), {
        content: replyContent,
        author: user.email,
        authorId: user.uid,
        createdAt: Timestamp.now()
      }];
      await updateDoc(postRef, { replies: updatedReplies });
      setPost(prevPost => ({
        ...prevPost,
        replies: updatedReplies
      }));
      setReplyContent('');
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleDeleteReply = async (replyIndex) => {
    if (!user) {
      alert('You must be logged in to delete a reply.');
      return;
    }
    try {
      const postRef = doc(db, 'posts', postId);
      const updatedReplies = post.replies.filter((_, index) => index !== replyIndex);
      await updateDoc(postRef, { replies: updatedReplies });
      setPost(prevPost => ({
        ...prevPost,
        replies: updatedReplies
      }));
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="postDetailContainer">
      <h2>{post.content}</h2>
      <p><strong>Tag:</strong> {post.tag}</p>
      {post.createdAt && <p><small>Posted on: {post.createdAt.toDate().toLocaleString()}</small></p>}
      <div className="replies">
        {(post.replies || []).map((reply, index) => (
          <div key={index} className="reply">
            <p>{reply.content}</p>
            <p><small>By: {reply.author}</small></p>
            {reply.createdAt && <p><small>Replied on: {reply.createdAt.toDate().toLocaleString()}</small></p>}
            {user && user.uid === reply.authorId && (
              <button onClick={() => handleDeleteReply(index)} className="button deleteButton">Delete</button>
            )}
          </div>
        ))}
      </div>
      {user && (
        <div className="replyInput">
          <input
            type="text"
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button onClick={handleReply}>Reply</button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
