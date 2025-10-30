import React from "react";
import { Grid2x2PlusIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from "@/components/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { MenuToggle } from "@/components/menu-toggle";
import { Link } from "react-router-dom";

export function SimpleHeader() {
  const [open, setOpen] = React.useState(false);

  const links = [
    {
      label: "HOME",
      href: "#home",
    },
    {
      label: "ABOUT",
      href: "#about",
    },
    {
      label: "CONTACT",
      href: "#contact",
    },
  ];

  return (
    <header
      className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-1/4 z-50 w-full border-b backdrop-blur-lg font-belfast"
      style={{
        backgroundColor: "var(--background-color)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <nav className="mx-auto flex h-18 w-full max-w-4xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Grid2x2PlusIcon className="size-6" />
          <p className="font-mono text-lg font-belfast">ASME</p>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              className={buttonVariants({ variant: "ghost" })}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          <Link to="/login">
            <Button variant="outline">SIGN IN</Button>
          </Link>
          <Link to="/signup">
            <Button>GET STARTED</Button>
          </Link>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <Button size="icon" variant="outline" className="lg:hidden">
            <MenuToggle
              strokeWidth={2.5}
              open={open}
              onOpenChange={setOpen}
              className="size-6"
            />
          </Button>
          <SheetContent
            className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg font-oddlini"
            showClose={false}
            side="left"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
              {links.map((link) => (
                <a
                  key={link.label}
                  className={buttonVariants({
                    variant: "ghost",
                    className: "justify-start",
                  })}
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <SheetFooter>
              <Link to="/login">
                <Button variant="outline">SIGN IN</Button>
              </Link>
              <Link to="/signup">
                <Button>GET STARTED</Button>
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
