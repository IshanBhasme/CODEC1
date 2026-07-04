import { TrendingUp, TrendingDown } from 'lucide-react';

const DashboardCard = ({ title, value, icon: Icon, trend, trendValue, color = 'primary' }) => {
  const trendUp = trend === 'up';

  return (
    <div className="stat-card" style={{ '--card-accent': `var(--${color}-500, var(--primary-500))` }}>
      <div className="stat-card-header">
        <div className={`stat-card-icon ${color}`}>
          <Icon />
        </div>
        {trendValue && (
          <span className={`stat-card-trend ${trendUp ? 'up' : 'down'}`}>
            {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trendValue}
          </span>
        )}
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{title}</div>
    </div>
  );
};

export default DashboardCard;
