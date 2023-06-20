// The function returns the total number of guests on all tables.
export const getNumberGuestsOnTables = (tables) =>
  tables.reduce((acc, table) => acc + table.guests, 0);
