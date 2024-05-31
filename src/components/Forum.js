// src/components/Forum.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot, query, where, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [tag, setTag] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const q = selectedTag ? query(collection(db, 'posts'), where('tag', '==', selectedTag)) : collection(db, 'posts');
    const unsubscribePosts = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribePosts();
    };
  }, [selectedTag]);

  const handleAddPost = async () => {
    if (!user) {
      alert('You must be logged in to add a post.');
      return;
    }
    try {
      await addDoc(collection(db, 'posts'), {
        content: newPost,
        tag,
        replies: [],
        authorId: user.uid,
        createdAt: Timestamp.now()
      });
      setNewPost('');
      setTag('');
      alert('Message sent');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  

  const handleDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const fuse = new Fuse(posts, {
    keys: ['content', 'tag', 'replies.content'],
    includeScore: true
  });

  const filteredPosts = searchQuery ? fuse.search(searchQuery).map(result => result.item) : posts;

  return (
    <div className="forumContainer">
      <h1>Forum</h1>
      {user ? (
        <div className="forumInput">
          <input
            type="text"
            placeholder="Post content"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="inputField"
          />
          <input
            type="text"
            placeholder="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="inputField"
          />
          <button onClick={handleAddPost} className="button">Add Post</button>
        </div>
      ) : (
        <p>Please log in to add and see a post.</p>
      )}
      <div className="forumFilter">
        <h2>Filter by Tag</h2>
        <input
          type="text"
          placeholder="Enter tag"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="inputField"
        />
      </div>
      <div className="forumSearch">
        <h2>Search Posts</h2>
        <input
          type="text"
          placeholder="Search posts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="inputField"
        />
      </div>
      <div className="forumPosts">
        <h2>Posts</h2>
        {filteredPosts.map((post) => (
          <div key={post.id} className="forumPost">
            <Link to={`/posts/${post.id}`}>
              <p>{post.content}</p>
            </Link>
            <p><strong>Tag:</strong> {post.tag}</p>
            {post.createdAt && <p><small>Posted on: {post.createdAt.toDate().toLocaleString()}</small></p>}
            {user && user.uid === post.authorId && (
              <button onClick={() => handleDeletePost(post.id)} className="button deleteButton">Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
