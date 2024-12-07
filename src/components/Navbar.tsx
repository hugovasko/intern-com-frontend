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
import { Link, Outlet } from "react-router-dom";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Candidate Contacts",
    href: "/contacts",
    description: "Connect with top candidates and streamline recruitment.",
  },
  {
    title: "Candidate Partners",
    href: "/candidatepartners",
    description: "Partner with top candidates for lasting success.",
  },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="w-full shadow">
        <div className="flex items-center justify-between px-4 py-2">
          <Link to="/" aria-label="Home" className="flex items-center">
            <img src={logo} alt="Logo" width={100} height={100} className="mr-4" />
          </Link>

          {/* Mobile menu toggle button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleMenu} className="text-black">
              <span className="block w-6 h-0.5 bg-black my-1"></span>
              <span className="block w-6 h-0.5 bg-black my-1"></span>
              <span className="block w-6 h-0.5 bg-black my-1"></span>
            </button>
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
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/Intership"
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
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/opportunities" title="Opportunities">
                        Scholarships, competitions and programs
                      </ListItem>
                      <ListItem href="/calculator" title="Salary calculator">
                        Use our salary calculator to estimate your potential earnings.
                      </ListItem>
                      <ListItem href="/community" title="Community">
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
                    <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop authentication buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button className="px-4 py-2 text-sm font-medium">Log in</Button>
            </Link>
            <Link to="/register">
              <Button
                variant="outline"
                className="flex px-4 py-2 text-sm font-medium outline rounded-md"
              >
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <NavigationMenu>
          <NavigationMenuList>
            <div className="md:hidden">
              <div className="flex flex-col items-left space-y-4 p-4 bg-white shadow-lg">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Candidates</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-5 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/Intership"
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
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/opportunities" title="Opportunities">
                        Scholarships, competitions and programs
                      </ListItem>
                      <ListItem href="/calculator" title="Salary calculator">
                        Use our salary calculator to estimate your potential earnings.
                      </ListItem>
                      <ListItem href="/community" title="Community">
                        Join our community to connect, collaborate, and grow.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/partners" className="text-black" onClick={toggleMenu}>
                    Partners
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/careerassistant" className="text-black" onClick={toggleMenu}>
                    Career Assistant
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/us" className="text-black" onClick={toggleMenu}>
                    Us
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Contacts</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/login" className="text-black" onClick={toggleMenu}>
                    Log in
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/register" className="text-black" onClick={toggleMenu}>
                    Register
                  </Link>
                </NavigationMenuItem>
              </div>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      )}

      <Outlet />
    </div>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
