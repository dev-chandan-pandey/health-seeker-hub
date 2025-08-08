// import { useState, useEffect } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import { Filter, Star, MapPin, Clock, CheckCircle, Phone, Calendar } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { supabase, type Doctor } from "@/lib/supabase";

// const DoctorsListing = () => {
//   const [searchParams] = useSearchParams();
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
//   const [genderFilter, setGenderFilter] = useState("");
//   const [experienceFilter, setExperienceFilter] = useState("");
//   const [sortBy, setSortBy] = useState("relevance");
//   const [loading, setLoading] = useState(true);

//   const specialty = searchParams.get("specialty") || "";
//   const location = searchParams.get("location") || "";

//   // Fetch doctors from Supabase
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       setLoading(true);
//       try {
//         const { data, error } = await supabase
//           .from('doctors')
//           .select('*')
//           .order('created_at', { ascending: false });

//         if (error) {
//           console.error('Error fetching doctors:', error);
//           return;
//         }

//         setDoctors(data || []);
//       } catch (error) {
//         console.error('Error fetching doctors:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   useEffect(() => {
//     let filtered = doctors;

//     // Filter by specialty
//     if (specialty) {
//       filtered = filtered.filter(doctor => 
//         doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
//       );
//     }

//     // Filter by gender
//     if (genderFilter) {
//       filtered = filtered.filter(doctor => doctor.gender.toLowerCase() === genderFilter.toLowerCase());
//     }

//     // Filter by experience
//     if (experienceFilter) {
//       const [min, max] = experienceFilter.split("-").map(Number);
//       filtered = filtered.filter(doctor => {
//         const exp = doctor.experience;
//         return exp >= min && (max ? exp <= max : true);
//       });
//     }

//     // Sort
//     if (sortBy === "rating") {
//       filtered.sort((a, b) => b.rating - a.rating);
//     } else if (sortBy === "experience") {
//       filtered.sort((a, b) => b.experience - a.experience);
//     } else if (sortBy === "price") {
//       filtered.sort((a, b) => a.consultation_fee - b.consultation_fee);
//     }

//     setFilteredDoctors(filtered);
//   }, [doctors, specialty, genderFilter, experienceFilter, sortBy]);

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="bg-card border-b border-border px-4 py-4">
//         <div className="container mx-auto flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//               <span className="text-primary-foreground font-bold text-sm">H</span>
//             </div>
//             <span className="text-xl font-bold text-foreground">HealthSeeker</span>
//           </Link>
          
//           <nav className="hidden md:flex items-center gap-8">
//             <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium border-b-2 border-primary pb-1">Find Doctors</Link>
//             <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Video Consult</a>
//             <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Surgeries</a>
//           </nav>

//           <div className="flex items-center gap-4">
//             <Button variant="ghost" size="sm">For Corporates</Button>
//             <Button variant="outline" size="sm">Login / Signup</Button>
//           </div>
//         </div>
//       </header>

//       {/* Filters Bar */}
//       <div className="bg-primary text-primary-foreground px-4 py-4">
//         <div className="container mx-auto">
//           <div className="flex flex-wrap items-center gap-4">
//             <Select value={genderFilter} onValueChange={setGenderFilter}>
//               <SelectTrigger className="w-40 bg-primary-light border-white/20 text-white">
//                 <SelectValue placeholder="Gender" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="">All Genders</SelectItem>
//                 <SelectItem value="male">Male</SelectItem>
//                 <SelectItem value="female">Female</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select value={experienceFilter} onValueChange={setExperienceFilter}>
//               <SelectTrigger className="w-48 bg-primary-light border-white/20 text-white">
//                 <SelectValue placeholder="Experience" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="">All Experience</SelectItem>
//                 <SelectItem value="0-5">0-5 years</SelectItem>
//                 <SelectItem value="5-10">5-10 years</SelectItem>
//                 <SelectItem value="10-20">10-20 years</SelectItem>
//                 <SelectItem value="20-50">20+ years</SelectItem>
//               </SelectContent>
//             </Select>

