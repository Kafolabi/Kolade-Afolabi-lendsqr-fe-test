import "../../styles/features/_userfilter.scss";

type UserFilters = {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phone?: string;
  status?: string;
};

type Props = {
  onFilter: (filters: UserFilters) => void;
  onReset: () => void;
};

export default function UserFilter({ onFilter, onReset }: Props) {
  return (
    <form
      className="user-filter"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onFilter(Object.fromEntries(formData));
      }}
    >
      <input name="organization" placeholder="Organization" />
      <input name="username" placeholder="Username" />
      <input name="email" placeholder="Email" />
      <input name="date" type="date" />
      <input name="phone" placeholder="Phone Number" />
      <select name="status">
        <option value="">Select</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Pending">Pending</option>
        <option value="Blacklisted">Blacklisted</option>
      </select>

      <div className="actions">
        <button type="button" onClick={onReset} className="reset">
          Reset
        </button>
        <button type="submit" className="filter">
          Filter
        </button>
      </div>
    </form>
  );
}
