const constant = require("../config/constant");

const getUserShortName = (userName) => {
    if (!userName) return '';
    const nameParts = userName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];

    if(nameParts.length === 1) {
        return firstName.charAt(0).toUpperCase();
    }

    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
}

const getRandomColor = () => {
    const colors = constant.AVATAR_COLORS;
    return colors[Math.floor(Math.random() * colors.length)];
}

module.exports = { getUserShortName, getRandomColor };