//             <Button variant="secondary" size="sm">
//               <Filter className="w-4 h-4 mr-2" />
//               All Filters
//             </Button>

//             <div className="ml-auto flex items-center gap-2">
//               <span className="text-sm">Sort By</span>
//               <Select value={sortBy} onValueChange={setSortBy}>
//                 <SelectTrigger className="w-32 bg-primary-light border-white/20 text-white">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="relevance">Relevance</SelectItem>
//                   <SelectItem value="rating">Rating</SelectItem>
//                   <SelectItem value="experience">Experience</SelectItem>
//                   <SelectItem value="price">Price</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Results Header */}
//       <div className="bg-background px-4 py-6">
//         <div className="container mx-auto">
//           <h1 className="text-2xl font-bold text-foreground mb-2">
//             {filteredDoctors.length} {specialty || "Doctors"} available in {location || "Bangalore"}
//           </h1>
//           <div className="flex items-center gap-2 text-muted-foreground">
//             <CheckCircle className="w-4 h-4" />
//             <span className="text-sm">Book appointments with minimum wait-time & verified doctor details</span>
//           </div>
//         </div>
//       </div>

//       {/* Doctor Cards */}
//       <div className="px-4 pb-8">
//         <div className="container mx-auto">
//           <div className="space-y-6">
//             {loading ? (
//               <div className="text-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
//                 <p className="mt-2 text-muted-foreground">Loading doctors...</p>
//               </div>
//             ) : filteredDoctors.length === 0 ? (
//               <div className="text-center py-8">
//                 <p className="text-muted-foreground">No doctors found matching your criteria.</p>
//               </div>
//             ) : (
//               filteredDoctors.map((doctor) => (
//               <Card key={doctor.id} className="p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
//                 <div className="flex flex-col lg:flex-row gap-6">
//                   {/* Doctor Info */}
//                   <div className="flex gap-4 flex-1">
//                     {/* Avatar */}
//                     <div className="w-16 h-16 bg-gradient-card rounded-lg overflow-hidden border-2 border-accent flex-shrink-0">
//                       {doctor.image ? (
//                         <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
//                       ) : (
//                         <div className="w-full h-full bg-primary/10 flex items-center justify-center">
//                           <span className="text-primary font-semibold text-lg">
//                             {doctor.name.split(' ').map(n => n[0]).join('')}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Details */}
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between mb-2">
//                         <div>
//                           <h3 className="text-xl font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer">
//                             {doctor.name}
//                           </h3>
//                           <p className="text-muted-foreground">{doctor.specialty}</p>
//                         </div>
//                       </div>

//                       <p className="text-sm text-muted-foreground mb-3">
//                         {doctor.experience} years experience overall
//                       </p>

//                       <div className="flex items-center gap-4 mb-3">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="w-4 h-4 text-muted-foreground" />
//                           <span className="text-sm text-foreground">{doctor.location}</span>
//                         </div>
//                         <span className="text-muted-foreground">•</span>
//                         <span className="text-sm text-foreground">{doctor.clinic}</span>
//                       </div>

//                       <div className="flex items-center gap-2 mb-4">
//                         <span className="text-lg font-bold text-foreground">₹{doctor.consultation_fee}</span>
//                         <span className="text-sm text-muted-foreground">Consultation fee at clinic</span>
//                       </div>

//                       {/* Rating and Stories */}
//                       <div className="flex items-center gap-4">
//                         <div className="flex items-center gap-1 bg-success text-success-foreground px-2 py-1 rounded text-sm font-medium">
//                           <Star className="w-3 h-3 fill-current" />
//                           {doctor.rating}%
//                         </div>
//                         <span className="text-sm text-muted-foreground underline cursor-pointer hover:text-foreground">
//                           Patient Stories
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Availability & Actions */}
//                   <div className="lg:w-80 space-y-3">
//                     {doctor.available_today && (
//                       <div className="flex items-center gap-2 text-success text-sm font-medium">
//                         <Clock className="w-4 h-4" />
//                         Available Today
//                       </div>
//                     )}
                    
