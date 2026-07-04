export const SITE_NAME = "Maintenance Marshall";
export const COMPANY_NAME = "Maintenance Marshall (Pty) Ltd";
export const SITE_URL = "https://www.maintenancemarshall.co.za";
export const SOCIAL_IMAGE = `${SITE_URL}/assets/logo-BMmUvPyL.png`;
export const DEFAULT_SERVICE_AREA = "Gauteng";

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
