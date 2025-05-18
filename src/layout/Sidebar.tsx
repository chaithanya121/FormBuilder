import React from 'react';
import { cn } from "@/lib/utils";
import { 
  Home,
  CircleUser,
  Settings,
  BarChart2,
  MessageSquare,
  Calendar,
  FileText,
  ChevronLeft,
  Star,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const menuItems = [
  { name: "Dashboard", icon: Home, link: "/" },
  { name: "Analytics", icon: BarChart2, link: "#" },
  { name: "Messages", icon: MessageSquare, link: "#" },
  { name: "Calendar", icon: Calendar, link: "#" },
  { name: "Documents", icon: FileText, link: "#" },
  { name: "Favorites", icon: Star, link: "#" },
  { name: "Saved", icon: Heart, link: "#" },
  { name: "Profile", icon: CircleUser, link: "#" },
  { name: "Settings", icon: Settings, link: "#" },
];

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  return (
    <>
      {/* Overlay for mobile */}
      {/* {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )} */}
      
      <aside 
        className={cn(
          "fixed top-0 pt-16 bottom-0 left-0 z-30 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 ease-in-out shadow-xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-700/50">
          <a href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-8 w-8 rounded-md flex items-center justify-center shadow-md transition-transform group-hover:scale-110 duration-300">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="font-semibold text-xl text-white">Lovable</span>
          </a>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white hover:bg-gray-800/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="py-6 px-3">
          <TooltipProvider delayDuration={300}>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        href={item.link}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors group relative overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <item.icon className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-gray-800 text-white border-gray-700">
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </TooltipProvider>
          
          <Separator className="my-6 bg-gray-700/50" />
          
          <div className="px-3 py-4">
            <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-md">
                <span className="font-medium text-sm">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-400">john@example.com</p>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
