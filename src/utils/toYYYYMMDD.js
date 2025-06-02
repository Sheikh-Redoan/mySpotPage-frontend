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