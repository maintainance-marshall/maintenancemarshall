import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const SOCIAL_IMAGE = "https://www.maintenancemarshall.co.za/assets/logo-BMmUvPyL.png";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "9ptdX6MHhpK25xbIHLMeVG7iSoMbLHXTVYynNZcH3zs" },
      { title: "Maintenance Marshall — Property Maintenance Gauteng" },
      { name: "description", content: "Maintenance Marshall provides multi-skilled property maintenance and technical services across Gauteng — electrical, plumbing, water systems, security, waterproofing, ceilings and more." },
      { name: "author", content: "Maintenance Marshall" },
      { property: "og:title", content: "Maintenance Marshall — Property Maintenance Gauteng" },
      { property: "og:description", content: "Multi-skilled property maintenance and technical services across Gauteng. One call. Total resolution." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Maintenance Marshall" },
      { property: "og:url", content: "https://www.maintenancemarshall.co.za" },
      { property: "og:image", content: SOCIAL_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Maintenance Marshall — Property Maintenance Gauteng" },
      { name: "twitter:description", content: "Multi-skilled property maintenance and technical services across Gauteng. One call. Total resolution." },
      { name: "twitter:image", content: SOCIAL_IMAGE },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
