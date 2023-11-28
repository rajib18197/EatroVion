import { useState } from "react";

const containerStyles = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainer = {
  display: "flex",
};

const textStyle = {
  fontSize: "20px",
  lineHeight: 1,
  margin: 0,
};

export default function StarRating({
  maxRating = 5,
  color = "red",
  size = "48",
  messages = [
    { text: "terrible", color: "#101d48" },
    { text: "bad", color: "#90caf9" },
    { text: "okay", color: "#e57373" },
    { text: "good", color: "#f57c00" },
    { text: "Amazing", color: "#66bb6a" },
  ],
}) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating((curRating) => (rating === curRating ? 0 : rating));
    setTempRating(0);
  }

  return (
    <div style={containerStyles}>
      <div style={starContainer}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            isFull={tempRating ? i + 1 <= tempRating : i + 1 <= rating}
            isHover={tempRating === i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={
              messages.length === maxRating
                ? (tempRating >= i + 1
                    ? messages[tempRating - 1].color
                    : color) ||
                  (rating >= i + 1 ? messages[tempRating - 1].color : color)
                : color
            }
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? (tempRating ? messages[tempRating - 1].text : "") ||
            (rating ? messages[rating - 1].text : "")
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

function Star({ isFull, isHover, onRate, onHoverIn, onHoverOut, color, size }) {
  const starStyles = {
    width: `${size}px`,
    height: `${size}px`,

    display: "block",
    cursor: "pointer",
    ...(isHover && { transform: "scale(1.15)" }),
    transition: "all .3s",
  };

  return (
    <span
      style={starStyles}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {isFull ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
