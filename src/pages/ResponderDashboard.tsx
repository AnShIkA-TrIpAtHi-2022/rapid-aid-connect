
import React from "react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Radio, Users, AlertTriangle, Map, LogOut, ArrowLeft, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ResponderDashboard: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  if (!user) {
    // Redirect to home if not logged in
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="bg-emergency/10 py-4 border-y border-emergency/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Response Team Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.name}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
              </Button>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-3">
            <CardHeader className="pb-2 bg-emergency/10">
              <CardTitle className="flex items-center gap-2 text-emergency">
                <AlertCircle className="h-5 w-5" /> Emergency Alerts
              </CardTitle>
              <CardDescription>Critical situations requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-4 border border-emergency rounded-md bg-emergency/5 flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-emergency flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-emergency mb-1">URGENT: Flooding in Downtown Area</div>
                    <p className="text-sm mb-2">
                      Rising water levels have trapped residents in the northern downtown sector. Immediate evacuation assistance needed.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" className="bg-emergency">
                        <Radio className="h-3 w-3 mr-1" /> Respond
                      </Button>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-alert rounded-md bg-alert/5 flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-alert flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-alert mb-1">WARNING: Wildfire Approaching Western Region</div>
                    <p className="text-sm mb-2">
                      Wildfire predicted to reach residential areas within 12 hours. Evacuation planning required.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" className="bg-alert text-alert-foreground">
                        <Radio className="h-3 w-3 mr-1" /> Respond
                      </Button>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-info" /> Team Status
              </CardTitle>
              <CardDescription>Your response team's current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-success/10 p-3 rounded-md text-center">
                  <div className="text-success font-medium">ACTIVE</div>
                  <div className="text-sm text-muted-foreground">Your team is ready for deployment</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="border border-border rounded-md p-3 text-center">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-xs text-muted-foreground">Team Members</div>
                  </div>
                  <div className="border border-border rounded-md p-3 text-center">
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-xs text-muted-foreground">Active Missions</div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" /> Update Status
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-primary" /> Resource Map
              </CardTitle>
              <CardDescription>Available resources in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Resource map visualization</p>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-success/10 p-2 rounded-md">
                    <div className="font-medium">14</div>
                    <div>Medical</div>
                  </div>
                  <div className="bg-info/10 p-2 rounded-md">
                    <div className="font-medium">28</div>
                    <div>Food/Water</div>
                  </div>
                  <div className="bg-alert/10 p-2 rounded-md">
                    <div className="font-medium">9</div>
                    <div>Transport</div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Open Full Map
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Radio className="h-5 w-5 text-emergency" /> Communications
              </CardTitle>
              <CardDescription>Team and emergency communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-md">
                  <div className="font-medium">Emergency Channels</div>
                  <div className="text-sm text-muted-foreground">All channels clear</div>
                  <div className="mt-2 text-xs bg-success/20 text-success p-1 rounded inline-block">Online</div>
                </div>
                
                <div className="p-3 bg-muted rounded-md">
                  <div className="font-medium">Team Radio</div>
                  <div className="text-sm text-muted-foreground">Channel 4 active</div>
                  <div className="mt-2 text-xs bg-success/20 text-success p-1 rounded inline-block">Online</div>
                </div>
                
                <Button className="w-full">
                  Open Communication Center
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Incident Reports</CardTitle>
            <CardDescription>
              Recent incidents requiring follow-up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="mb-6 text-muted-foreground">
                No active incident reports requiring your attention.
              </p>
              <Button variant="outline" className="mx-auto">
                View Archive
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResponderDashboard;
