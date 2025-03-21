import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const Enquiry = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    enquiryType: "",
    name: "",
    email: "",
    phone: "",
    fullAddress: "",
    message: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://formcarry.com/s/jpFEOVCmLiA", {
        method: 'POST',
        headers: { 
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.code === 200) {
        toast({
          title: "Enquiry Submitted",
          description: "Thank you for contacting us, we will get back to you as soon as possible.",
          duration: 3000,
        });
        // Reset form
        setFormData({
          enquiryType: "",
          name: "",
          email: "",
          phone: "",
          fullAddress: "",
          message: ""
        });
      } else {
        setError(data.message || "Something went wrong. Please try again.");
        toast({
          title: "Submission Failed",
          description: data.message || "Something went wrong. Please try again.",
          duration: 3000,
          variant: "destructive"
        });
      }
    } catch (error: any) {
      setError(error.message || "Failed to submit form. Please try again.");
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit form. Please try again.",
        duration: 3000,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-[#0EA5E9] mb-12">
            Send us a Message
          </h1>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Section - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Select
                  value={formData.enquiryType}
                  onValueChange={(value) => setFormData({ ...formData, enquiryType: value })}
                >
                  <SelectTrigger className="w-full bg-white/70 backdrop-blur-sm">
                    <SelectValue placeholder="Select Enquiry Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admission">Admission Enquiry</SelectItem>
                    <SelectItem value="general">General Enquiry</SelectItem>
                    <SelectItem value="academic">Academic Enquiry</SelectItem>
                    <SelectItem value="transport">Transport Enquiry</SelectItem>
                    <SelectItem value="fee">Fee Structure Enquiry</SelectItem>
                  </SelectContent>
                </Select>

                <div className="space-y-5">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />

                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />

                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />

                  <Input
                    type="text"
                    name="fullAddress"
                    placeholder="Full Address"
                    className="w-full px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm"
                    value={formData.fullAddress}
                    onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                    required
                  />

                  <Textarea
                    name="message"
                    placeholder="Your Message or Query"
                    className="w-full px-4 py-2 rounded-lg min-h-[120px] bg-white/70 backdrop-blur-sm"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-sdblue hover:bg-blue-600 text-white py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Enquiry'}</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            {/* Right Section - Map */}
            <div className="rounded-xl overflow-hidden shadow-lg bg-white">
              <div className="p-4 bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6]">
                <h2 className="text-xl font-semibold text-white">Our Location</h2>
                <p className="text-blue-50">S D ACADEMY & TENDERCARE PLAYWAY RAPTINAGAR GORAKHPUR</p>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.5956576869316!2d83.38141577482695!3d26.789155976721023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399145015195c359%3A0x477ad60165759ca3!2sS%20D%20ACADEMY%20%26%20TENDERCARE%20PLAYWAY%20RAPTINAGAR%20GORAKHPUR!5e0!3m2!1sen!2sin!4v1739810994986!5m2!1sen!2sin"
                className="w-full h-[500px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-4 bg-white">
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-gray-700">Address:</p>
                  <p className="text-gray-600">Raptinagar, Gorakhpur, Uttar Pradesh, India</p>
                  <p className="text-blue-600 font-medium">Get directions on Google Maps →</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Enquiry;
