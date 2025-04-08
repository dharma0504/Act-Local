import React, { useState, useEffect } from 'react';

const VolunteerDashboard = () => {
  const userId = 1; // Replace this with dynamic login logic, e.g., from localStorage or authentication state

  // States for user data, posts, editing forms
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [editUser, setEditUser] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ username: '', email: '' });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`);
      const data = await response.json();
      setUserData(data);
      setEditedUserData({ username: data.username, email: data.email });
    };

    // Fetch posts of the user
    const fetchPosts = async () => {
      const response = await fetch(`http://localhost:3001/posts?userId=${userId}`);
      const data = await response.json();
      setPosts(data);
    };

    fetchUserData();
    fetchPosts();
  }, [userId]);

  const handlePostChange = (e) => {
    setNewPostContent(e.target.value);
  };

  const handlePostSubmit = async () => {
    if (newPostContent) {
      const newPost = {
        userId,
        content: newPostContent,
      };
      const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([...posts, data]);
      setNewPostContent('');
    }
  };

  const handlePostDelete = async (postId) => {
    await fetch(`http://localhost:3001/posts/${postId}`, {
      method: 'DELETE',
    });
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleEditProfile = async () => {
    if (!editedUserData.username || !editedUserData.email) {
      alert('Username and email are required!');
      return;
    }

    await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedUserData),
    });
    setUserData(editedUserData);
    setEditUser(false);
  };

  const handleEditPassword = async () => {
    if (!newPassword) {
      alert('Please enter a new password.');
      return;
    }

    const updatedUserData = { ...userData, password: newPassword };

    await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUserData),
    });
    setUserData(updatedUserData);
    setEditPassword(false);
    setNewPassword('');
  };

  return (
    <div className="volunteer-dashboard">
      <h1>Volunteer Dashboard</h1>

      {/* Profile Section */}
      <div className="profile">
        <h2>Profile</h2>
        {userData && (
          <>
            {editUser ? (
              <div>
                <label>Username: </label>
                <input
                  type="text"
                  value={editedUserData.username}
                  onChange={(e) =>
                    setEditedUserData({ ...editedUserData, username: e.target.value })
                  }
                />
                <br />
                <label>Email: </label>
                <input
                  type="email"
                  value={editedUserData.email}
                  onChange={(e) =>
                    setEditedUserData({ ...editedUserData, email: e.target.value })
                  }
                />
                <br />
                <button onClick={handleEditProfile}>Save Changes</button>
              </div>
            ) : (
              <div>
                <p>Username: {userData.username}</p>
                <p>Email: {userData.email}</p>
                <button onClick={() => setEditUser(true)}>Edit Profile</button>
              </div>
            )}

            {editPassword ? (
              <div>
                <label>New Password: </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <br />
                <button onClick={handleEditPassword}>Change Password</button>
              </div>
            ) : (
              <div>
                <button onClick={() => setEditPassword(true)}>Change Password</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Posts Section */}
      <div className="posts">
        <h2>Your Posts</h2>
        <textarea
          placeholder="Write a new post..."
          value={newPostContent}
          onChange={handlePostChange}
        />
        <button onClick={handlePostSubmit}>Post</button>

        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <p>{post.content}</p>
              <button onClick={() => handlePostDelete(post.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