//                     <Button className="w-full" size="lg">
//                       <Calendar className="w-4 h-4 mr-2" />
//                       Book Clinic Visit
//                       <span className="ml-1 text-xs">No Booking Fee</span>
//                     </Button>
                    
//                     <Button variant="outline" className="w-full" size="lg">
//                       <Phone className="w-4 h-4 mr-2" />
//                       Contact Clinic
//                     </Button>
//                   </div>
//                 </div>
//               </Card>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorsListing;

// import { useState, useEffect } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import { Filter, Star, MapPin, Clock, CheckCircle, Phone, Calendar } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const DoctorsListing = () => {
//   const [searchParams] = useSearchParams();
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [genderFilter, setGenderFilter] = useState("");
//   const [experienceFilter, setExperienceFilter] = useState("");
//   const [sortBy, setSortBy] = useState("relevance");
//   const [loading, setLoading] = useState(true);

//   const specialty = searchParams.get("specialty") || "";
//   const location = searchParams.get("location") || "";

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `${import.meta.env.VITE_API_BASE_URL}/api/doctors?location=${encodeURIComponent(location)}&specialization=${encodeURIComponent(specialty)}`
//         );
//         const data = await res.json();
//         setDoctors(data || []);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDoctors();
//   }, [location, specialty]);

//   useEffect(() => {
//     let filtered = [...doctors];

//     if (genderFilter) {
//       filtered = filtered.filter(doc => doc.gender?.toLowerCase() === genderFilter.toLowerCase());
//     }

//     if (experienceFilter) {
//       const [min, max] = experienceFilter.split("-").map(Number);
//       filtered = filtered.filter(doc => {
//         const exp = doc.experience;
//         return exp >= min && (max ? exp <= max : true);
//       });
//     }

//     if (sortBy === "rating") {
//       filtered.sort((a, b) => b.rating - a.rating);
//     } else if (sortBy === "experience") {
//       filtered.sort((a, b) => b.experience - a.experience);
//     } else if (sortBy === "price") {
//       filtered.sort((a, b) => a.consultationFee - b.consultationFee);
//     }

//     setFilteredDoctors(filtered);
//   }, [doctors, genderFilter, experienceFilter, sortBy]);

//   return (
//     <div className="min-h-screen bg-background">


//       {/* Header */}
//        <header className="bg-card border-b border-border px-4 py-4">
//          <div className="container mx-auto flex items-center justify-between">
//            <Link to="/" className="flex items-center gap-2">
//              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//                <span className="text-primary-foreground font-bold text-sm">H</span>
//              </div>
//              <span className="text-xl font-bold text-foreground">HealthSeeker</span>
//            </Link>
          
//            <nav className="hidden md:flex items-center gap-8">
//              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium border-b-2 border-primary pb-1">Find Doctors</Link>
//              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Video Consult</a>
//              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Surgeries</a>
//            </nav>

//            <div className="flex items-center gap-4">
//              <Button variant="ghost" size="sm">For Corporates</Button>
//              <Button variant="outline" size="sm">Login / Signup</Button>
//            </div>
//          </div>
//        </header>

//        {/* Filters Bar */}
//        <div className="bg-primary text-primary-foreground px-4 py-4">
//          <div className="container mx-auto">
//            <div className="flex flex-wrap items-center gap-4">
//              <Select value={genderFilter} onValueChange={setGenderFilter}>
//                <SelectTrigger className="w-40 bg-primary-light border-white/20 text-white">
//                  <SelectValue placeholder="Gender" />
//                </SelectTrigger>
//                <SelectContent>
//                  <SelectItem value="">All Genders</SelectItem>
//                  <SelectItem value="male">Male</SelectItem>
//                  <SelectItem value="female">Female</SelectItem>
//                </SelectContent>
//              </Select>

