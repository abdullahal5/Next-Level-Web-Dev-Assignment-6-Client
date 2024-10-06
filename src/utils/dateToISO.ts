interface IDate {
  calender: {
    identifier: string;
  };
  day: number;
  era: string;
  month: number;
  year: number;
}

export const dateToISO = (date: IDate) => {
  if (date) {
    const isoDateString = `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;

    return new Date(isoDateString).toISOString();
  }

  return null;
};
