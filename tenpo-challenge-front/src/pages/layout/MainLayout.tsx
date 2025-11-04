import { LogoutButton } from "@features/auth/logout/ui/LogoutButton";
import { Navbar } from "@shared/ui/Navbar";
import { Separator } from "@shared/ui/Separator";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar>
        <Navbar.Container>
          <Navbar.Brand>
            <span className="text-lg font-semibold">Tenpo Challenge</span>
          </Navbar.Brand>

          <Navbar.Content>
            <Navbar.Link href="/">Inicio</Navbar.Link>
            <Navbar.Link href="/">Pokémon</Navbar.Link>

            <div className="ml-auto flex items-center gap-2">
              <LogoutButton />
            </div>
          </Navbar.Content>

          <Navbar.MobileToggle />
        </Navbar.Container>

        <Navbar.MobileMenu>
          <Navbar.Link href="/">Inicio</Navbar.Link>
          <Navbar.Link href="/">Pokémon</Navbar.Link>

          <Separator />

          <div className="flex justify-end">
            <LogoutButton />
          </div>
        </Navbar.MobileMenu>
      </Navbar>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