//              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
//                <SelectTrigger className="w-48 bg-primary-light border-white/20 text-white">
//                  <SelectValue placeholder="Experience" />
//                </SelectTrigger>
//                <SelectContent>
//                  <SelectItem value="">All Experience</SelectItem>
//                  <SelectItem value="0-5">0-5 years</SelectItem>
//                  <SelectItem value="5-10">5-10 years</SelectItem>
//                  <SelectItem value="10-20">10-20 years</SelectItem>
//                  <SelectItem value="20-50">20+ years</SelectItem>
//                </SelectContent>
//              </Select>

//              <Button variant="secondary" size="sm">
//                <Filter className="w-4 h-4 mr-2" />
//                All Filters
//              </Button>

//              <div className="ml-auto flex items-center gap-2">
//                <span className="text-sm">Sort By</span>
//                <Select value={sortBy} onValueChange={setSortBy}>
//                  <SelectTrigger className="w-32 bg-primary-light border-white/20 text-white">
//                    <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="relevance">Relevance</SelectItem>
//                   <SelectItem value="rating">Rating</SelectItem>
//                   <SelectItem value="experience">Experience</SelectItem>
//                   <SelectItem value="price">Price</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>
//       </div>


//       {/* Results Header */}
//       <div className="bg-background px-4 py-6">
//         <div className="container mx-auto">
//           <h1 className="text-2xl font-bold text-foreground mb-2">
//             {filteredDoctors.length} {specialty || "Doctors"} available in {location || "Bangalore"}
//           </h1>
//           <div className="flex items-center gap-2 text-muted-foreground">
//             <CheckCircle className="w-4 h-4" />
//             <span className="text-sm">Book appointments with minimum wait-time & verified doctor details</span>
//           </div>
//         </div>
//       </div>

//       {/* Doctor Cards */}
//       <div className="px-4 pb-8">
//         <div className="container mx-auto">
//           <div className="space-y-6">
//             {loading ? (
//               <div className="text-center py-8">Loading doctors...</div>
//             ) : filteredDoctors.length === 0 ? (
//               <div className="text-center py-8">No doctors found.</div>
//             ) : (
//               filteredDoctors.map((doctor) => (
//                 <Card key={doctor._id} className="p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
//                   <div className="flex flex-col lg:flex-row gap-6">
//                     <div className="flex gap-4 flex-1">
//                       <div className="w-16 h-16 bg-gradient-card rounded-lg overflow-hidden border-2 border-accent flex-shrink-0">
//                         {doctor.profileImage ? (
//                           <img src={doctor.profileImage} alt={doctor.name} className="w-full h-full object-cover" />
//                         ) : (
//                           <div className="w-full h-full bg-primary/10 flex items-center justify-center">
//                             <span className="text-primary font-semibold text-lg">
//                               {doctor.name.split(' ').map(n => n[0]).join('')}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-xl font-semibold">{doctor.name}</h3>
//                         <p className="text-muted-foreground">{doctor.specialization}</p>
//                         <p className="text-sm">{doctor.experience} years experience overall</p>
//                         <div className="flex items-center gap-1">
//                           <MapPin className="w-4 h-4" />
//                           <span>{doctor.location}</span>
//                         </div>
//                         <div className="flex items-center gap-2 mt-2">
//                           <span className="font-bold">₹{doctor.consultationFee}</span>
//                           <span className="text-sm text-muted-foreground">Consultation fee</span>
//                         </div>
//                         <div className="flex items-center gap-4 mt-2">
//                           <div className="flex items-center gap-1 bg-success px-2 py-1 rounded text-sm">
//                             <Star className="w-3 h-3" />
//                             {doctor.rating}%
//                           </div>
//                           <span className="text-sm text-muted-foreground underline cursor-pointer">
//                             {doctor.patientStories} Patient Stories
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="lg:w-80 space-y-3">
//                       {doctor.availability && (
//                         <div className="flex items-center gap-2 text-success text-sm font-medium">
//                           <Clock className="w-4 h-4" /> {doctor.availability}
//                         </div>
//                       )}
//                       <Button className="w-full" size="lg">
//                         <Calendar className="w-4 h-4 mr-2" /> Book Clinic Visit
//                       </Button>
//                       <Button variant="outline" className="w-full" size="lg">
//                         <Phone className="w-4 h-4 mr-2" /> Contact Clinic
//                       </Button>
//                     </div>
//                   </div>
//                 </Card>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorsListing;



