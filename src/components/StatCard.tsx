'use client';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, unit }) => {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {unit && <div className="stat-unit">{unit}</div>}
    </div>
  );
};

export default StatCard;