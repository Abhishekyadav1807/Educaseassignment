function isValidNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function validateSchoolPayload(payload) {
  const { name, address, latitude, longitude } = payload;

  if (!name || typeof name !== "string" || !name.trim()) {
    return "Name is required and must be a non-empty string";
  }

  if (!address || typeof address !== "string" || !address.trim()) {
    return "Address is required and must be a non-empty string";
  }

  if (!isValidNumber(latitude) || latitude < -90 || latitude > 90) {
    return "Latitude must be a valid number between -90 and 90";
  }

  if (!isValidNumber(longitude) || longitude < -180 || longitude > 180) {
    return "Longitude must be a valid number between -180 and 180";
  }

  return null;
}

function validateUserCoordinates(latitude, longitude) {
  const parsedLatitude = Number(latitude);
  const parsedLongitude = Number(longitude);

  if (!Number.isFinite(parsedLatitude) || parsedLatitude < -90 || parsedLatitude > 90) {
    return { error: "Latitude query parameter must be a valid number between -90 and 90" };
  }

  if (!Number.isFinite(parsedLongitude) || parsedLongitude < -180 || parsedLongitude > 180) {
    return { error: "Longitude query parameter must be a valid number between -180 and 180" };
  }

  return {
    error: null,
    latitude: parsedLatitude,
    longitude: parsedLongitude
  };
}

module.exports = {
  validateSchoolPayload,
  validateUserCoordinates
};
