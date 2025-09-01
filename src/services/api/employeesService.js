import employeesData from "@/services/mockData/employees.json";

let employees = [...employeesData];

export const employeesService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...employees];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const employee = employees.find(emp => emp.Id === parseInt(id));
    return employee ? { ...employee } : null;
  },

  async create(employeeData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newEmployee = {
      ...employeeData,
      Id: Math.max(...employees.map(emp => emp.Id), 0) + 1
    };
    employees.push(newEmployee);
    return { ...newEmployee };
  },

  async update(id, employeeData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = employees.findIndex(emp => emp.Id === parseInt(id));
    if (index !== -1) {
      employees[index] = { ...employees[index], ...employeeData };
      return { ...employees[index] };
    }
    throw new Error("Employee not found");
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = employees.findIndex(emp => emp.Id === parseInt(id));
    if (index !== -1) {
      const deletedEmployee = employees.splice(index, 1)[0];
      return { ...deletedEmployee };
    }
    throw new Error("Employee not found");
  },

  async getByDepartment(department) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return employees.filter(emp => emp.department === department).map(emp => ({ ...emp }));
  },

  async search(query) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const lowercaseQuery = query.toLowerCase();
    return employees.filter(emp => 
      emp.firstName.toLowerCase().includes(lowercaseQuery) ||
      emp.lastName.toLowerCase().includes(lowercaseQuery) ||
      emp.email.toLowerCase().includes(lowercaseQuery) ||
      emp.department.toLowerCase().includes(lowercaseQuery) ||
      emp.role.toLowerCase().includes(lowercaseQuery)
    ).map(emp => ({ ...emp }));
  }
};