function convertToShortTimeFormat(timeString) {
    const timeParts = timeString.split(":");
    const hours = timeParts[0]
    const minutes = timeParts[1]
  
    const formattedTime = hours + ':' + minutes
    return formattedTime;
  }
export default convertToShortTimeFormat