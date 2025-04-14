
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-info shadow-md py-3">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-6 w-6 text-emergency mr-2" />
          <h1 className="text-white text-xl font-bold">Rapid Aid Connect</h1>
        </div>
        
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <Button variant="secondary" size="sm">
            Login
          </Button>
          <span className="text-xs text-white/80">For donors, volunteers & response teams</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
