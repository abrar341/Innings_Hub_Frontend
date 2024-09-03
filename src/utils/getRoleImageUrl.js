export const getRoleImageUrl = (role) => {
    const normalizedRole = role.toLowerCase().replace(" ", "-");
    return `https://www.iplt20.com/assets/images/teams-${normalizedRole}-icon.svg`;
};