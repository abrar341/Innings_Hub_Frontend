// utils/dateFormatter.js
export const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    // Format as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero

    return `${year}-${month}-${day}`; // Example: 2024-09-01
};
