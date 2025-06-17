/**
 * Formats a given date input into a 'YYYY-MM-DD' string.
 *
 * @param {Date | string | number} dateInput - The date to format.
 * Can be a Date object, a valid date string (e.g., "2025-01-15", "Jan 15 2025"),
 * or a number representing milliseconds since epoch.
 * @returns {string | null} The formatted date string (e.g., '2025-01-15')
 * or `null` if the input is invalid.
 */

export const toYYYYMMDD = (dateInput) => {
  let d;

  try {
    d = new Date(dateInput);
  } catch (error) {
    console.error("Error creating Date object:", error);
    return null; 
  }

  if (isNaN(d.getTime())) {
    console.error("Invalid date input provided:", dateInput);
    return null; 
  }

  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);

  return `${year}-${month}-${day}`;
};



/**
 * Formats a given date string in 'DD/MM/YYYY' format into a 'DD Mon YYYY'
 * string.
 *
 * @param {string} dateString - The date string to format.
 * Must be in the format 'DD/MM/YYYY'.
 * @returns {string} The formatted date string (e.g., '15 Jul 2025')
 * or the original string if the input is invalid.
 */
export const formatToDDMonYYYY = (dateString) => {
  if (!dateString) return '';

  const parts = dateString.split('/');
  if (parts.length !== 3) {
    console.error("Invalid date format, expected DD/MM/YYYY:", dateString);
    return dateString;
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day);

  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  return date.toLocaleDateString('en-GB', options);
};

