import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Home, Plus, GraduationCap } from "lucide-react";

const NavigationBar = () => {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarMenuToggle className="sm:hidden" />
      <NavbarBrand>
        <p className="font-bold text-inherit">PrimeQuiz</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-8 sm:flex" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            <Home className="mr-1 h-4 w-4" /> Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/create">
            <Plus className="mr-1 h-4 w-4" /> Create
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/browse">
            <GraduationCap className="mr-1 h-4 w-4" /> Browse
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link color="foreground" href="/">
            <Home className="mr-1 h-4 w-4" /> Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" href="#">
            <Plus className="mr-1 h-4 w-4" /> Create
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" href="/">
            <GraduationCap className="mr-1 h-4 w-4" /> Browse
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default NavigationBar;
