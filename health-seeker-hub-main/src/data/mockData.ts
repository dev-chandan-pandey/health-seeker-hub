export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  patientStories: number;
  consultationFee: number;
  location: string;
  clinic: string;
  availableToday: boolean;
  bookingFee: boolean;
  gender: "male" | "female";
  image?: string;
  isAd?: boolean;
}

export const doctorsData: Doctor[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    experience: 12,
    rating: 97,
    patientStories: 1203,
    consultationFee: 600,
    location: "JP Nagar, Bangalore",
    clinic: "SkinCare Dermatology Clinic",
    availableToday: true,
    bookingFee: false,
    gender: "female",
    isAd: true
  },
  {
    id: "2", 
    name: "Dr. Rajesh Kumar",
    specialty: "Dermatologist",
    experience: 15,
    rating: 94,
    patientStories: 867,
    consultationFee: 800,
    location: "Jayanagar, Bangalore",
    clinic: "Advanced Skin & Hair Clinic",
    availableToday: true,
    bookingFee: false,
    gender: "male"
  },
  {
    id: "3",
    name: "Dr. Sheela Nair",
    specialty: "Dermatologist", 
    experience: 18,
    rating: 96,
    patientStories: 1456,
    consultationFee: 900,
    location: "Koramangala, Bangalore",
    clinic: "Elite Dermatology Center",
    availableToday: false,
    bookingFee: false,
    gender: "female"
  },
  {
    id: "4",
    name: "Dr. Amit Patel",
    specialty: "Cardiologist",
    experience: 20,
    rating: 98,
    patientStories: 2145,
    consultationFee: 1200,
    location: "Whitefield, Bangalore",
    clinic: "Heart Care Institute",
    availableToday: true,
    bookingFee: false,
    gender: "male"
  },
  {
    id: "5",
    name: "Dr. Meera Reddy",
    specialty: "Pediatrician",
    experience: 14,
    rating: 95,
    patientStories: 1034,
    consultationFee: 700,
    location: "Indiranagar, Bangalore",
    clinic: "Children's Health Clinic",
    availableToday: true,
    bookingFee: false,
    gender: "female"
  },
  {
    id: "6",
    name: "Dr. Suresh Gupta",
    specialty: "Orthopedist",
    experience: 22,
    rating: 93,
    patientStories: 1567,
    consultationFee: 1000,
    location: "Malleshwaram, Bangalore",
    clinic: "Bone & Joint Care Center",
    availableToday: false,
    bookingFee: false,
    gender: "male"
  },
  {
    id: "7",
    name: "Dr. Kavitha Iyer",
    specialty: "Gynecologist",
    experience: 16,
    rating: 96,
    patientStories: 1289,
    consultationFee: 850,
    location: "BTM Layout, Bangalore",
    clinic: "Women's Health Clinic",
    availableToday: true,
    bookingFee: false,
    gender: "female"
  },
  {
    id: "8",
    name: "Dr. Vikram Singh",
    specialty: "Neurologist",
    experience: 25,
    rating: 99,
    patientStories: 1876,
    consultationFee: 1500,
    location: "Hebbal, Bangalore",
    clinic: "Neuro Care Specialty Center",
    availableToday: true,
    bookingFee: false,
    gender: "male"
  },
  {
    id: "9",
    name: "Dr. Anjali Bhatt",
    specialty: "Dermatologist",
    experience: 8,
    rating: 92,
    patientStories: 456,
    consultationFee: 500,
    location: "Electronic City, Bangalore",
    clinic: "Modern Skin Solutions",
    availableToday: true,
    bookingFee: false,
    gender: "female"
  },
  {
    id: "10",
    name: "Dr. Ravi Chandran",
    specialty: "Cardiologist",
    experience: 19,
    rating: 95,
    patientStories: 1654,
    consultationFee: 1100,
    location: "Banashankari, Bangalore",
    clinic: "Cardiac Care Hospital",
    availableToday: false,
    bookingFee: false,
    gender: "male"
  }
];