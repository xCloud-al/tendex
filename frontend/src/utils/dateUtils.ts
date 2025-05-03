/**
 * Format a date string to a readable format
 * @param dateString - The date string to format
 * @returns Formatted date string (e.g., "May 15, 2025")
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Calculate the number of days until a deadline
 * @param deadlineString - The deadline date string
 * @returns Number of days until the deadline or null if deadline has passed
 */
export const daysUntil = (deadlineString: string): number | null => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const deadline = new Date(deadlineString);
  deadline.setHours(0, 0, 0, 0);
  
  const diffTime = deadline.getTime() - today.getTime();
  if (diffTime < 0) return null;
  
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};