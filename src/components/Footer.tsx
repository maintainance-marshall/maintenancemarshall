export function Footer() {
  return (
    <footer className="border-t border-border py-8 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">M</span>
          </div>
          <span className="text-sm font-semibold text-foreground">
            MAINTENANCE MARSHALL <span className="text-muted-foreground font-normal">(Pty) Ltd</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Maintenance Marshall. All rights reserved. Gauteng, South Africa.
        </p>
      </div>
    </footer>
  );
}
