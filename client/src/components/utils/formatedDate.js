export const formattedDate = (StartDate) => {
  const date = new Date(StartDate + "T00:00:00");
  const options = { weekday: "long", day: "numeric", month: "numeric" };
  let formattedDate = date.toLocaleDateString("es-ES", options);
  formattedDate = formattedDate.replace("/", ".");
  formattedDate = formattedDate.replace(",", "");
  return formattedDate;
};