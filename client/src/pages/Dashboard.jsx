import { useState, useEffect } from 'react';
import { Users, UserPlus, CheckCircle, Award, ArrowUpRight, Mail, Phone, TrendingUp } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DashboardCard from '../components/DashboardCard';
import { leadsService } from '../services/api';
import '../styles/dashboard.css';
import '../styles/main.css';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    qualified: 0,
    won: 0
  });

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await leadsService.getAll();
      const leadsData = response.data || [];

      setLeads(leadsData);

      // Calculate stats
      setStats({
        total: leadsData.length,
        new: leadsData.filter(l => l.status === 'New').length,
        qualified: leadsData.filter(l => l.status === 'Qualified').length,
        won: leadsData.filter(l => l.status === 'Won').length
      });
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getRecentActivity = () => {
    return leads.slice(0, 5).map(lead => ({
      id: lead._id || lead.id,
      name: lead.name,
      status: lead.status,
      company: lead.company,
      createdAt: lead.createdAt
    }));
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <Navbar
        title="Dashboard"
        onMenuClick={() => setMobileMenuOpen(true)}
        sidebarCollapsed={sidebarCollapsed}
      />

      <main className={`dashboard ${sidebarCollapsed ? 'expanded' : ''}`}>
        <div className="dashboard-content">
          {/* Welcome Card */}
          <div className="welcome-card">
            <div className="welcome-content">
              <p className="welcome-greeting">{getGreeting()},</p>
              <h1 className="welcome-title">{user.name || 'User'}</h1>
              <p className="welcome-subtitle">Here's what's happening with your leads today.</p>
              <div className="welcome-stats">
                <div className="welcome-stat">
                  <span className="welcome-stat-value">{stats.total}</span>
                  <span className="welcome-stat-label">Total Leads</span>
                </div>
                <div className="welcome-stat">
                  <span className="welcome-stat-value">{stats.won}</span>
                  <span className="welcome-stat-label">Won Deals</span>
                </div>
                <div className="welcome-stat">
                  <span className="welcome-stat-value">$0</span>
                  <span className="welcome-stat-label">Revenue</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <DashboardCard
              title="Total Leads"
              value={stats.total}
              icon={Users}
              trend="up"
              trendValue="12%"
              color="primary"
            />
            <DashboardCard
              title="New Leads"
              value={stats.new}
              icon={UserPlus}
              trend="up"
              trendValue="8%"
              color="info"
            />
            <DashboardCard
              title="Qualified"
              value={stats.qualified}
              icon={TrendingUp}
              trend="up"
              trendValue="5%"
              color="warning"
            />
            <DashboardCard
              title="Won Deals"
              value={stats.won}
              icon={CheckCircle}
              trend="up"
              trendValue="15%"
              color="success"
            />
          </div>

          {/* Recent Activity */}
          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title">Recent Activity</h2>
              <a className="dashboard-section-action" href="/leads">View All</a>
            </div>

            {loading ? (
              <div className="loading-placeholder">
                <p>Loading activity...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="empty-state">
                <p>No recent activity to display.</p>
              </div>
            ) : (
              <div className="activity-list">
                {getRecentActivity().map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${(activity.status || 'new').toLowerCase()}`}>
                      {activity.status === 'New' && <Mail size={18} />}
                      {activity.status === 'Contacted' && <Phone size={18} />}
                      {activity.status === 'Qualified' && <TrendingUp size={18} />}
                      {activity.status === 'Won' && <CheckCircle size={18} />}
                      {activity.status === 'Proposal' && <Award size={18} />}
                    </div>
                    <div className="activity-content">
                      <p className="activity-title">{activity.name}</p>
                      <p className="activity-description">
                        {activity.company || 'No company'} - {activity.status}
                      </p>
                    </div>
                    <span className="activity-time">
                      {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
