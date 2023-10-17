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

  if (days > 1) {
    return days + " days ago";
  } else if (hours > 1) {
    return hours + " hours ago";
  } else if (minutes > 1) {
    return minutes + " minutes ago";
  } else if (seconds > 1) {
    return seconds + " seconds ago";
  } else {
    return "just now";
  }
};


export const convertDate = (dateStr) => {
	const options = { year: 'numeric', month: 'long' };
	const date = new Date(dateStr);
	return date.toLocaleDateString('en-US', options);
  }
