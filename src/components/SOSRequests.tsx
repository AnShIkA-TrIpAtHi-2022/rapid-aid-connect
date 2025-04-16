import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, MapPin, User, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

interface SOSRequest {
  id: string;
  name: string;
  location: {
    type: string;
    coordinates: [number, number];
    address: string;
  };
  emergency: string;
  timestamp: string;
  distance: string;
  status: "pending" | "assigned" | "resolved";
}

const SOSRequests: React.FC = () => {
  const [requests, setRequests] = useState<SOSRequest[]>([]);
  const { toast } = useToast();

  // Fetch SOS requests from the backend
  useEffect(() => {
    const fetchSOSRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Unauthorized: No token found");
          return;
        }

        const { data } = await axios.get("/api/sos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRequests(data.data || []);
      } catch (error) {
        console.error("Failed to fetch SOS requests:", error);
        toast({
          title: "Error",
          description: "Failed to fetch SOS requests. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchSOSRequests();
  }, [toast]);

  // Update SOS request status
  const updateSOSStatus = async (requestId: string, status: "assigned" | "resolved") => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Unauthorized: No token found");
        return;
      }

      await axios.put(
        `/api/sos/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local state
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === requestId ? { ...req, status } : req
        )
      );

      toast({
        title: status === "assigned" ? "Volunteer Assigned" : "SOS Resolved",
        description:
          status === "assigned"
            ? "The SOS request has been assigned to a volunteer."
            : "The SOS request has been marked as resolved.",
      });
    } catch (error) {
      console.error("Failed to update SOS status:", error);
      toast({
        title: "Error",
        description: "Failed to update SOS status. Please try again later.",
        variant: "destructive",
      });
    }
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
            {requests.map((request) => (
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
                        <span>{request.location.address}</span>
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
                    <Button
                      size="sm"
                      onClick={() => updateSOSStatus(request.id, "assigned")}
                    >
                      Respond to Emergency
                    </Button>
                  )}
                  {request.status === "assigned" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateSOSStatus(request.id, "resolved")}
                    >
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