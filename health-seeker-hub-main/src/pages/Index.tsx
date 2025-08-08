import { useState } from "react";
import { Search, MapPin, Video, Pill, FileText, Calendar, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (specialty.trim()) {
      navigate(`/doctors?specialty=${encodeURIComponent(specialty)}&location=${encodeURIComponent(location)}`);
    }
  };

  const popularSearches = [
    "Dermatologist",
    "Pediatrician", 
    "Gynecologist/Obstetrician",
    "Orthopedist",
    "Cardiologist",
    "Neurologist"
  ];

  const services = [
    { icon: Calendar, title: "Consult with a doctor", description: "Book appointments" },
    { icon: Pill, title: "Order Medicines", description: "Get medicines delivered" },
    { icon: FileText, title: "View medical records", description: "Access your health data" },
    { icon: Video, title: "Book test", description: "Lab tests at home" },
    { icon: Building2, title: "Read articles", description: "Health insights" },
    { icon: Users, title: "For healthcare providers", description: "Join our network" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-foreground">HealthSeeker</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors font-medium border-b-2 border-primary pb-1">Find Doctors</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Video Consult</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Surgeries</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">For Corporates</Button>
            <Button variant="ghost" size="sm">For Providers</Button>
            <Button variant="outline" size="sm">Login / Signup</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground px-4 py-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-16 h-16 bg-white/20 rounded-full"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-white/15 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute top-60 right-1/3 w-8 h-8 bg-warning/60 rounded-full"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your home for health</h1>
          
          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-semibold mb-8">Find and Book</h2>
            
            {/* Search Form */}
            <div className="bg-white rounded-2xl p-6 shadow-hero">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Bangalore"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 h-12 text-foreground"
                  />
                </div>
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search doctors, clinics, hospitals, etc."
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="pl-10 h-12 text-foreground"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch} size="lg" className="h-12 px-8">
                  Search
                </Button>
              </div>
              
              {/* Popular Searches */}
              <div className="mt-6 text-left">
                <span className="text-muted-foreground text-sm">Popular searches: </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {popularSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      size="sm"
                      onClick={() => {setSpecialty(search); setTimeout(handleSearch, 100);}}
                      className="text-xs"
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gradient-subtle">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-card-hover transition-all duration-300 cursor-pointer bg-gradient-card border-0">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2 text-foreground">{service.title}</h3>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;