import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Maintenance Marshall logo" className="h-8 w-auto" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              Maintenance Marshall (Pty) Ltd
            </span>
            <span className="text-xs text-muted-foreground">
              Reg No: 2026/349640/07
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Maintenance Marshall. All rights reserved. Kempton Park, South Africa.
        </p>
      </div>
    </footer>
  );
}
