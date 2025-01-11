"use client";
import { Button } from "./ui/button";
import * as React from "react";
import logo from "@/assets/1.png";
import hiring from "@/assets/hiring.png";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { useScroll } from "@/hooks/useScroll";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle, LogOut, Settings } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Candidate Contacts",
    href: "/candidatecontacts",
    description: "Connect with top candidates and streamline recruitment.",
  },
  {
    title: "Partners Contacts",
    href: "/partnercontacts",
    description: "Partner with top candidates for lasting success.",
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { scrolled, visible } = useScroll();
  const { user, loading, logout } = useAuth();

  // Function to close the sheet
  const handleLinkClick = () => {
    setOpen(false);
  };

  const CandidatesMobileContent = () => (
    <div className="mt-2 px-2 pb-2">
      <Link
        to="/opportunities?type=internship"
        className="flex flex-col gap-2 p-4 rounded-md hover:bg-accent"
        onClick={handleLinkClick}
      >
        <img src={hiring} alt="hire" className="h-32 w-full object-cover rounded-md" />
        <div className="font-medium">Internships</div>
        <p className="text-sm text-muted-foreground">
          Launch your career with exciting internship opportunities!
        </p>
      </Link>
      <MobileListItem to="/opportunities" title="Opportunities" onClick={handleLinkClick}>
        Scholarships, competitions and programs
      </MobileListItem>
      <MobileListItem to="/calculator" title="Salary calculator" onClick={handleLinkClick}>
        Use our salary calculator to estimate your potential earnings.
      </MobileListItem>
      <MobileListItem to="/community" title="Community" onClick={handleLinkClick}>
        Join our community to connect, collaborate, and grow.
      </MobileListItem>
    </div>
  );

  // Mobile menu content for Contacts
  const ContactsMobileContent = () => (
    <div className="mt-2 px-2 pb-2">
      {components.map((component) => (
        <MobileListItem
          key={component.title}
          title={component.title}
          to={component.href}
          onClick={handleLinkClick}
        >
          {component.description}
        </MobileListItem>
      ))}
    </div>
  );

  const MobileAuthSection = () => (
    <div className="flex flex-col gap-2 pt-4 border-t">
      {user ? (
        <>
          <Link to="/profile" className="w-full" onClick={handleLinkClick}>
            <Button variant="ghost" className="w-full justify-start">
              <UserCircle className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>
          {(user.role === "partner" || user.role === "admin") && (
            <Link to="/opportunities/manage" className="w-full" onClick={handleLinkClick}>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Manage Opportunities
              </Button>
            </Link>
          )}
          {user.role === "admin" && (
            <Link to="/admin" className="w-full" onClick={handleLinkClick}>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Admin Panel
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-100"
            onClick={() => {
              logout();
              handleLinkClick();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/auth/login" className="w-full" onClick={handleLinkClick}>
            <Button className="w-full" variant="default">
              Log in
            </Button>
          </Link>
          <Link to="/auth/register" className="w-full" onClick={handleLinkClick}>
            <Button className="w-full" variant="outline">
              Register
            </Button>
          </Link>
        </>
      )}
    </div>
  );

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 bg-background z-50 transition-all duration-300",
          scrolled && "border-b shadow-sm",
          visible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <Link to="/" aria-label="Home" className="flex items-center">
            <img src={logo} alt="Logo" width={100} height={100} className="mr-4" />
          </Link>

          {/* Mobile menu with Sheet */}
          <div className="md:hidden flex gap-3">
            <ModeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <nav className="flex flex-col gap-4">
                  <Link to="/" className="flex items-center" onClick={handleLinkClick}>
                    <img src={logo} alt="Logo" width={100} height={100} className="mr-4" />
                  </Link>

                  <div className="flex flex-col space-y-3">
                    <div className="flex flex-col space-y-2">
                      {/* Candidates Section */}
                      <div className="w-full">
                        <Button
                          variant="ghost"
                          className="w-full justify-between"
                          onClick={() =>
                            setActiveMenu(activeMenu === "candidates" ? null : "candidates")
                          }
                        >
                          Candidates
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              activeMenu === "candidates" ? "rotate-180" : ""
                            )}
                          />
                        </Button>
                        {activeMenu === "candidates" && <CandidatesMobileContent />}
                      </div>

                      {/* Regular Links */}
                      <Link to="/partners" className="w-full" onClick={handleLinkClick}>
                        <Button variant="ghost" className="w-full justify-start">
                          Partners
                        </Button>
                      </Link>

                      <Link to="/careerassistant" className="w-full" onClick={handleLinkClick}>
                        <Button variant="ghost" className="w-full justify-start">
                          Career Assistant
                        </Button>
                      </Link>

                      <Link to="/us" className="w-full" onClick={handleLinkClick}>
                        <Button variant="ghost" className="w-full justify-start">
                          Us
                        </Button>
                      </Link>

                      {/* Contacts Section */}
                      <div className="w-full">
                        <Button
                          variant="ghost"
                          className="w-full justify-between"
                          onClick={() =>
                            setActiveMenu(activeMenu === "contacts" ? null : "contacts")
                          }
                        >
                          Contacts
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              activeMenu === "contacts" ? "rotate-180" : ""
                            )}
                          />
                        </Button>
                        {activeMenu === "contacts" && <ContactsMobileContent />}
                      </div>
                      <Link to="/map" className="w-full" onClick={handleLinkClick}>
                        <Button variant="ghost" className="w-full justify-start">
                          Map
                        </Button>
                      </Link>
                    </div>

                    {/* Authentication Section */}
                    <MobileAuthSection />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex px-4 text-sm justify-center w-full">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Candidates</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-5 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/opportunities?type=internship"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          >
                            <img
                              src={hiring}
                              alt="hire"
                              className="h-70 w-70 object-cover rounded-md"
                            />
                            <div className="mb-2 mt-4 text-lg font-medium">Internships</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Launch your career with exciting internship opportunities & your first
                              job experience!
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem to="/opportunities" title="Opportunities">
                        Scholarships, competitions and programs
                      </ListItem>
                      <ListItem to="/calculator" title="Salary calculator">
                        Use our salary calculator to estimate your potential earnings.
                      </ListItem>
                      <ListItem to="/community" title="Community">
                        Join our community to connect, collaborate, and grow.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/partners">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Partners
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/careerassistant">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Career Assistant
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/us">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Contacts</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {components.map((component) => (
                        <ListItem key={component.title} title={component.title} to={component.href}>
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/map">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Map
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop authentication buttons */}
          {!loading && (
            <div className="hidden md:flex items-center gap-4">
              <ModeToggle />
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
                      />
                      <AvatarFallback>
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <UserCircle className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {(user.role === "partner" || user.role === "admin") && (
                      <DropdownMenuItem asChild>
                        <Link to="/opportunities/manage">
                          <Settings className="mr-2 h-4 w-4" />
                          Manage Opportunities
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {user.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/auth/login">
                    <Button className="px-4 py-2 text-sm font-medium">Log in</Button>
                  </Link>
                  <Link to="/auth/register">
                    <Button variant="outline" className="px-4 py-2 text-sm font-medium">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-[64px]" />
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & {
    title: string;
    children: React.ReactNode;
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

// MobileListItem component
const MobileListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & {
    title: string;
    children: React.ReactNode;
    onClick?: () => void;
  }
>(({ className, title, children, onClick, ...props }, ref) => {
  return (
    <Link
      ref={ref as any}
      className={cn(
        "block select-none space-y-1 rounded-md p-3 no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="text-sm font-medium leading-none">{title}</div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
    </Link>
  );
});
MobileListItem.displayName = "MobileListItem";
