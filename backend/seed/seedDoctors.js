const mongoose = require("mongoose");
const Doctor = require("../models/Doctor");
require("dotenv").config();

// const seedData = [
//   {
//     name: "Aesthetic Heart Dermatology & Cardiology Clinic",
//     specialization: "Dermatologist",
//     location: "Jayanagar, Bangalore",
//     clinicName: "Aesthetic Heart",
//     experience: 12,
//     consultationFee: 800,
//     rating: 97,
//     patientStories: 159,
//     availability: "Available Today",
//     profileImage: "",
//     gender: "female"
//   },
//   {
//     name: "Dr. Sheelavathi Natraj",
//     specialization: "Dermatologist",
//     location: "JP Nagar, Bangalore",
//     clinicName: "Sapphire Skin And Aesthetics Clinic",
//     experience: 21,
//     consultationFee: 800,
//     rating: 94,
//     patientStories: 1506,
//     availability: "Available Today",
//     profileImage: "",
//     gender: "female"
//   },{
//     id: "1",
//     name: "Dr. Priya Sharma",
//     specialty: "Dermatologist",
//     experience: 12,
//     rating: 97,
//     patientStories: 1203,
//     consultationFee: 600,
//     location: "JP Nagar, Bangalore",
//     clinic: "SkinCare Dermatology Clinic",
//     availableToday: true,
//     bookingFee: false,
//     gender: "female",
//     isAd: true
//   },
//   {
//     id: "2", 
//     name: "Dr. Rajesh Kumar",
//     specialty: "Dermatologist",
//     experience: 15,
//     rating: 94,
//     patientStories: 867,
//     consultationFee: 800,
//     location: "Jayanagar, Bangalore",
//     clinic: "Advanced Skin & Hair Clinic",
//     availableToday: true,
//     bookingFee: false,
//     gender: "male"
//   },
//   {
//     id: "3",
//     name: "Dr. Sheela Nair",
//     specialty: "Dermatologist", 
//     experience: 18,
//     rating: 96,
//     patientStories: 1456,
//     consultationFee: 900,
//     location: "Koramangala, Bangalore",
//     clinic: "Elite Dermatology Center",
//     availableToday: false,
//     bookingFee: false,
//     gender: "female"
//   },
//   {
//     id: "4",
//     name: "Dr. Amit Patel",
//     specialty: "Cardiologist",
//     experience: 20,
//     rating: 98,
//     patientStories: 2145,
//     consultationFee: 1200,
//     location: "Whitefield, Bangalore",
//     clinic: "Heart Care Institute",
//     availableToday: true,
//     bookingFee: false,
//     gender: "male"
//   },
//   {
//     id: "5",
//     name: "Dr. Meera Reddy",
//     specialty: "Pediatrician",
//     experience: 14,
//     rating: 95,
//     patientStories: 1034,
//     consultationFee: 700,
//     location: "Indiranagar, Bangalore",
//     clinic: "Children's Health Clinic",
//     availableToday: true,
//     bookingFee: false,
//     gender: "female"
//   },
//   {
//     id: "6",
//     name: "Dr. Suresh Gupta",
//     specialty: "Orthopedist",
//     experience: 22,
//     rating: 93,
//     patientStories: 1567,
//     consultationFee: 1000,
//     location: "Malleshwaram, Bangalore",
//     clinic: "Bone & Joint Care Center",
//     availableToday: false,
//     bookingFee: false,
//     gender: "male"
//   },
//   {
//     id: "7",
//     name: "Dr. Kavitha Iyer",
//     specialty: "Gynecologist",
//     experience: 16,
//     rating: 96,
//     patientStories: 1289,
//     consultationFee: 850,
//     location: "BTM Layout, Bangalore",
//     clinic: "Women's Health Clinic",
//     availableToday: true,
//     bookingFee: false,
//     gender: "female"
//   },
//   {
//     id: "8",
//     name: "Dr. Vikram Singh",
//     specialty: "Neurologist",
//     experience: 25,
//     rating: 99,
//     patientStories: 1876,
//     consultationFee: 1500,
//     location: "Hebbal, Bangalore",
//     clinic: "Neuro Care Specialty Center",
//     availableToday: true,
//     bookingFee: false,
//     gender: "male"
//   },
//   {
//     id: "9",
//     name: "Dr. Anjali Bhatt",
//     specialty: "Dermatologist",
//     experience: 8,
//     rating: 92,
//     patientStories: 456,
//     consultationFee: 500,
//     location: "Electronic City, Bangalore",
//     clinic: "Modern Skin Solutions",
//     availableToday: true,
//     bookingFee: false,
//     gender: "female"
//   },
//   {
//     id: "10",
//     name: "Dr. Ravi Chandran",
//     specialty: "Cardiologist",
//     experience: 19,
//     rating: 95,
//     patientStories: 1654,
//     consultationFee: 1100,
//     location: "Banashankari, Bangalore",
//     clinic: "Cardiac Care Hospital",
//     availableToday: false,
//     bookingFee: false,
//     gender: "male"
//   }
// ];
const seedData  = [
  {
    name: "Dr. Ananya Sharma",
    specialization: "Cardiologist",
    specialty: "Cardiology",
    location: "Bangalore",
    clinicName: "Heart Care Clinic",
    clinic: "Heart Care Clinic",
    experience: 12,
    consultationFee: 800,
    consultation_fee: 800,
    rating: 95,
    patientStories: 120,
    availability: "Available Today",
    available_today: true,
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    gender: "female",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: "Dr. Rajesh Verma",
    specialization: "Dermatologist",
    specialty: "Dermatology",
    location: "Bangalore",
    clinicName: "Skin & Hair Clinic",
    clinic: "Skin & Hair Clinic",
    experience: 8,
    consultationFee: 500,
    consultation_fee: 500,
    rating: 90,
    patientStories: 95,
    availability: "Available Today",
    available_today: true,
    profileImage: "https://randomuser.me/api/portraits/men/45.jpg",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    gender: "male",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: "Dr. Meera Kapoor",
    specialization: "Pediatrician",
    specialty: "Pediatrics",
    location: "Bangalore",
    clinicName: "Happy Kids Clinic",
    clinic: "Happy Kids Clinic",
    experience: 15,
    consultationFee: 700,
    consultation_fee: 700,
    rating: 97,
    patientStories: 150,
    availability: "Available Today",
    available_today: true,
    profileImage: "https://randomuser.me/api/portraits/women/46.jpg",
    image: "https://randomuser.me/api/portraits/women/46.jpg",
    gender: "female",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: "Dr. Sameer Khan",
    specialization: "Orthopedic Surgeon",
    specialty: "Orthopedics",
    location: "Bangalore",
    clinicName: "Bone & Joint Clinic",
    clinic: "Bone & Joint Clinic",
    experience: 20,
    consultationFee: 1000,
    consultation_fee: 1000,
    rating: 92,
    patientStories: 110,
    availability: "Available Today",
    available_today: true,
    profileImage: "https://randomuser.me/api/portraits/men/47.jpg",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
    gender: "male",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    name: "Dr. Priya Nair",
    specialization: "Gynecologist",
    specialty: "Gynecology",
    location: "Bangalore",
    clinicName: "Women’s Health Clinic",
    clinic: "Women’s Health Clinic",
    experience: 10,
    consultationFee: 900,
    consultation_fee: 900,
    rating: 96,
    patientStories: 130,
    availability: "Available Today",
    available_today: true,
    profileImage: "https://randomuser.me/api/portraits/women/48.jpg",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
    gender: "female",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Doctor.deleteMany({});
    await Doctor.insertMany(seedData);
    console.log("✅ Doctors seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
})();
