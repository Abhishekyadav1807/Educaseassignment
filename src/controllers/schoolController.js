const pool = require("../config/db");
const { calculateDistanceInKm } = require("../utils/distance");
const { validateSchoolPayload, validateUserCoordinates } = require("../utils/validators");

async function addSchool(req, res) {
  try {
    const { name, address, latitude, longitude } = req.body;

    const validationError = validateSchoolPayload({
      name,
      address,
      latitude,
      longitude
    });

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError
      });
    }

    const trimmedName = name.trim();
    const trimmedAddress = address.trim();

    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [trimmedName, trimmedAddress, latitude, longitude]
    );

    return res.status(201).json({
      success: true,
      message: "School added successfully",
      data: {
        id: result.insertId,
        name: trimmedName,
        address: trimmedAddress,
        latitude,
        longitude
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add school",
      error: error.message
    });
  }
}

async function listSchools(req, res) {
  try {
    const coordinateValidation = validateUserCoordinates(
      req.query.latitude,
      req.query.longitude
    );

    if (coordinateValidation.error) {
      return res.status(400).json({
        success: false,
        message: coordinateValidation.error
      });
    }

    const userLatitude = coordinateValidation.latitude;
    const userLongitude = coordinateValidation.longitude;

    const [schools] = await pool.execute(
      "SELECT id, name, address, latitude, longitude FROM schools"
    );

    const sortedSchools = schools
      .map((school) => {
        const distance = calculateDistanceInKm(
          userLatitude,
          userLongitude,
          school.latitude,
          school.longitude
        );

        return {
          ...school,
          distance: Number(distance.toFixed(2))
        };
      })
      .sort((firstSchool, secondSchool) => firstSchool.distance - secondSchool.distance);

    return res.status(200).json({
      success: true,
      count: sortedSchools.length,
      data: sortedSchools
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch schools",
      error: error.message
    });
  }
}

module.exports = {
  addSchool,
  listSchools
};
