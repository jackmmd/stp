export function parseDateDDMMYYYY(dateStr: string): Date {
  if (!dateStr) return new Date();
  const [day, month, year] = dateStr.split("/").map(Number);
  if (!day || !month || !year) return new Date();
  return new Date(year, month - 1, day); 
}

export function toTitleCase(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ldapDateToJS(ldapDate:string) {
  // Quitar la parte ".0Z"
  const clean = ldapDate.replace('.0Z', '');

  // Extraer valores
  const year = parseInt(clean.substring(0, 4), 10);
  const month = parseInt(clean.substring(4, 6), 10) - 1; // Mes en JS empieza en 0
  const day = parseInt(clean.substring(6, 8), 10);
  const hour = parseInt(clean.substring(8, 10), 10);
  const minute = parseInt(clean.substring(10, 12), 10);
  const second = parseInt(clean.substring(12, 14), 10);
  return new Date(Date.UTC(year, month, day, hour, minute, second));
}