import { Search, Bell, Settings, Menu } from 'lucide-react';
import '../styles/navbar.css';

const Navbar = ({ title, onMenuClick, sidebarCollapsed }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userInitials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

  return (
    <header className={`navbar ${sidebarCollapsed ? 'expanded' : ''}`}>
      <div className="navbar-left">
        <button className="navbar-menu-btn" onClick={onMenuClick}>
          <Menu />
        </button>
        <div>
          <h1 className="navbar-title">{title}</h1>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-search">
          <Search className="navbar-search-icon" size={18} />
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search leads, deals..."
          />
        </div>

        <button className="navbar-icon-btn">
          <Bell />
          <span className="navbar-badge">3</span>
        </button>

        <button className="navbar-icon-btn">
          <Settings />
        </button>

        <div className="navbar-divider" />

        <div className="navbar-user">
          <div className="navbar-user-avatar">{userInitials}</div>
          <div className="navbar-user-info">
            <span className="navbar-user-name">{user.name || 'User'}</span>
            <span className="navbar-user-role">{user.role || 'Admin'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
