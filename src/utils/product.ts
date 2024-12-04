export const getTestSearchParams = () => {
  const searchParams = new URLSearchParams({
    tableId: "6",
    storeId: "2",
    companyId: "1",
  });

  return searchParams.toString();
};

export const verifyLocationSearch = (search: string): boolean => {
  if (!search) return false;

  const searchParams = new URLSearchParams(search);
  const tableId = searchParams.get("tableId");
  const storeId = searchParams.get("storeId");
  const companyId = searchParams.get("companyId");

  return tableId != null && storeId != null && companyId != null;
};
