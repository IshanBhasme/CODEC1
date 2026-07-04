import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Briefcase, Calendar, Shield, LogOut, Edit } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../styles/profile.css';
import '../styles/main.css';

const Profile = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userInitials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const stats = [
    { label: 'Total Leads', value: '128' },
    { label: 'Won Deals', value: '45' },
    { label: 'Conversion', value: '35%' }
  ];

  return (
    <div className="profile-wrapper">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <Navbar
        title="Profile"
        onMenuClick={() => setMobileMenuOpen(true)}
        sidebarCollapsed={sidebarCollapsed}
      />

      <main className={`profile-page ${sidebarCollapsed ? 'expanded' : ''}`}>
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar-large">{userInitials}</div>
              <h2 className="profile-name">{user.name || 'User'}</h2>
              <span className="profile-role-badge">
                <Shield size={14} />
                {user.role || 'Administrator'}
              </span>
            </div>

            <div className="profile-body">
              <div className="profile-section">
                <h3 className="profile-section-title">Account Information</h3>

                <div className="profile-info-item">
                  <div className="profile-info-icon">
                    <User />
                  </div>
                  <div className="profile-info-content">
                    <span className="profile-info-label">Full Name</span>
                    <span className="profile-info-value">{user.name || 'Not provided'}</span>
                  </div>
                </div>

                <div className="profile-info-item">
                  <div className="profile-info-icon">
                    <Mail />
                  </div>
                  <div className="profile-info-content">
                    <span className="profile-info-label">Email Address</span>
                    <span className="profile-info-value">{user.email || 'Not provided'}</span>
                  </div>
                </div>

                <div className="profile-info-item">
                  <div className="profile-info-icon">
                    <Briefcase />
                  </div>
                  <div className="profile-info-content">
                    <span className="profile-info-label">Role</span>
                    <span className="profile-info-value">{user.role || 'Administrator'}</span>
                  </div>
                </div>

                <div className="profile-info-item">
                  <div className="profile-info-icon">
                    <Calendar />
                  </div>
                  <div className="profile-info-content">
                    <span className="profile-info-label">Member Since</span>
                    <span className="profile-info-value">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'January 2024'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3 className="profile-section-title">Performance</h3>
                <div className="profile-stats">
                  {stats.map((stat, index) => (
                    <div key={index} className="profile-stat-item">
                      <span className="profile-stat-value">{stat.value}</span>
                      <span className="profile-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="profile-actions">
                <button className="btn btn-primary">
                  <Edit size={16} />
                  Edit Profile
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
