const Reservation = require('../models/reservation');
const Cinema = require('../models/cinema');

/**
 * Clean up reservations older than 7 days
 * This function will:
 * 1. Find reservations older than 7 days (based on creation date)
 * 2. Restore seats to cinema availability
 * 3. Delete the old reservations
 */
const cleanupOldReservations = async () => {
  try {
    console.log('Starting reservation cleanup process...');
    
    // Calculate date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    // Find reservations older than 7 days (using createdAt if available, fallback to date)
    const oldReservations = await Reservation.find({
      $or: [
        { createdAt: { $lt: sevenDaysAgo } }, // Use createdAt if available
        { 
          createdAt: { $exists: false }, // Fallback for old records without createdAt
          date: { $lt: sevenDaysAgo } 
        }
      ]
    });
    
    console.log(`Found ${oldReservations.length} reservations older than 7 days`);
    
    if (oldReservations.length === 0) {
      console.log('No old reservations to clean up');
      return { cleaned: 0, message: 'No old reservations found' };
    }
    
    // Group reservations by cinema to batch update seat availability
    const cinemaUpdates = {};
    
    for (const reservation of oldReservations) {
      const cinemaId = reservation.cinemaId.toString();
      if (!cinemaUpdates[cinemaId]) {
        cinemaUpdates[cinemaId] = 0;
      }
      cinemaUpdates[cinemaId] += reservation.ticketsCount || reservation.seats.length;
    }
    
    // Update cinema seat availability
    for (const [cinemaId, seatsToRestore] of Object.entries(cinemaUpdates)) {
      try {
        await Cinema.findByIdAndUpdate(
          cinemaId,
          { $inc: { seatsAvailable: seatsToRestore } }
        );
        console.log(`Restored ${seatsToRestore} seats to cinema ${cinemaId}`);
      } catch (error) {
        console.error(`Error restoring seats for cinema ${cinemaId}:`, error.message);
      }
    }
    
    // Delete old reservations
    const deleteResult = await Reservation.deleteMany({
      $or: [
        { createdAt: { $lt: sevenDaysAgo } },
        { 
          createdAt: { $exists: false },
          date: { $lt: sevenDaysAgo } 
        }
      ]
    });
    
    console.log(`Successfully cleaned up ${deleteResult.deletedCount} old reservations`);
    
    return {
      cleaned: deleteResult.deletedCount,
      seatsRestored: Object.values(cinemaUpdates).reduce((sum, seats) => sum + seats, 0),
      message: `Cleaned up ${deleteResult.deletedCount} reservations and restored seats`
    };
    
  } catch (error) {
    console.error('Error during reservation cleanup:', error);
    throw error;
  }
};

/**
 * Schedule cleanup to run every day at midnight
 */
const scheduleReservationCleanup = () => {
  // Run cleanup immediately on server start
  cleanupOldReservations().catch(console.error);
  
  // Schedule cleanup to run every 24 hours (86400000 ms)
  setInterval(() => {
    cleanupOldReservations().catch(console.error);
  }, 24 * 60 * 60 * 1000);
  
  console.log('Reservation cleanup scheduled to run every 24 hours');
};

/**
 * Manual cleanup endpoint (for testing or manual triggers)
 */
const manualCleanup = async () => {
  return await cleanupOldReservations();
};

module.exports = {
  cleanupOldReservations,
  scheduleReservationCleanup,
  manualCleanup
};