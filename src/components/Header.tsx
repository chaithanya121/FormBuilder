
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, FileText, FilePlus, UserCircle, Settings, LogOut, FerrisWheel, BadgeAlert, Menu as MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthDialog } from "./auth/AuthDialog";
import { UserSettings } from "./settings/UserSettings";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Menu from "./menu.jsx";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ThemeToggle } from "@/components/ThemeToggle";

const Header = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const nav_tabs=[{
    label:'Home',
    element:  <Home className="h-5 w-5 text-blue-200" />
  },
{
    label:'Features',
    element: <FerrisWheel className="h-5 w-5 text-blue-200"/>
  },
{
    label:'About',
    element: <BadgeAlert className="h-5 w-5 text-blue-200" />
  },
{
    label:'Contact',
    element: <UserSearch className="h-5 w-5 text-blue-200" />
  }]
  
  const handleOpenSignIn = () => {
    setAuthTab("signin");
    setAuthDialogOpen(true);
  };

  const dataset = [
    {
      label: "Home",
      id: 1,
      icon: "test",
      collapsed: true,
      children: [
        {
          label: "Home Item 1",
          slug: "home/item-1",
          id: 2,
          icon: "test"
        }
      ]
    },
    {
      label: "About",
      slug: "about",
      id: 2,
      icon: ""
    }
  ];

  const handleOpenSignUp = () => {
    setAuthTab("signup");
    setAuthDialogOpen(true);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-950 via-purple-900 to-indigo-950 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className=" mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left side - Logo and mobile menu button */}
        <div className="flex items-center gap-2">
          <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DrawerTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-blue-100 hover:bg-indigo-700/30"
                aria-label="Open menu"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-indigo-950 border-indigo-800/50">
              <div className="p-4">
                <div className="flex flex-col space-y-3">
                 <Link 
                    to="/" 
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-800/30"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home className="h-5 w-5 text-blue-200" />
                    <span className="text-blue-100">Home</span>
                  </Link>
                  <Link 
                    to="/forms" 
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-800/30"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FileText className="h-5 w-5 text-blue-200" />
                    <span className="text-blue-100">Forms</span>
                  </Link>
                  <Link 
                    to="/create" 
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-800/30"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FilePlus className="h-5 w-5 text-blue-200" />
                    <span className="text-blue-100">Create</span>
                  </Link>
                  
                  <div className="flex items-center gap-3 p-2 rounded-lg">
                    <ThemeToggle variant="switch" className="w-full" />
                  </div>
                  
                  {!isAuthenticated && (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          handleOpenSignIn();
                          setMobileMenuOpen(false);
                        }}
                        className="text-blue-100 border-indigo-700 hover:bg-indigo-700/30"
                      >
                        Sign In
                      </Button>
                      <Button 
                        onClick={() => {
                          handleOpenSignUp();
                          setMobileMenuOpen(false);
                        }}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white"
                      >
                        Register
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                duration: 0.5 
              }}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-700 opacity-90"></div>
              <FilePlus className="h-5 w-5 text-white relative z-10" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </motion.div>
            
            <div className="flex flex-col">
              <motion.span 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="font-bold text-xl bg-gradient-to-r from-white via-blue-200 to-indigo-100 bg-clip-text text-transparent tracking-tight sm:inline-block"
              >
                Form Builder
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-xs font-medium text-indigo-300 -mt-1 tracking-wide sm:inline-block"
              >
                Pro
              </motion.span>
            </div>
          </Link>
        </div>
        
        {/* Middle - Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-6">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
            {
                   nav_tabs.map((item)=>{
                      return(

                      <NavigationMenuItem key={item.label}>
                        <Link to="/">
                          <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2 text-blue-100 hover:text-white hover:bg-indigo-700/30 rounded-xl transition-all duration-200")}>
                           {item.element}
                            <span>{item.label}</span>
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                      )
                    })
                  }
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side - Auth/User controls */}
        <div className="flex items-center gap-3">
          {/* Mobile navigation icons - only shown on small screens */}
          <nav className="flex md:hidden items-center justify-center gap-1">
            <Button variant="ghost" size="icon" asChild className="relative text-blue-100 hover:text-white hover:bg-indigo-700/30 rounded-xl transition-all duration-200">
              <Link to="/">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="relative text-blue-100 hover:text-white hover:bg-indigo-700/30 rounded-xl transition-all duration-200">
              <Link to="/forms">
                <FileText className="h-5 w-5" />
                <span className="sr-only">Forms</span>
              </Link>
            </Button>
          </nav>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  <Avatar className="h-9 w-9 border border-indigo-500/20 ring-2 ring-indigo-500/10 shadow-md transition-all duration-200 group-hover:ring-indigo-400/50">
                    <AvatarImage src={user?.avatar || undefined} alt={user?.name || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-indigo-950/95 backdrop-blur-md border border-indigo-500/20 text-indigo-100 shadow-xl rounded-xl p-1">
                <div className="flex items-center gap-3 p-3 border-b border-indigo-500/20">
                  <Avatar className="h-10 w-10 border border-indigo-500/30">
                    <AvatarImage src={user?.avatar || undefined} alt={user?.name || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-indigo-300">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuItem 
                  onClick={() => setSettingsOpen(true)}
                  className="cursor-pointer hover:bg-indigo-700/30 py-2.5 mt-1 rounded-lg transition-colors duration-200"
                >
                  <Settings className="mr-2 h-4 w-4 text-indigo-400" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-indigo-700/30 py-2.5 rounded-lg transition-colors duration-200">
                  <div className="flex items-center justify-between w-full">
                    <span>Theme</span>
                    <ThemeToggle variant="switch" />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-indigo-500/20 my-1" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer hover:bg-red-900/20 py-2.5 rounded-lg text-red-300 transition-colors duration-200"
                >
                  <LogOut className="mr-2 h-4 w-4 text-red-400" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <ThemeToggle variant="icon" className="text-blue-100 hover:text-white hover:bg-indigo-700/30" />
              
              <Button 
                variant="ghost" 
                onClick={handleOpenSignIn}
                className="text-blue-100 hover:text-white hover:bg-indigo-700/30 rounded-xl transition-all duration-200 hidden sm:inline-flex"
              >
                Sign In
              </Button>
              <Button 
                onClick={handleOpenSignUp}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white hidden sm:inline-flex border-0 shadow-md rounded-xl transition-all duration-200"
              >
                Register
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleOpenSignIn}
                className="sm:hidden text-blue-100 hover:text-white hover:bg-indigo-700/30 rounded-xl transition-all duration-200"
              >
                <UserCircle className="h-5 w-5" />
                <span className="sr-only">Sign In</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
        defaultTab={authTab}
      />

      {/* User Settings Dialog */}
      <UserSettings 
        isOpen={settingsOpen} 
        onOpenChange={setSettingsOpen} 
      />
    </header>
  );
};

export default Header;
