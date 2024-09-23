// utils/dateFormatter.js
export const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    // Format as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero

    return `${day}.${month}.${year}`; // Example: 2024-09-01
};


export const convertTo12HourFormat = (time) => {
    // Split the time into hours and minutes
    const [hours, minutes] = time.split(':').map(Number);

    // Determine the period (AM/PM)
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour to 12-hour format
    const adjustedHours = hours % 12 || 12; // If hours is 0 or 12, return 12

    // Return the formatted time
    return `${adjustedHours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
}

// Example usage:
console.log(convertTo12HourFormat("17:46")); // Output: 5:46 PM
console.log(convertTo12HourFormat("09:15")); // Output: 9:15 AM
