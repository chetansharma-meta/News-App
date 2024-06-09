

export function formatDateTime(isoString: string): string {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInMonth = 30 * secondsInDay;
    const secondsInYear = 365 * secondsInDay;
  
    if (diffInSeconds < secondsInMinute) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < secondsInHour) {
      const minutes = Math.floor(diffInSeconds / secondsInMinute);
      return `${minutes} minutes ago`;
    } else if (diffInSeconds < secondsInDay) {
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours} hours ago`;
    } else if (diffInSeconds < secondsInMonth) {
      const days = Math.floor(diffInSeconds / secondsInDay);
      return `${days} days ago`;
    } else if (diffInSeconds < secondsInYear) {
      const months = Math.floor(diffInSeconds / secondsInMonth);
      return `${months} months ago`;
    } else {
      const years = Math.floor(diffInSeconds / secondsInYear);
      return `${years} years ago`;
    }
  }
  