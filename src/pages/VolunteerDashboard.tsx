
import React from "react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Clock, MapPin, Calendar, LogOut, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VolunteerDashboard: React.FC = () => {
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
      
      <div className="bg-success/10 py-4 border-y border-success/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Volunteer Dashboard</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-success" /> Upcoming Shifts
              </CardTitle>
              <CardDescription>Your scheduled volunteer work</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-md bg-card">
                  <div className="font-medium">No upcoming shifts</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    You don't have any scheduled volunteer work yet.
                  </p>
                </div>
                
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" /> Sign Up for Shifts
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-info" /> Nearby Opportunities
              </CardTitle>
              <CardDescription>Places that need volunteers now</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-md">
                  <div className="font-medium">City Hall Relief Center</div>
                  <div className="text-sm text-muted-foreground">Downtown San Francisco</div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span>Needs: 5 volunteers</span>
                    <span>2.5 miles away</span>
                  </div>
                </div>
                
                <div className="p-3 bg-muted rounded-md">
                  <div className="font-medium">South Bay Emergency Camp</div>
                  <div className="text-sm text-muted-foreground">San Jose</div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span>Needs: 12 volunteers</span>
                    <span>15 miles away</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View All Opportunities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> Volunteering History
              </CardTitle>
              <CardDescription>
                Your contributions to disaster relief efforts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-md bg-card">
                  <div className="font-medium">No volunteer history</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your volunteer history will appear here once you've completed shifts.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="bg-primary/10 p-4 rounded-md text-center">
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">Hours Volunteered</div>
                  </div>
                  
                  <div className="bg-success/10 p-4 rounded-md text-center">
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">People Helped</div>
                  </div>
                  
                  <div className="bg-alert/10 p-4 rounded-md text-center">
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-muted-foreground">Camps Supported</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-alert" /> Available Training
              </CardTitle>
              <CardDescription>
                Enhance your skills to help more effectively
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">First Aid Basics</h3>
                    <p className="text-sm text-muted-foreground mb-4">Learn essential first aid skills for emergency situations</p>
                    <Button variant="outline" className="w-full">Start Training</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">Evacuation Procedures</h3>
                    <p className="text-sm text-muted-foreground mb-4">Safe evacuation techniques for different disaster scenarios</p>
                    <Button variant="outline" className="w-full">Start Training</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">Shelter Management</h3>
                    <p className="text-sm text-muted-foreground mb-4">How to effectively manage emergency shelters</p>
                    <Button variant="outline" className="w-full">Start Training</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VolunteerDashboard;
