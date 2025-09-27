type StarRatingProps = {
    rating: number; // 0 to 3
};

const Star: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={filled ? "#E9B200" : "none"}
        stroke="#E9B200"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: 4 }}
    >
        <polygon points="12 2 15 9 22 9.3 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 9" />
    </svg>
);

const StarRating: React.FC<StarRatingProps> = ({ rating }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {[1, 2, 3].map((star) => (
            <Star key={star} filled={star <= rating} />
        ))}
    </div>
);

export default StarRating;