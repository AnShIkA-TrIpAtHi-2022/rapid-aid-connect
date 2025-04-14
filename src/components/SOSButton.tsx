
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Phone, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const SOSButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSOSClick = () => {
    setIsDialogOpen(true);
  };

  const handleEmergencySubmit = () => {
    // In a real app, this would send the emergency information to the server
    toast({
      title: "Emergency alert sent!",
      description: "Help is on the way. Stay calm and follow safety guidelines.",
      variant: "destructive"
    });
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button 
        className="sos-button w-full md:w-64 h-16 text-xl animate-pulse-emergency"
        onClick={handleSOSClick}
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
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center border-2 border-emergency hover:bg-emergency/10"
                onClick={handleEmergencySubmit}
              >
                <span className="text-lg">Medical</span>
                <span className="text-xs">Need medical help</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center border-2 border-emergency hover:bg-emergency/10"
                onClick={handleEmergencySubmit}
              >
                <span className="text-lg">Trapped</span>
                <span className="text-xs">Need evacuation</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center border-2 border-emergency hover:bg-emergency/10"
                onClick={handleEmergencySubmit}
              >
                <span className="text-lg">Supplies</span>
                <span className="text-xs">Need food/water</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center border-2 border-emergency hover:bg-emergency/10"
                onClick={handleEmergencySubmit}
              >
                <span className="text-lg">Other</span>
                <span className="text-xs">Different emergency</span>
              </Button>
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
