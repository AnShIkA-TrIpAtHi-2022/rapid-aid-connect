
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, MapPin, User, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SOSRequest {
  id: string;
  name: string;
  location: string;
  emergency: string;
  timestamp: string;
  distance: string;
  status: "pending" | "assigned" | "resolved";
}

const mockSOSRequests: SOSRequest[] = [
  {
    id: "sos1",
    name: "John Smith",
    location: "Tenderloin District, San Francisco",
    emergency: "Medical",
    timestamp: "10 mins ago",
    distance: "1.2 miles away",
    status: "pending"
  },
  {
    id: "sos2",
    name: "Sarah Johnson",
    location: "Mission District, San Francisco",
    emergency: "Trapped",
    timestamp: "15 mins ago",
    distance: "2.5 miles away",
    status: "pending"
  },
  {
    id: "sos3",
    name: "Michael Chen",
    location: "SoMa, San Francisco",
    emergency: "Supplies",
    timestamp: "25 mins ago",
    distance: "0.8 miles away",
    status: "pending"
  }
];

const SOSRequests: React.FC = () => {
  const [requests, setRequests] = useState<SOSRequest[]>(mockSOSRequests);
  const { toast } = useToast();

  const handleRequestAction = (requestId: string, action: "assign" | "resolve") => {
    setRequests(prevRequests => 
      prevRequests.map(req => {
        if (req.id === requestId) {
          return { 
            ...req, 
            status: action === "assign" ? "assigned" : "resolved" 
          };
        }
        return req;
      })
    );

    const message = action === "assign" 
      ? "You've been assigned to this emergency. Please proceed to the location."
      : "Emergency has been marked as resolved. Thank you for your help.";
      
    toast({
      title: action === "assign" ? "Emergency Assigned" : "Emergency Resolved",
      description: message,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-emergency" /> Emergency SOS Requests
        </CardTitle>
        <CardDescription>
          View and respond to nearby emergency requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No emergency requests at this time
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map(request => (
              <div key={request.id} className="border rounded-md p-4 bg-card">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span className="font-medium">{request.name}</span>
                    </div>
                    
                    <div className="space-y-1 mt-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        <span>{request.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                        <span>{request.timestamp} • {request.distance}</span>
                      </div>
                    </div>
                  </div>

                  <Badge 
                    className={
                      request.status === "pending" 
                        ? "bg-emergency" 
                        : request.status === "assigned" 
                          ? "bg-info" 
                          : "bg-success"
                    }
                  >
                    {request.emergency}
                  </Badge>
                </div>
                
                <div className="flex mt-3 space-x-2 justify-end">
                  {request.status === "pending" && (
                    <Button size="sm" onClick={() => handleRequestAction(request.id, "assign")}>
                      Respond to Emergency
                    </Button>
                  )}
                  {request.status === "assigned" && (
                    <Button size="sm" variant="outline" onClick={() => handleRequestAction(request.id, "resolve")}>
                      <CheckCircle className="h-4 w-4 mr-1" /> Mark as Resolved
                    </Button>
                  )}
                  {request.status === "resolved" && (
                    <span className="text-sm text-success flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" /> Resolved
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SOSRequests;
