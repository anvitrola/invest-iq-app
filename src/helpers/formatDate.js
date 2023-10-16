export function formatDate(inputDate) {
  const options = {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(inputDate);
  return date.toLocaleDateString("br-BR", options);
}
