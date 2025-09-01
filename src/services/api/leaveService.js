export const leaveService = {
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
          {"field": {"Name": "employee_id_c"}},
          {"field": {"Name": "employee_name_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "start_date_c"}},
          {"field": {"Name": "end_date_c"}},
          {"field": {"Name": "reason_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "approved_by_c"}},
          {"field": {"Name": "created_at_c"}}
        ]
      };

      const response = await apperClient.fetchRecords('leave_request_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching leave requests:", error?.response?.data?.message || error);
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
          {"field": {"Name": "employee_id_c"}},
          {"field": {"Name": "employee_name_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "start_date_c"}},
          {"field": {"Name": "end_date_c"}},
          {"field": {"Name": "reason_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "approved_by_c"}},
          {"field": {"Name": "created_at_c"}}
        ]
      };

      const response = await apperClient.getRecordById('leave_request_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching leave request ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(leaveData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: `${leaveData.employee_name_c || 'Leave Request'} - ${leaveData.type_c}`,
          employee_id_c: parseInt(leaveData.employee_id_c),
          employee_name_c: leaveData.employee_name_c,
          type_c: leaveData.type_c,
          start_date_c: leaveData.start_date_c,
          end_date_c: leaveData.end_date_c,
          reason_c: leaveData.reason_c,
          status_c: leaveData.status_c || "pending",
          approved_by_c: leaveData.approved_by_c || null,
          created_at_c: new Date().toISOString()
        }]
      };

      const response = await apperClient.createRecord('leave_request_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create leave request:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error creating leave request:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, leaveData) {
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
      if (leaveData.employee_id_c !== undefined) updateData.employee_id_c = parseInt(leaveData.employee_id_c);
      if (leaveData.employee_name_c !== undefined) updateData.employee_name_c = leaveData.employee_name_c;
      if (leaveData.type_c !== undefined) updateData.type_c = leaveData.type_c;
      if (leaveData.start_date_c !== undefined) updateData.start_date_c = leaveData.start_date_c;
      if (leaveData.end_date_c !== undefined) updateData.end_date_c = leaveData.end_date_c;
      if (leaveData.reason_c !== undefined) updateData.reason_c = leaveData.reason_c;
      if (leaveData.status_c !== undefined) updateData.status_c = leaveData.status_c;
      if (leaveData.approved_by_c !== undefined) updateData.approved_by_c = leaveData.approved_by_c;
      if (leaveData.created_at_c !== undefined) updateData.created_at_c = leaveData.created_at_c;

      if (leaveData.employee_name_c || leaveData.type_c) {
        updateData.Name = `${leaveData.employee_name_c || 'Leave Request'} - ${leaveData.type_c || 'Unknown'}`;
      }

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('leave_request_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update leave request:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error updating leave request:", error?.response?.data?.message || error);
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

      const response = await apperClient.deleteRecord('leave_request_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete leave request:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error deleting leave request:", error?.response?.data?.message || error);
      throw error;
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
          {"field": {"Name": "employee_id_c"}},
          {"field": {"Name": "employee_name_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "start_date_c"}},
          {"field": {"Name": "end_date_c"}},
          {"field": {"Name": "reason_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "approved_by_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        where: [{
          "FieldName": "employee_id_c",
          "Operator": "ExactMatch",
          "Values": [parseInt(employeeId)],
          "Include": true
        }]
      };

      const response = await apperClient.fetchRecords('leave_request_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching leave requests by employee:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getByStatus(status) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "employee_id_c"}},
          {"field": {"Name": "employee_name_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "start_date_c"}},
          {"field": {"Name": "end_date_c"}},
          {"field": {"Name": "reason_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "approved_by_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        where: [{
          "FieldName": "status_c",
          "Operator": "ExactMatch",
          "Values": [status],
          "Include": true
        }]
      };

      const response = await apperClient.fetchRecords('leave_request_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching leave requests by status:", error?.response?.data?.message || error);
      return [];
    }
  },

  async approve(id, approvedBy) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          status_c: "approved",
          approved_by_c: approvedBy
        }]
      };

      const response = await apperClient.updateRecord('leave_request_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to approve leave request:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error approving leave request:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async reject(id, approvedBy) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          status_c: "rejected",
          approved_by_c: approvedBy
        }]
      };

      const response = await apperClient.updateRecord('leave_request_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to reject leave request:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error rejecting leave request:", error?.response?.data?.message || error);
      throw error;
    }
  }
};