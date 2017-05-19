const locale = 'en-gb';
const defaults = {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
};

export const formattedDate = (date, options) => (
  new Date(date).toLocaleString(locale, { ...defaults, ...options })
)
