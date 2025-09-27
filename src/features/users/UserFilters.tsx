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
        const rawFilters = Object.fromEntries(formData) as Record<string, string>;

        const filters: UserFilters = {};

        if (rawFilters.organization) filters.organization = rawFilters.organization;
        if (rawFilters.username) filters.username = rawFilters.username;
        if (rawFilters.email) filters.email = rawFilters.email;
        if (rawFilters.phone) filters.phone = rawFilters.phone;
        if (rawFilters.status) filters.status = rawFilters.status;
        if (rawFilters.date) filters.date = rawFilters.date; // ignore time, send date only

        onFilter(filters);
      }}
    >
      <label htmlFor="organization">Organization</label>
      <input id="organization" name="organization" placeholder="Organization" />
      <label htmlFor="username">Username</label>
      <input id="username" name="username" placeholder="Username" />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" placeholder="Email" />
      <label htmlFor="date">Date</label>
      <input id="date" name="date" type="date" />
      <label htmlFor="phone">Phone Number</label>
      <input id="phone" name="phone" placeholder="Phone Number" />
      <label htmlFor="status">Status</label>
      <select id="status" name="status">
        <option value="">Select</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Pending">Pending</option>
        <option value="Blacklisted">Blacklisted</option>
      </select>

      <div className="actions">
        <button
          type="button"
          onClick={() => {
            onReset();
            (e.currentTarget as HTMLFormElement).reset();
          }}
          className="reset"
        >
          Reset
        </button>
        <button type="submit" className="filter">
          Filter
        </button>
      </div>
    </form>
  );
}

