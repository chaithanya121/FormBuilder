import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  FileText,
  FilePlus,
  UserCircle,
  Settings,
  LogOut,
  FerrisWheel,
  BadgeAlert,
  Menu as MenuIcon,
  User,
} from "lucide-react";
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
import { useTheme } from "./theme-provider";

const Header = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const { theme } = useTheme();

  const isLightTheme = theme === "light";

  const headerBgClass = isLightTheme
    ? "bg-white shadow-md border-b border-gray-200"
    : "bg-gradient-to-r from-indigo-950 via-purple-900 to-indigo-950 backdrop-blur-xl border-b border-white/10 shadow-lg";

  const textClass = isLightTheme ? "text-gray-800" : "text-blue-100";
  const iconClass = isLightTheme ? "text-indigo-600" : "text-blue-200";
  const hoverBgClass = isLightTheme
    ? "hover:bg-gray-100"
    : "hover:bg-indigo-700/30";
  const buttonBgClass = isLightTheme
    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white";
  const ghostButtonClass = isLightTheme
    ? "text-gray-700 hover:bg-gray-100"
    : "text-blue-100 hover:bg-indigo-700/30";
  const dropdownBgClass = isLightTheme
    ? "bg-white border border-gray-200"
    : "bg-indigo-950/95 backdrop-blur-md border border-indigo-500/20";
  const drawerBgClass = isLightTheme
    ? "bg-white border-gray-200"
    : "bg-indigo-950 border-indigo-800/50";
  const drawerLinkClass = isLightTheme
    ? "text-gray-700 hover:bg-gray-100"
    : "text-blue-100 hover:bg-indigo-800/30";

  const nav_tabs = [
    {
      label: "Home",
      element: <Home className={`h-5 w-5 ${iconClass}`} />,
      link:'/'
    },
    {
      label: "Features",
      element: <FerrisWheel className={`h-5 w-5 ${iconClass}`} />,
      link:'/features'
    },
    {
      label: "About",
      element: <BadgeAlert className={`h-5 w-5 ${iconClass}`} />,
      link:'/about'
    },
    {
      label: "Contact",
      element: <User className={`h-5 w-5 ${iconClass}`} />,
      link:'/contact'
    },
  ];

   const nav_tabs_auth = [
    {
      label: "Home",
      element: <Home className={`h-5 w-5 ${iconClass}`} />,
      link:'/'
    },
    {
      label: "Forms",
      element: <FerrisWheel className={`h-5 w-5 ${iconClass}`} />,
      link:'/forms'
    },
   
  ];

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
          icon: "test",
        },
      ],
    },
    {
      label: "About",
      slug: "about",
      id: 2,
      icon: "",
    },
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

  console.log("auth", authTab);
  return (
    <header className={`sticky top-0 z-50 w-full ${headerBgClass}`}>
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left side - Logo and mobile menu button */}
        <div className="flex items-center gap-2">
          <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden ${ghostButtonClass} rounded-xl`}
                aria-label="Open menu"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className={drawerBgClass}>
              <div className="p-4">
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/"
                    className={`flex items-center gap-3 p-2 rounded-lg ${drawerLinkClass}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home className={`h-5 w-5 ${iconClass}`} />
                    <span className={textClass}>Home</span>
                  </Link>
                  <Link
                    to="/forms"
                    className={`flex items-center gap-3 p-2 rounded-lg ${drawerLinkClass}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FileText className={`h-5 w-5 ${iconClass}`} />
                    <span className={textClass}>Forms</span>
                  </Link>
                  <Link
                    to="/create"
                    className={`flex items-center gap-3 p-2 rounded-lg ${drawerLinkClass}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FilePlus className={`h-5 w-5 ${iconClass}`} />
                    <span className={textClass}>Create</span>
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
                        className={
                          isLightTheme
                            ? "text-gray-800 border-gray-300 hover:bg-gray-50"
                            : "text-blue-100 border-indigo-700 hover:bg-indigo-700/30"
                        }
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => {
                          handleOpenSignUp();
                          setMobileMenuOpen(false);
                        }}
                        className={buttonBgClass}
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
                duration: 0.5,
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
                className={`font-bold text-xl ${
                  isLightTheme
                    ? "text-gray-800"
                    : "bg-gradient-to-r from-white via-blue-200 to-indigo-100 bg-clip-text text-transparent"
                } tracking-tight sm:inline-block`}
              >
                Form Builder
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className={`text-xs font-medium ${
                  isLightTheme ? "text-indigo-600" : "text-indigo-300"
                } -mt-1 tracking-wide sm:inline-block`}
              >
                Pro
              </motion.span>
            </div>
          </Link>
        </div>

        {/* Middle - Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-6">
          {
            isAuthenticated ?
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {nav_tabs_auth.map((item) => {
                  return (
                    <NavigationMenuItem key={item.label}>
                      <Link to={item.link}>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            `gap-2 ${textClass} hover:text-${
                              isLightTheme ? "indigo-600" : "white"
                            } ${hoverBgClass} rounded-xl transition-all duration-200`
                          )}
                        >
                          {item.element}
                          <span>{item.label}</span>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
            :
               <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {nav_tabs.map((item) => {
                  return (
                    <NavigationMenuItem key={item.label}>
                      <Link to={item.link}>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            `gap-2 ${textClass} hover:text-${
                              isLightTheme ? "indigo-600" : "white"
                            } ${hoverBgClass} rounded-xl transition-all duration-200`
                          )}
                        >
                          {item.element}
                          <span>{item.label}</span>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>

          }
        </div>

        {/* Right side - Auth/User controls */}
        <div className="flex items-center gap-3">
          {/* Mobile navigation icons - only shown on small screens */}
          <nav className="flex md:hidden items-center justify-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className={`relative ${ghostButtonClass} rounded-xl transition-all duration-200`}
            >
              <Link to="/">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className={`relative ${ghostButtonClass} rounded-xl transition-all duration-200`}
            >
              <Link to="/forms">
                <FileText className="h-5 w-5" />
                <span className="sr-only">Forms</span>
              </Link>
            </Button>
          </nav>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0 overflow-hidden group"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      isLightTheme
                        ? "from-blue-500/10 to-purple-500/10"
                        : "from-blue-500/20 to-purple-500/20"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full`}
                  ></div>
                  <Avatar
                    className={`h-9 w-9 border ${
                      isLightTheme
                        ? "border-indigo-200 ring-2 ring-indigo-100"
                        : "border-indigo-500/20 ring-2 ring-indigo-500/10"
                    } shadow-md transition-all duration-200 group-hover:ring-indigo-400/50`}
                  >
                    <AvatarImage
                      src={user?.avatar || undefined}
                      alt={user?.name || ""}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={`w-56 ${dropdownBgClass} ${
                  isLightTheme ? "text-gray-800" : "text-indigo-100"
                } shadow-xl rounded-xl p-1`}
              >
                <div
                  className={`flex items-center gap-3 p-3 border-b ${
                    isLightTheme ? "border-gray-200" : "border-indigo-500/20"
                  }`}
                >
                  <Avatar
                    className={`h-10 w-10 ${
                      isLightTheme
                        ? "border border-indigo-200"
                        : "border border-indigo-500/30"
                    }`}
                  >
                    <AvatarImage
                      src={user?.avatar || undefined}
                      alt={user?.name || ""}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-indigo-300">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuItem
                  onClick={() => setSettingsOpen(true)}
                  className={`cursor-pointer ${
                    isLightTheme
                      ? "hover:bg-gray-100"
                      : "hover:bg-indigo-700/30"
                  } py-2.5 mt-1 rounded-lg transition-colors duration-200`}
                >
                  <Settings
                    className={`mr-2 h-4 w-4 ${
                      isLightTheme ? "text-indigo-600" : "text-indigo-400"
                    }`}
                  />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`cursor-pointer ${
                    isLightTheme
                      ? "hover:bg-gray-100"
                      : "hover:bg-indigo-700/30"
                  } py-2.5 rounded-lg transition-colors duration-200`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>Theme</span>
                    <ThemeToggle variant="switch" />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator
                  className={
                    isLightTheme ? "bg-gray-200 my-1" : "bg-indigo-500/20 my-1"
                  }
                />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className={`cursor-pointer ${
                    isLightTheme
                      ? "hover:bg-red-50 text-red-600"
                      : "hover:bg-red-900/20 text-red-300"
                  } py-2.5 rounded-lg transition-colors duration-200`}
                >
                  <LogOut
                    className={`mr-2 h-4 w-4 ${
                      isLightTheme ? "text-red-600" : "text-red-400"
                    }`}
                  />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <ThemeToggle variant="icon" className={ghostButtonClass} />

              <Button
                variant="ghost"
                onClick={handleOpenSignIn}
                className={`${ghostButtonClass} rounded-xl transition-all duration-200 hidden sm:inline-flex`}
              >
                Sign In
              </Button>
              <Button
                onClick={handleOpenSignUp}
                className={`${buttonBgClass} border-0 shadow-md rounded-xl transition-all duration-200 hidden sm:inline-flex`}
              >
                Register
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleOpenSignIn}
                className={`sm:hidden ${ghostButtonClass} rounded-xl transition-all duration-200`}
              >
                <UserCircle className="h-5 w-5" />
                <span className="sr-only">Sign In</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Auth Dialog */}
      {authDialogOpen && (
        <AuthDialog
          isOpen={authDialogOpen}
          onOpenChange={setAuthDialogOpen}
          defaultTab={authTab}
        />
      )}

      {/* User Settings Dialog */}
      <UserSettings isOpen={settingsOpen} onOpenChange={setSettingsOpen} />
    </header>
  );
};

export default Header;
