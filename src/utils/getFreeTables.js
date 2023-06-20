// The function returns all free tables based on all reservations and all tables.
export const getFreeTables = (tables, reservations) => {
  const reservedTables = reservations
    .map((reservation) => reservation.tableIds)
    .flat();
  return tables.filter((freeTable) => !reservedTables.includes(freeTable.id));
};
