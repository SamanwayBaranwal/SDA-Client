import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const teachers = [
  {
    id: 1,
    name: "Abid Ali",
    image: "/Teachers/Abid Ali.jpeg",
    experience: "15+ years",
    sections: ["primary"]
  },
  {
    id: 2,
    name: "JP Shukla",
    image: "/Teachers/JP Shukla.jpeg",
    experience: "12+ years",
    sections: ["primary"]
  },
  {
    id: 3,
    name: "Mamta Tiwari",
    image: "/Teachers/Mamta Tiwari.jpg",
    experience: "10+ years",
    sections: ["middle", "secondary"]
  },
  {
    id: 4,
    name: "KM Pandey",
    image: "/Teachers/KN Pandey.jpeg",
    experience: "8+ years",
    sections: ["middle"]
  },
  {
    id: 5,
    name: "Madhav Tripathi",
    image: "/Teachers/Madhav Tripathi.jpeg",
    experience: "10+ years",
    sections: ["middle", "secondary"]
  },
  {
    id: 6,
    name: "Ashok Nigam",
    image: "/Teachers/Nigam.jpg",
    experience: "15+ years",
    sections: ["office"]
  }
];

const sections = [
  { id: "all", label: "All Teachers" },
  { id: "primary", label: "Primary (I-V)" },
  { id: "middle", label: "Middle (VI-VIII)" },
  { id: "secondary", label: "Secondary (IX-XII)" },
  { id: "office", label: "Office Management" }
];

const TeachersPage = () => {
  const [activeSection, setActiveSection] = useState("all");

  const filteredTeachers = teachers.filter(teacher => 
    activeSection === "all" ? true : teacher.sections.includes(activeSection)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-[#0EA5E9] mb-12">
          Our Teaching Staff
        </h1>

        {/* Section Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {sections.map((section) => (
            <Button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              variant={activeSection === section.id ? "default" : "outline"}
              className={`
                rounded-full px-6 py-2 transition-all duration-300
                ${activeSection === section.id 
                  ? 'bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] text-white shadow-lg' 
                  : 'hover:bg-gray-100'
                }
              `}
            >
              {section.label}
            </Button>
          ))}
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative w-full h-[400px]">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {teacher.name}
                </h3>
                <p className="text-blue-600 font-medium">
                  Experience: {teacher.experience}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No teachers found in this section.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TeachersPage;