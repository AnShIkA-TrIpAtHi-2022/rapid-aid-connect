import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const SOSButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [description, setDescription] = useState(""); // State for custom description
  const { toast } = useToast();

  const handleEmergencySubmit = async (emergencyType: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Unauthorized",
          description: "Please log in to send an SOS request.",
          variant: "destructive",
        });
        return;
      }

      // Fetch user's location using Geolocation API
      const getLocation = async () => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                type: "Point",
                coordinates: [position.coords.longitude, position.coords.latitude],
                address: "User's current location", // Replace with reverse geocoding if needed
              });
            },
            (error) => {
              reject(error);
            }
          );
        });
      };

      const location = await getLocation();

      const response = await axios.post(
        "/api/sos",
        {
          emergency: emergencyType,
          description: description || `${emergencyType} emergency`, // Use custom description if provided
          location, // Include dynamic location
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "SOS Request Sent",
        description: "Your emergency request has been sent successfully.",
        variant: "default",
      });
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error("Failed to send SOS request:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to send SOS request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button
        className="sos-button w-full md:w-64 h-16 text-xl animate-pulse-emergency"
        onClick={() => setIsDialogOpen(true)}
      >
        <AlertCircle className="mr-2 h-6 w-6" />
        SOS EMERGENCY
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-emergency flex items-center">
              <AlertCircle className="mr-2" /> Emergency Assistance
            </DialogTitle>
            <DialogDescription>
              What type of emergency are you experiencing?
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Add additional details (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              {["Medical", "Trapped", "Supplies", "Other"].map((type) => (
                <Button
                  key={type}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center border-2 border-emergency hover:bg-emergency/10"
                  onClick={() => handleEmergencySubmit(type)}
                >
                  <span className="text-lg">{type}</span>
                  <span className="text-xs">{`Need ${type.toLowerCase()}`}</span>
                </Button>
              ))}
            </div>

            <div className="mt-2 rounded-md bg-muted p-3">
              <div className="font-semibold text-sm flex items-center">
                <Phone className="w-4 h-4 mr-2" /> Emergency Hotline
              </div>
              <div className="text-lg font-bold">1-800-DISASTER</div>
              <div className="text-xs text-muted-foreground">Call if possible instead of digital SOS</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSButton;