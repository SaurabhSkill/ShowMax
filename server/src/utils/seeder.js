const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Load Mongoose models
const Movie = require('../models/movie');
const Cinema = require('../models/cinema');
const Showtime = require('../models/showtime');

// --- Expanded Sample Data ---

const movies = [
    {
        title: 'Jawan',
        image: 'https://image.tmdb.org/t/p/w500/jftmYtM3c0cWuLd5nS2b1S3Vf4x.jpg',
        language: 'hindi',
        genre: 'action, thriller',
        director: 'Atlee',
        cast: 'Shah Rukh Khan, Nayanthara, Vijay Sethupathi',
        description: 'A high-octane action thriller that outlines the emotional journey of a man who is set to rectify the wrongs in society.',
        duration: 169,
        releaseDate: new Date('2023-09-07'),
        endDate: new Date('2025-12-31'),
    },
    {
        title: '3 Idiots',
        image: 'https://image.tmdb.org/t/p/w500/bWc3D2nQc3s2tJTffsP2a9Gv2wP.jpg',
        language: 'hindi',
        genre: 'comedy, drama',
        director: 'Rajkumar Hirani',
        cast: 'Aamir Khan, R. Madhavan, Sharman Joshi, Kareena Kapoor',
        description: 'Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.',
        duration: 170,
        releaseDate: new Date('2009-12-25'),
        endDate: new Date('2025-12-31'),
    },
    {
        title: 'RRR',
        image: 'https://image.tmdb.org/t/p/w500/uS1A58KqjprI3o5t7Jd1H2tLp2S.jpg',
        language: 'telugu',
        genre: 'action, drama',
        director: 'S. S. Rajamouli',
        cast: 'N. T. Rama Rao Jr., Ram Charan, Alia Bhatt',
        description: 'A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in the 1920s.',
        duration: 187,
        releaseDate: new Date('2022-03-25'),
        endDate: new Date('2025-12-31'),
    },
    {
        title: 'Dangal',
        image: 'https://image.tmdb.org/t/p/w500/p4aLpS3B23aK6iX5g2p4a2H2bCI.jpg',
        language: 'hindi',
        genre: 'action, biography, drama',
        director: 'Nitesh Tiwari',
        cast: 'Aamir Khan, Sakshi Tanwar, Fatima Sana Shaikh',
        description: 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.',
        duration: 161,
        releaseDate: new Date('2016-12-23'),
        endDate: new Date('2025-12-31'),
    },
    {
        title: 'K.G.F: Chapter 2',
        image: 'https://image.tmdb.org/t/p/w500/aGBuiirBIQ7o64FmJxO53eI9I_A.jpg',
        language: 'kannada',
        genre: 'action, crime, drama',
        director: 'Prashanth Neel',
        cast: 'Yash, Sanjay Dutt, Raveena Tandon',
        description: 'In the blood-soaked Kolar Gold Fields, Rocky\'s name strikes fear into his foes. While his allies look up to him, the government sees him as a threat to law and order.',
        duration: 168,
        releaseDate: new Date('2022-04-14'),
        endDate: new Date('2025-12-31'),
    }
];

const generateSeats = () => {
    const seats = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    rows.forEach(row => {
        for (let i = 1; i <= 12; i++) {
            seats.push({ seat: `${row}${i}`, isAvailable: true });
        }
    });
    return seats;
};

const cinemas = [
  { name: 'PVR Icon, Oberoi Mall', ticketPrice: 350, city: 'mumbai', seats: generateSeats(), seatsAvailable: 96, image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=PVR+Icon' },
  { name: 'INOX, Inorbit Mall', ticketPrice: 320, city: 'mumbai', seats: generateSeats(), seatsAvailable: 96, image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=INOX' },
  { name: 'G7 Multiplex, Bandra', ticketPrice: 250, city: 'mumbai', seats: generateSeats(), seatsAvailable: 96, image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=G7+Multiplex' },
  { name: 'PVR Logix, City Center', ticketPrice: 400, city: 'delhi', seats: generateSeats(), seatsAvailable: 96, image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=PVR+Logix' },
  { name: 'DT Star Cinemas, Saket', ticketPrice: 380, city: 'delhi', seats: generateSeats(), seatsAvailable: 96, image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=DT+Star' },
  { name: 'Cinepolis, Forum Shantiniketan', ticketPrice: 280, city: 'bangalore', seats: generateSeats(), seatsAvailable: 96, image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Cinepolis' },
  { name: 'Urvashi Cinema, Lal Bagh', ticketPrice: 220, city: 'bangalore', seats: generateSeats(), seatsAvailable: 96, image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Urvashi' },
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');

    await Movie.deleteMany();
    await Cinema.deleteMany();
    await Showtime.deleteMany();
    console.log('Previous data destroyed...');

    const createdMovies = await Movie.insertMany(movies);
    const createdCinemas = await Cinema.insertMany(cinemas);
    console.log('Movies and Cinemas imported...');

    // --- NEW REALISTIC SHOWTIME LOGIC ---
    const showtimes = [];
    const possibleTimes = ['10:00 AM', '11:30 AM', '01:15 PM', '02:45 PM', '04:30 PM', '06:00 PM', '07:45 PM', '09:15 PM', '11:00 PM'];
    
    createdCinemas.forEach(cinema => {
        // Assign 2 to 4 random movies to each cinema
        const moviesToShow = [...createdMovies].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2);

        moviesToShow.forEach(movie => {
            // Assign 3 to 5 random showtimes for each movie at this cinema
            const timesForThisMovie = [...possibleTimes].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 3);
            
            timesForThisMovie.forEach(time => {
                showtimes.push({
                    startAt: time,
                    startDate: new Date(),
                    endDate: movie.endDate,
                    movieId: movie._id,
                    cinemaId: cinema._id,
                });
            });
        });
    });

    await Showtime.insertMany(showtimes);
    console.log('Realistic showtimes created and imported...');
    
    console.log('Data Imported Successfully!');
    process.exit();
  } catch (err) {
    console.error('Error importing data:', err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');
    
    await Movie.deleteMany();
    await Cinema.deleteMany();
    await Showtime.deleteMany();
    
    console.log('All data destroyed!');
    process.exit();
  } catch (err) {
    console.error('Error deleting data:', err);
    process.exit(1);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log("Please use the '--import' or '--delete' flag.");
  process.exit();
}
