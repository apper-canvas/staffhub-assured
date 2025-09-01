export const employeesService = {
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
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "join_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "photo_url_c"}}
        ]
      };

      const response = await apperClient.fetchRecords('employee_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching employees:", error?.response?.data?.message || error);
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
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "join_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "photo_url_c"}}
        ]
      };

      const response = await apperClient.getRecordById('employee_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching employee ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(employeeData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: `${employeeData.first_name_c || ''} ${employeeData.last_name_c || ''}`.trim(),
          first_name_c: employeeData.first_name_c,
          last_name_c: employeeData.last_name_c,
          email_c: employeeData.email_c,
          phone_c: employeeData.phone_c,
          role_c: employeeData.role_c,
          department_c: employeeData.department_c,
          join_date_c: employeeData.join_date_c,
          status_c: employeeData.status_c || "active",
          photo_url_c: employeeData.photo_url_c || null
        }]
      };

      const response = await apperClient.createRecord('employee_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create employee:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error creating employee:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, employeeData) {
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
      if (employeeData.first_name_c !== undefined) {
        updateData.first_name_c = employeeData.first_name_c;
      }
      if (employeeData.last_name_c !== undefined) {
        updateData.last_name_c = employeeData.last_name_c;
      }
      if (employeeData.first_name_c || employeeData.last_name_c) {
        updateData.Name = `${employeeData.first_name_c || ''} ${employeeData.last_name_c || ''}`.trim();
      }
      if (employeeData.email_c !== undefined) updateData.email_c = employeeData.email_c;
      if (employeeData.phone_c !== undefined) updateData.phone_c = employeeData.phone_c;
      if (employeeData.role_c !== undefined) updateData.role_c = employeeData.role_c;
      if (employeeData.department_c !== undefined) updateData.department_c = employeeData.department_c;
      if (employeeData.join_date_c !== undefined) updateData.join_date_c = employeeData.join_date_c;
      if (employeeData.status_c !== undefined) updateData.status_c = employeeData.status_c;
      if (employeeData.photo_url_c !== undefined) updateData.photo_url_c = employeeData.photo_url_c;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('employee_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update employee:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error updating employee:", error?.response?.data?.message || error);
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

      const response = await apperClient.deleteRecord('employee_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete employee:`, JSON.stringify(failed));
          failed.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error deleting employee:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async getByDepartment(department) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "join_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "photo_url_c"}}
        ],
        where: [{
          "FieldName": "department_c",
          "Operator": "ExactMatch",
          "Values": [department],
          "Include": true
        }]
      };

      const response = await apperClient.fetchRecords('employee_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching employees by department:", error?.response?.data?.message || error);
      return [];
    }
  },

  async search(query) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "role_c"}},
          {"field": {"Name": "department_c"}},
          {"field": {"Name": "join_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "photo_url_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "first_name_c", "operator": "Contains", "values": [query]},
                {"fieldName": "last_name_c", "operator": "Contains", "values": [query]},
                {"fieldName": "email_c", "operator": "Contains", "values": [query]},
                {"fieldName": "department_c", "operator": "Contains", "values": [query]},
                {"fieldName": "role_c", "operator": "Contains", "values": [query]}
              ],
              "operator": "OR"
            }
          ]
        }]
      };

      const response = await apperClient.fetchRecords('employee_c', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error searching employees:", error?.response?.data?.message || error);
      return [];
    }
  }
};