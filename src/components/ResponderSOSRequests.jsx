import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";

const ResponderSOSRequests = () => {
  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedSOS, setSelectedSOS] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch SOS requests
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

        setRequests(data.data || []); // Adjust based on API response
      } catch (error) {
        console.error("Failed to fetch SOS requests:", error);
        setRequests([]);
      }
    };

    fetchSOSRequests();
  }, []);

  // Fetch available volunteers
  const fetchVolunteers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Unauthorized: No token found");
        return;
      }

      const { data } = await axios.get("/api/volunteers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVolunteers(data.data || []); // Adjust based on API response
    } catch (error) {
      console.error("Failed to fetch volunteers:", error);
      setVolunteers([]);
    }
  };

  // Assign a volunteer to an SOS request
  const assignVolunteer = async (volunteerId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Unauthorized: No token found");
        return;
      }

      await axios.put(
        `/api/sos/${selectedSOS}/assign`,
        { volunteerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh SOS requests after assignment
      const updatedRequests = requests.map((request) =>
        request.id === selectedSOS ? { ...request, status: "assigned" } : request
      );
      setRequests(updatedRequests);

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to assign volunteer:", error);
    }
  };

  // Open the dialog to assign a volunteer
  const openAssignDialog = (sosId) => {
    setSelectedSOS(sosId);
    fetchVolunteers();
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SOS Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <div className="text-center text-muted-foreground">No SOS requests available.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Emergency</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(requests) &&
                requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.emergency}</TableCell>
                    <TableCell>{request.description}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          request.status === "pending"
                            ? "bg-emergency text-emergency-foreground"
                            : request.status === "assigned"
                            ? "bg-info text-info-foreground"
                            : "bg-success text-success-foreground"
                        }
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {request.status === "pending" && (
                        <Button
                          variant="outline"
                          onClick={() => openAssignDialog(request.id)}
                        >
                          Assign Volunteer
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Dialog for assigning a volunteer */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Volunteer</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {volunteers.length === 0 ? (
              <div className="text-center text-muted-foreground">
                No available volunteers.
              </div>
            ) : (
              volunteers.map((volunteer) => (
                <Button
                  key={volunteer.id}
                  variant="outline"
                  className="w-full"
                  onClick={() => assignVolunteer(volunteer.id)}
                >
                  {volunteer.name} ({volunteer.email})
                </Button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ResponderSOSRequests;