import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: '#0f0e47', color: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
          <h2>Welcome to Your Dashboard, {userName}!</h2>
          <button onClick={handleLogout} style={{ marginTop: '10px', padding: '8px 16px', background: '#ff6b6b', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px' }}>
          <h3>Your Learning Progress</h3>
          <p>You haven't enrolled in any courses yet. Start learning today!</p>
          <button onClick={() => navigate('/')} style={{ marginTop: '10px', padding: '8px 16px', background: '#0f0e47', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Browse Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;