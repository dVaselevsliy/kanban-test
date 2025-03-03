/* helper function to format date */
export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays === 0) {
    if (diffInHours === 0) {
      if (diffInMinutes === 0) {
        return 'Just now';
      } else {
        return `opened${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
      }
    } else {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
  } else if (diffInDays === 1) {
    return '1 day ago';
  } else {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
}