// src/pages/DoctorsListing.tsx
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Filter, Star, MapPin, Clock, CheckCircle, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type DoctorFromApi = {
  // accept both variations that might come from different backends
  id?: string;
  _id?: string;
  name?: string;
  specialization?: string;
  location?: string;
  clinicName?: string;
  clinic?: string;
  experience?: number | string;
  consultationFee?: number | string;
  consultation_fee?: number | string;
  rating?: number | string;
  patientStories?: number | string;
  availability?: string;
  available_today?: boolean;
  profileImage?: string;
  image?: string;
  gender?: string;
};

const DoctorsListing = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<DoctorFromApi[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorFromApi[]>([]);
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [experienceFilter, setExperienceFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [loading, setLoading] = useState<boolean>(true);

  const specialty = searchParams.get("specialty") || "";
  const location = searchParams.get("location") || "";

  // Build base URL from env
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // Helper: normalize doctor object to consistent keys used in UI
  const normalizeDoctor = (d: DoctorFromApi): DoctorFromApi => {
    return {
      id: d._id || d.id,
      name: d.name || "Unknown",
      specialization: d.specialization || "General",
      location: d.location || "Not specified",
      clinicName: d.clinicName || d.clinic || "",
      experience: typeof d.experience === "string" ? Number(d.experience) : d.experience || 0,
      consultationFee:
        typeof d.consultationFee === "string" ? Number(d.consultationFee) : d.consultationFee ?? (typeof d.consultation_fee === "string" ? Number(d.consultation_fee) : d.consultation_fee ?? 0),
      rating: typeof d.rating === "string" ? Number(d.rating) : d.rating ?? 0,
      patientStories: typeof d.patientStories === "string" ? Number(d.patientStories) : d.patientStories ?? 0,
      availability: d.availability || (d.available_today ? "Available Today" : ""),
      available_today: Boolean(d.available_today),
      profileImage: d.profileImage || d.image || "",
      gender: (d.gender || "unspecified").toLowerCase(),
    };
  };

  // Fetch from our Node/Express API
  useEffect(() => {
    const controller = new AbortController();
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        // call backend with specialty & location queries (backend expects location & specialization)
        const url = new URL(`${API_BASE}/api/doctors`);
        if (location) url.searchParams.append("location", location);
        if (specialty) url.searchParams.append("specialization", specialty);
        // you can append pagination, sort etc here later

        const res = await fetch(url.toString(), { signal: controller.signal });
        if (!res.ok) {
          console.error("Failed to fetch doctors from backend:", res.statusText);
          setDoctors([]);
          return;
        }

        const data = await res.json();

        // Our backend returns array directly (or might return { doctors: [...] } if you change it).
        const rawList: any[] = Array.isArray(data) ? data : data.doctors ? data.doctors : [];

        const normalized = rawList.map(normalizeDoctor);
        setDoctors(normalized);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error("Error fetching doctors:", err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
    return () => controller.abort();
  }, [API_BASE, location, specialty]);

  // Filter + sort client-side (still safe with normalized data)
  useEffect(() => {
    let filtered = [...doctors];

    // Filter by specialty (if provided via query)
    if (specialty) {
      filtered = filtered.filter((doctor) =>
        String(doctor.specialization).toLowerCase().includes(specialty.toLowerCase())
      );
    }

    // Gender filter
    if (genderFilter && genderFilter !== "all") {
      filtered = filtered.filter((doctor) => (doctor.gender || "unspecified").toLowerCase() === genderFilter.toLowerCase());
    }

    // Experience filter
    if (experienceFilter && experienceFilter !== "all") {
      const [minStr, maxStr] = experienceFilter.split("-").map((s) => s.trim());
      const min = Number(minStr) || 0;
      const max = maxStr ? Number(maxStr) : Infinity;
      filtered = filtered.filter((doctor) => {
        const exp = Number(doctor.experience || 0);
        return exp >= min && exp <= max;
      });
    }

    // Sorting
    if (sortBy === "rating") {
      filtered.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    } else if (sortBy === "experience") {
      filtered.sort((a, b) => (Number(b.experience) || 0) - (Number(a.experience) || 0));
    } else if (sortBy === "price") {
      filtered.sort((a, b) => (Number(a.consultationFee) || 0) - (Number(b.consultationFee) || 0));
    }

    setFilteredDoctors(filtered);
  }, [doctors, specialty, genderFilter, experienceFilter, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-foreground">HealthSeeker</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium border-b-2 border-primary pb-1">
              Find Doctors
            </Link>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Video Consult</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Surgeries</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">For Corporates</Button>
            <Button variant="outline" size="sm">Login / Signup</Button>
          </div>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="bg-primary text-primary-foreground px-4 py-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            {/* Gender select - NOTE: use non-empty values (Radix requirement) */}
            <Select value={genderFilter} onValueChange={(v: string) => setGenderFilter(v)}>
              <SelectTrigger className="w-40 bg-primary-light border-white/20 text-white">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="unspecified">Unspecified</SelectItem>
              </SelectContent>
            </Select>

            {/* Experience select - non-empty values */}
            <Select value={experienceFilter} onValueChange={(v: string) => setExperienceFilter(v)}>
              <SelectTrigger className="w-48 bg-primary-light border-white/20 text-white">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Experience</SelectItem>
                <SelectItem value="0-5">0-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10-20">10-20 years</SelectItem>
                <SelectItem value="20-50">20+ years</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="secondary" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              All Filters
            </Button>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm">Sort By</span>
              <Select value={sortBy} onValueChange={(v: string) => setSortBy(v)}>
                <SelectTrigger className="w-32 bg-primary-light border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="bg-background px-4 py-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {filteredDoctors.length} {specialty || "Doctors"} available in {location || "Bangalore"}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Book appointments with minimum wait-time & verified doctor details</span>
          </div>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="px-4 pb-8">
        <div className="container mx-auto">
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                <p className="mt-2 text-muted-foreground">Loading doctors...</p>
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No doctors found matching your criteria.</p>
              </div>
            ) : (
              filteredDoctors.map((doctor) => (
                <Card key={doctor.id || doctor._id} className="p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Doctor Info */}
                    <div className="flex gap-4 flex-1">
                      {/* Avatar */}
                      <div className="w-16 h-16 bg-gradient-card rounded-lg overflow-hidden border-2 border-accent flex-shrink-0">
                        { (doctor.profileImage || doctor.image) ? (
                          <img src={doctor.profileImage || doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold text-lg">{doctor.name?.split(" ").map(n => n[0]).join("")}</span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer">{doctor.name}</h3>
                            <p className="text-muted-foreground">{doctor.specialization}</p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{doctor.experience} years experience overall</p>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">{doctor.location}</span>
                          </div>
                          {doctor.clinicName && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-sm text-foreground">{doctor.clinicName}</span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold text-foreground">₹{doctor.consultationFee}</span>
                          <span className="text-sm text-muted-foreground">Consultation fee at clinic</span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 bg-success text-success-foreground px-2 py-1 rounded text-sm font-medium">
                            <Star className="w-3 h-3 fill-current" />
                            {doctor.rating}%
                          </div>
                          <span className="text-sm text-muted-foreground underline cursor-pointer hover:text-foreground">
                            {doctor.patientStories ?? "Patient Stories"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:w-80 space-y-3">
                      {doctor.available_today && (
                        <div className="flex items-center gap-2 text-success text-sm font-medium">
                          <Clock className="w-4 h-4" />
                          {doctor.availability || "Available Today"}
                        </div>
                      )}

                      <Button className="w-full" size="lg">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Clinic Visit
                        <span className="ml-1 text-xs">No Booking Fee</span>
                      </Button>

                      <Button variant="outline" className="w-full" size="lg">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Clinic
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsListing;
