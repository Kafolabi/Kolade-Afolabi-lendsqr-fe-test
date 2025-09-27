import "../../styles/components/_usercard.scss";

type UserCardProps = {
  icon: string;
  label: string;
  value: string | number;
};

function UserCard({ icon, label, value }: UserCardProps) {
  return (
    <div className="user-card">
      <div className="user-card__icon">
        <img src={icon} alt={label} />
      </div>
      <div className="user-card__content">
        <p className="user-card__label">{label}</p>
        <h2 className="user-card__value">{value}</h2>
      </div>
    </div>
  );
}

export default UserCard;
