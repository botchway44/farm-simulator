require('dotenv').config();

const config = {
    UNIT_FEEDING_INTERVAL: parseInt(process.env.UNIT_FEEDING_INTERVAL as string) || 10,
    BUILDING_FEEDING_INTERVAL: parseInt(process.env.BUILDING_FEEDING_INTERVAL as string) || 60,
    MIN_RANDOM_HEALTH: 50,
    MAX_RANDOM_HEALTH: 100,
    BUILDINGS: "buildings",
    UNITS: "units",
};
export default config; 