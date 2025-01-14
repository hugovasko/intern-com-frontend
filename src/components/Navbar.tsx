import { Button } from "./ui/button";
import * as React from "react";
import logo from "@/assets/1.png";
import hiring from "@/assets/hiring.png";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
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
import { ChevronDown, FileUser, Menu } from "lucide-react";
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
import { LanguageSelector } from "./languageSelector/LanguageSelector";

export function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { scrolled, visible } = useScroll();
  const { user, loading, logout } = useAuth();

  // Function to close the sheet
  const handleLinkClick = () => {
    setOpen(false);
  };

  const components: { title: string; href: string; description: string }[] = [
    {
      title: t("navbar.candidateContacts"),
      href: "/candidatecontacts",
      description: t("navbar.text"),
    },
    {
      title: t("navbar.partnersContacts"),
      href: "/partnercontacts",
      description: t("navbar.text1"),
    },
  ];

  const CandidatesMobileContent = () => (
    <div className="mt-2 px-2 pb-2">
      <Link
        to="/opportunities?type=internship"
        className="flex flex-col gap-2 p-4 rounded-md hover:bg-accent"
        onClick={handleLinkClick}
      >
        <img src={hiring} alt="hire" className="h-32 w-full object-cover rounded-md" />
        <div className="font-medium"> {t("navbar.internships")}</div>
        <p className="text-sm text-muted-foreground">{t("navbar.description")}</p>
      </Link>
      <MobileListItem
        to="/opportunities"
        title={t("navbar.opportunities")}
        onClick={handleLinkClick}
      >
        {t("navbar.subtext")}
      </MobileListItem>
      <MobileListItem to="/calculator" title={t("navbar.calculator")} onClick={handleLinkClick}>
        {t("navbar.subtext2")}
      </MobileListItem>
      <MobileListItem to="/community" title={t("navbar.community")} onClick={handleLinkClick}>
        {t("navbar.subtext3")}
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
              {t("navbar.profile")}
            </Button>
          </Link>
          <Link to="/applications" className="w-full" onClick={handleLinkClick}>
            <Button variant="ghost" className="w-full justify-start">
              <FileUser className="mr-2 h-4 w-4" />
              {t("navbar.application")}
            </Button>
          </Link>
          {(user.role === "partner" || user.role === "admin") && (
            <Link to="/opportunities/manage" className="w-full" onClick={handleLinkClick}>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                {t("navbar.manage")}
              </Button>
            </Link>
          )}
          {user.role === "admin" && (
            <Link to="/admin" className="w-full" onClick={handleLinkClick}>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                {t("navbar.admin")}
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
            {t("navbar.logout")}
          </Button>
        </>
      ) : (
        <>
          <Link to="/auth/login" className="w-full" onClick={handleLinkClick}>
            <Button className="w-full" variant="default">
              {t("navbar.login")}
            </Button>
          </Link>
          <Link to="/auth/register" className="w-full" onClick={handleLinkClick}>
            <Button className="w-full" variant="outline">
              {t("navbar.register")}
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
            <LanguageSelector />
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
                          {t("navbar.candidates")}
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
                          {t("navbar.partner")}
                        </Button>
                      </Link>

                      <Link to="/careerassistant" className="w-full" onClick={handleLinkClick}>
                        <Button variant="ghost" className="w-full justify-start">
                          {t("navbar.career")}
                        </Button>
                      </Link>

                      <Link to="/us" className="w-full" onClick={handleLinkClick}>
                        <Button variant="ghost" className="w-full justify-start">
                          {t("navbar.us")}
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
                          {t("navbar.contacts")}
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
                          {t("navbar.map")}
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
                  <NavigationMenuTrigger>{t("navbar.candidates")}</NavigationMenuTrigger>
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
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {t("navbar.internships")}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {t("navbar.description")}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem to="/opportunities" title={t("navbar.opportunities")}>
                        {t("navbar.subtext")}
                      </ListItem>
                      <ListItem to="/calculator" title={t("navbar.calculator")}>
                        {t("navbar.subtext2")}
                      </ListItem>
                      <ListItem to="/community" title={t("navbar.community")}>
                        {t("navbar.subtext3")}
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/partners">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {t("navbar.partner")}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/careerassistant">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {t("navbar.career")}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/us">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {t("navbar.us")}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>{t("navbar.contacts")}</NavigationMenuTrigger>
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
                      {t("navbar.map")}
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
              <LanguageSelector />

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
                    <DropdownMenuLabel> {t("navbar.account")}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <UserCircle className="mr-2 h-4 w-4" />
                        {t("navbar.profile")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/applications">
                        <FileUser className="mr-2 h-4 w-4" />
                        {t("navbar.application")}
                      </Link>
                    </DropdownMenuItem>
                    {(user.role === "partner" || user.role === "admin") && (
                      <DropdownMenuItem asChild>
                        <Link to="/opportunities/manage">
                          <Settings className="mr-2 h-4 w-4" />
                          {t("navbar.manage")}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {user.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin">
                          <Settings className="mr-2 h-4 w-4" />
                          {t("navbar.admin")}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("navbar.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/auth/login">
                    <Button className="px-4 py-2 text-sm font-medium"> {t("navbar.login")}</Button>
                  </Link>
                  <Link to="/auth/register">
                    <Button variant="outline" className="px-4 py-2 text-sm font-medium">
                      {t("navbar.register")}
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
