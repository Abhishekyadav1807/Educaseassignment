function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function calculateDistanceInKm(startLatitude, startLongitude, endLatitude, endLongitude) {
  const earthRadiusKm = 6371;

  const latitudeDifference = toRadians(endLatitude - startLatitude);
  const longitudeDifference = toRadians(endLongitude - startLongitude);

  const a =
    Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
    Math.cos(toRadians(startLatitude)) *
      Math.cos(toRadians(endLatitude)) *
      Math.sin(longitudeDifference / 2) *
      Math.sin(longitudeDifference / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

module.exports = {
  calculateDistanceInKm
};
