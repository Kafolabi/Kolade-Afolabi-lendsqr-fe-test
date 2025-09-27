export type UserDetailsInfoItemProps = {
  label: string;
  value?: React.ReactNode;
};

export const UserDetailsInfoItem = ({
  label,
  value,
}: UserDetailsInfoItemProps) => (
  <div className="info-item">
    <strong>{label}</strong>
    <span>{value ?? "-"}</span>
  </div>
);

// export default UserDetailsInfoItem;
