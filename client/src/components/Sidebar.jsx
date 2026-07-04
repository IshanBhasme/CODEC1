import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  ChevronLeft,
} from 'lucide-react';
import '../styles/sidebar.css';

const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userInitials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/leads', label: 'Lead Management', icon: Users },
  ];

  return (
    <>
      <aside
        className={`sidebar ${collapsed ? 'collapsed' : ''} ${
          mobileOpen ? 'mobile-open' : ''
        }`}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <Briefcase />
            </div>
            <span className="sidebar-logo-text">CRM Pro</span>
          </div>

          <button className="sidebar-toggle" onClick={onToggle}>
            <ChevronLeft size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-nav-section">
            <span className="sidebar-nav-title">Main Menu</span>

            <ul className="sidebar-nav-list">
              {navItems.map((item) => (
                <li key={item.path} className="sidebar-nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `sidebar-nav-link ${isActive ? 'active' : ''}`
                    }
                    onClick={onMobileClose}
                  >
                    <span className="sidebar-nav-icon">
                      <item.icon />
                    </span>

                    <span className="sidebar-nav-text">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="sidebar-footer">
          <NavLink
            to="/profile"
            className="sidebar-user"
            onClick={onMobileClose}
          >
            <div className="sidebar-user-avatar">
              {userInitials}
            </div>

            <div className="sidebar-user-info">
              <span className="sidebar-user-name">
                {user.name || 'User'}
              </span>

              <span className="sidebar-user-role">
                {user.role || 'Admin'}
              </span>
            </div>
          </NavLink>
        </div>
      </aside>

      <div
        className={`sidebar-overlay ${
          mobileOpen ? 'active' : ''
        }`}
        onClick={onMobileClose}
      />
    </>
  );
};

export default Sidebar;