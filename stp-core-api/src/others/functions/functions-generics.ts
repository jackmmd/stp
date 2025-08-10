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