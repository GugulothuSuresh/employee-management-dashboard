const generateEmployeeId = (employees) => {
  if (!employees || employees.length === 0) {
    return "EMP - 1001";
  }

  const ids = employees
    .map((e) => e.id)
    .filter((id) => typeof id === "string" && id.startsWith("EMP - "))
    .map((id) => Number(id.split("-")[1]));

  const maxId = ids.length > 0 ? Math.max(...ids) : 1000;

  return `EMP - ${maxId + 1}`;
};

export default generateEmployeeId;
