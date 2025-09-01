import attendanceData from "@/services/mockData/attendance.json";

let attendance = [...attendanceData];

export const attendanceService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...attendance];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const record = attendance.find(att => att.Id === parseInt(id));
    return record ? { ...record } : null;
  },

  async create(attendanceData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newRecord = {
      ...attendanceData,
      Id: Math.max(...attendance.map(att => att.Id), 0) + 1
    };
    attendance.push(newRecord);
    return { ...newRecord };
  },

  async update(id, attendanceData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = attendance.findIndex(att => att.Id === parseInt(id));
    if (index !== -1) {
      attendance[index] = { ...attendance[index], ...attendanceData };
      return { ...attendance[index] };
    }
    throw new Error("Attendance record not found");
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = attendance.findIndex(att => att.Id === parseInt(id));
    if (index !== -1) {
      const deletedRecord = attendance.splice(index, 1)[0];
      return { ...deletedRecord };
    }
    throw new Error("Attendance record not found");
  },

  async getByDate(date) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return attendance.filter(att => att.date === date).map(att => ({ ...att }));
  },

  async getByEmployee(employeeId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return attendance.filter(att => att.employeeId === employeeId.toString()).map(att => ({ ...att }));
  },

  async updateStatus(id, status) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = attendance.findIndex(att => att.Id === parseInt(id));
    if (index !== -1) {
      attendance[index] = { ...attendance[index], status };
      return { ...attendance[index] };
    }
    throw new Error("Attendance record not found");
  }
};