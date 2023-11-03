import { format, isValid } from "date-fns";

export const formatDate = (string, withFormat = "dd/MM/yyyy", locale) => {
  return string && isValid(new Date(string))
    ? format(new Date(string), withFormat)
    : null;
};

export const formatTime = (time) => {
  if (time === 0) {
    return "00";
  }
};

export const timeAgo = (dateString) => {
  const currentTime = new Date();
  const targetTime = new Date(dateString);
  const timeDifference = currentTime - targetTime;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    if (days === 1) {
      return "Yesterday";
    } else {
      return days + " days ago";
    }
  } else if (hours > 0) {
    return hours + "h ago";
  } else if (minutes > 0) {
    return minutes + "m ago";
  } else if (seconds >= 0) {
    return "Just now";
  } else {
    return "Invalid date";
  }
};

export const convertDate = (dateStr) => {
  const options = { year: "numeric", month: "long" };
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", options);
};
