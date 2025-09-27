import {
  type UserDetailsInfoItemProps,
  UserDetailsInfoItem,
} from "./UserDetailsInfoItem";

type UserDetailsInfoSectionProps = {
  title: string;
  items: UserDetailsInfoItemProps[];
};

const UserDetailsInfoSection = ({
  title,
  items,
}: UserDetailsInfoSectionProps) => (
  <section>
    <h4>{title}</h4>
    <div className="info-grid">
      {items.map((item, i) => (
        <UserDetailsInfoItem key={i} {...item} />
      ))}
    </div>
  </section>
);

export default UserDetailsInfoSection;