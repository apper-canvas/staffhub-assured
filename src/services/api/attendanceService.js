export const attendanceService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "employee_name_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "check_in_c"}},
          {"field": {"Name": "check_out_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "employee_id_c"}}
        ]
      };

      const response = await apperClient.fetchRecords('attendance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching attendance:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "employee_name_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "check_in_c"}},
          {"field": {"Name": "check_out_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "employee_id_c"}}
        ]
      };

      const response = await apperClient.getRecordById('attendance_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching attendance record ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(attendanceData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: `${attendanceData.employee_name_c || 'Attendance'} - ${attendanceData.date_c}`,
          employee_id_c: parseInt(attendanceData.employee_id_c),
          employee_name_c: attendanceData.employee_name_c,
          department_c: attendanceData.department_c,
          date_c: attendanceData.date_c,
          check_in_c: attendanceData.check_in_c,
          check_out_c: attendanceData.check_out_c,
          status_c: attendanceData.status_c || "present",
          notes_c: attendanceData.notes_c || ""
        }]
      };

      const response = await apperClient.createRecord('attendance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create attendance record:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error creating attendance record:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, attendanceData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const updateData = {
        Id: parseInt(id)
      };

      // Only include updateable fields that are provided
      if (attendanceData.employee_id_c !== undefined) updateData.employee_id_c = parseInt(attendanceData.employee_id_c);
      if (attendanceData.employee_name_c !== undefined) updateData.employee_name_c = attendanceData.employee_name_c;
      if (attendanceData.department_c !== undefined) updateData.department_c = attendanceData.department_c;
      if (attendanceData.date_c !== undefined) updateData.date_c = attendanceData.date_c;
      if (attendanceData.check_in_c !== undefined) updateData.check_in_c = attendanceData.check_in_c;
      if (attendanceData.check_out_c !== undefined) updateData.check_out_c = attendanceData.check_out_c;
      if (attendanceData.status_c !== undefined) updateData.status_c = attendanceData.status_c;
      if (attendanceData.notes_c !== undefined) updateData.notes_c = attendanceData.notes_c;
      
      if (attendanceData.employee_name_c || attendanceData.date_c) {
        updateData.Name = `${attendanceData.employee_name_c || 'Attendance'} - ${attendanceData.date_c || 'Unknown Date'}`;
      }

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('attendance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update attendance record:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error updating attendance record:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('attendance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete attendance record:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error deleting attendance record:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async getByDate(date) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "employee_name_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "check_in_c"}},
          {"field": {"Name": "check_out_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "employee_id_c"}}
        ],
        where: [{
          "FieldName": "date_c",
          "Operator": "ExactMatch",
          "Values": [date],
          "Include": true
        }]
      };

      const response = await apperClient.fetchRecords('attendance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching attendance by date:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getByEmployee(employeeId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "employee_name_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "check_in_c"}},
          {"field": {"Name": "check_out_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "employee_id_c"}}
        ],
        where: [{
          "FieldName": "employee_id_c",
          "Operator": "ExactMatch",
          "Values": [parseInt(employeeId)],
          "Include": true
        }]
      };

      const response = await apperClient.fetchRecords('attendance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching attendance by employee:", error?.response?.data?.message || error);
      return [];
    }
  },

  async updateStatus(id, status) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          status_c: status
        }]
      };

      const response = await apperClient.updateRecord('attendance_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update attendance status:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error updating attendance status:", error?.response?.data?.message || error);
      throw error;
    }
  }
};