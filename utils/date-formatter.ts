export const formatDate = (date: Date) => {
  // Use a consistent format that doesn't depend on locale
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
} 