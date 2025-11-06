import { cn } from "@shared/lib/cn";
import { Button } from "@shared/ui/Button";
import { type ReactNode } from "react";
import { Link } from "react-router";
import { useNavbarStore } from "./model/navbar.store";

interface NavbarProps {
  children: ReactNode;
  className?: string;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
        className
      )}
    >
      {children}
    </nav>
  );
};

interface NavbarContainerProps {
  children: ReactNode;
  className?: string;
}

const NavbarContainer = ({ children, className }: NavbarContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      <div className="flex h-16 items-center justify-between gap-4">
        {children}
      </div>
    </div>
  );
};

interface NavbarBrandProps {
  children?: ReactNode;
  href?: string;
  className?: string;
}

const NavbarBrand = ({ children, href = "/", className }: NavbarBrandProps) => {
  return (
    <div className="shrink-0">
      <Link
        to={href}
        className={cn(
          "flex items-center gap-2 text-xl font-bold text-primary hover:opacity-80 transition-opacity",
          className
        )}
      >
        {children}
      </Link>
    </div>
  );
};

interface NavbarContentProps {
  children: ReactNode;
  className?: string;
}

const NavbarContent = ({ children, className }: NavbarContentProps) => {
  return (
    <div
      className={cn(
        "hidden md:flex md:items-center md:gap-6 md:flex-1",
        className
      )}
    >
      {children}
    </div>
  );
};

interface NavbarLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
}

const NavbarLink = ({
  children,
  href,
  className,
  onClick,
}: NavbarLinkProps) => {
  const closeMenu = useNavbarStore((state) => state.closeMenu);

  const handleClick = () => {
    closeMenu();
    onClick?.();
  };

  return (
    <Link
      to={href}
      onClick={handleClick}
      className={cn(
        "rounded-md px-3 py-2 text-base md:text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors block md:inline-block w-full md:w-auto text-left",
        className
      )}
    >
      {children}
    </Link>
  );
};

interface NavbarItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavbarItem = ({ children, onClick, className }: NavbarItemProps) => {
  const closeMenu = useNavbarStore((state) => state.closeMenu);

  const handleClick = () => {
    closeMenu();
    onClick?.();
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      className={cn(
        "rounded-md px-3 py-2 text-base md:text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors block md:inline-block w-full md:w-auto text-left",
        className
      )}
    >
      {children}
    </Button>
  );
};

interface NavbarMobileToggleProps {
  className?: string;
}

const NavbarMobileToggle = ({ className }: NavbarMobileToggleProps) => {
  const isMenuOpen = useNavbarStore((state) => state.isMenuOpen);
  const toggleMenu = useNavbarStore((state) => state.toggleMenu);

  return (
    <div className={cn("flex md:hidden", className)}>
      <Button
        type="button"
        variant="ghost"
        onClick={toggleMenu}
        aria-label="Abrir menú"
        aria-expanded={isMenuOpen}
        className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <svg
          className={cn(
            "h-6 w-6 transition-transform",
            isMenuOpen && "rotate-90"
          )}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          )}
        </svg>
      </Button>
    </div>
  );
};

interface NavbarMobileMenuProps {
  children: ReactNode;
  className?: string;
}

const NavbarMobileMenu = ({ children, className }: NavbarMobileMenuProps) => {
  const isMenuOpen = useNavbarStore((state) => state.isMenuOpen);

  return (
    <div
      className={cn(
        "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t",
        isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        className
      )}
    >
      <div className="space-y-1 px-4 pb-3 pt-2">{children}</div>
    </div>
  );
};

Navbar.Container = NavbarContainer;
Navbar.Brand = NavbarBrand;
Navbar.Content = NavbarContent;
Navbar.Link = NavbarLink;
Navbar.Item = NavbarItem;
Navbar.MobileToggle = NavbarMobileToggle;
Navbar.MobileMenu = NavbarMobileMenu;
