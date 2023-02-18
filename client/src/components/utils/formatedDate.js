export const formattedDate = (StartDate) => {
  const date = new Date(StartDate + "T00:00:00");
  const options = { weekday: "long", day: "numeric", month: "numeric" };
  let formattedDate = date.toLocaleDateString("es-ES", options);
  formattedDate = formattedDate.replace("/", ".");
  formattedDate = formattedDate.replace(",", "");
  return formattedDate;
};

export function formatDate(value, type = 'long') {
  const date = new Date(value + "T00:00:00");

  if (type === 'long') {
    const options = { weekday: "long", day: "numeric", month: "long" };
    return date.toLocaleDateString("es-ES", options);  
  }

  if (type === 'short') {
    let day, month, year;

    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();

    day = day
      .toString()
      .padStart(2, '0');

    month = month
      .toString()
      .padStart(2, '0');

    year = year
      .toString()
      .slice(2);

    return `${day}.${month}.${year}`;
  }
}
