import leaveRequestsData from "@/services/mockData/leaveRequests.json";

let leaveRequests = [...leaveRequestsData];

export const leaveService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...leaveRequests];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const request = leaveRequests.find(req => req.Id === parseInt(id));
    return request ? { ...request } : null;
  },

  async create(leaveData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newRequest = {
      ...leaveData,
      Id: Math.max(...leaveRequests.map(req => req.Id), 0) + 1,
      createdAt: new Date().toISOString()
    };
    leaveRequests.push(newRequest);
    return { ...newRequest };
  },

  async update(id, leaveData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = leaveRequests.findIndex(req => req.Id === parseInt(id));
    if (index !== -1) {
      leaveRequests[index] = { ...leaveRequests[index], ...leaveData };
      return { ...leaveRequests[index] };
    }
    throw new Error("Leave request not found");
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = leaveRequests.findIndex(req => req.Id === parseInt(id));
    if (index !== -1) {
      const deletedRequest = leaveRequests.splice(index, 1)[0];
      return { ...deletedRequest };
    }
    throw new Error("Leave request not found");
  },

  async getByEmployee(employeeId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return leaveRequests.filter(req => req.employeeId === employeeId.toString()).map(req => ({ ...req }));
  },

  async getByStatus(status) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return leaveRequests.filter(req => req.status === status).map(req => ({ ...req }));
  },

  async approve(id, approvedBy) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = leaveRequests.findIndex(req => req.Id === parseInt(id));
    if (index !== -1) {
      leaveRequests[index] = { 
        ...leaveRequests[index], 
        status: "approved",
        approvedBy 
      };
      return { ...leaveRequests[index] };
    }
    throw new Error("Leave request not found");
  },

  async reject(id, approvedBy) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = leaveRequests.findIndex(req => req.Id === parseInt(id));
    if (index !== -1) {
      leaveRequests[index] = { 
        ...leaveRequests[index], 
        status: "rejected",
        approvedBy 
      };
      return { ...leaveRequests[index] };
    }
    throw new Error("Leave request not found");
  }
};