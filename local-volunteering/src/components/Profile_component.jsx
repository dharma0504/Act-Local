import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Get the logged-in user's ID from localStorage
  const loggedInUserId = localStorage.getItem('loggedInUserId');

  useEffect(() => {
    if (!loggedInUserId) {
      setError('No user logged in');
      setLoading(false);
      return;
    }

    // Fetch all users from the JSON server
    axios
      .get('http://localhost:3001/users') // Ensure the correct endpoint for users
      .then((response) => {
        const user = response.data.find(user => user.id === loggedInUserId);
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
          setError('User not found.');
          setLoading(false);
        }
      })
      .catch((err) => {
        setError('Error fetching user data');
        setLoading(false);
        console.error('Error fetching user data:', err); // Log the error for debugging
      });
  }, [loggedInUserId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.profileContainer}>
      <div style={styles.profileHeader}>
        <img src={user.profilePic || 'https://via.placeholder.com/150'} alt="Profile" style={styles.profilePic} />
        <div style={styles.profileInfo}>
          <h2>{user.username}</h2>
          <div style={styles.role}>{user.role}</div>
        </div>
      </div>

      <div style={styles.profileDetails}>
        <div style={styles.profileDetail}>
          <strong>Email:</strong> {user.email}
        </div>
        <div style={styles.profileDetail}>
          <strong>Phone:</strong> {user.phone || 'Not provided'}
        </div>
      </div>

      <div style={styles.requestsContainer}>
        {user.role === 'volunteer' ? (
          <>
            <h3>Upcoming Requests:</h3>
            <div style={styles.requestsList}>
              {/* Display requests for volunteers */}
              <div style={styles.requestItem}>
                <strong>Beach cleanup drive</strong>
                <p>Join us for a beach cleanup drive this weekend.</p>
              </div>
              <div style={styles.requestItem}>
                <strong>Blood Donation Camp</strong>
                <p>Set up a blood donation camp.</p>
              </div>
            </div>
          </>
        ) : (
          <div style={styles.requestItem}>You are an organization. Manage your requests.</div>
        )}
      </div>
    </div>
  );
};

const styles = {
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f4f7fb',
    borderRadius: '10px',
    maxWidth: '600px',
    margin: 'auto',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '10px',
  },
  profilePic: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginRight: '20px',
  },
  profileInfo: {
    flexDirection: 'column',
  },
  role: {
    fontSize: '14px',
    color: '#888',
  },
  profileDetails: {
    marginTop: '20px',
    width: '100%',
  },
  profileDetail: {
    marginBottom: '10px',
    fontSize: '16px',
  },
  requestsContainer: {
    marginTop: '20px',
    width: '100%',
  },
  requestsList: {
    display: 'flex',
    flexDirection: 'column',
  },
  requestItem: {
    padding: '15px',
    backgroundColor: '#ffffff',
    marginBottom: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
  },
};

export default ProfilePage;