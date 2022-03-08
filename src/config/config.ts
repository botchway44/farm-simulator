require('dotenv').config();

const config = {
    UNIT_FEEDING_INTERVAL: parseInt(process.env.UNIT_FEEDING_INTERVAL as string) || 10,
    BUILDING_FEEDING_INTERVAL: parseInt(process.env.BUILDING_FEEDING_INTERVAL as string) || 60,
    MIN_RANDOM_HEALTH: parseInt(process.env.MIN_RANDOM_HEALTH as string) || 50,
    MAX_RANDOM_HEALTH: parseInt(process.env.MAX_RANDOM_HEALTH as string) || 100,
    BUILDINGS: (process.env.BUILDINGS as string) || "buildings",
    UNITS: (process.env.UNITS as string) || "units",
    PROCESSQUEUE: (process.env.PROCESSQUEUE as string) || "process",
    FEED_SIMULATION_TIME: parseInt(process.env.FEED_SIMULATION_TIME as string) || 50000
};
export default config; 