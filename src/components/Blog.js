import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './Blog.css'; // Import the CSS file

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  useEffect(() => {
    fetchPosts();
  }, []);
 
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePost = async () => {
    try {
      await axios.post('http://127.0.0.1:3000/posts', { title, content });
      fetchPosts();
      setTitle('');
      setContent('');
      alert('tweet created successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to create tweet');
    }
  };

  const handleEditPost = async (postId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/posts/${postId}`);
      let { title, content } = response.data;
      setTitle(title);
      setContent(content);
    } catch (error) {
      console.error(error);
      alert('Failed to edit tweet');
    }
  };

  const handleUpdatePost = async (postId) => {
    try {
      await axios.put(`http://127.0.0.1:3000/posts/${postId}`, { title, content });
      fetchPosts();
      setTitle('');
      setContent('');
      alert('tweet updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update tweet');
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/posts/${postId}`);
      fetchPosts();
      alert('tweet deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete tweet');
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h3><center>tweets</center></h3>
        <form>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" className="form-control medium-input" placeholder="your topic here.." value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea className="form-control medium-input" placeholder="your content here..." value={content} onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
          <center><Button className="btn-green" onClick={handleCreatePost}>Create tweet</Button></center>
        </form>
      </div>
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <div className="button-group">
                    <Button className="btn-green" onClick={() => handleEditPost(post.id)}>Alter</Button>
                    <Button className="btn-green" onClick={() => handleUpdatePost(post.id)}>Update</Button>
                    <Button className="btn-green" onClick={() => handleDeletePost(post.id)}>Remove</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
