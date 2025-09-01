import { useState, useEffect } from "react";
import { employeesService } from "@/services/api/employeesService";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await employeesService.getAll();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employeeData) => {
    try {
      const newEmployee = await employeesService.create(employeeData);
      setEmployees(prev => [...prev, newEmployee]);
      return newEmployee;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateEmployee = async (id, employeeData) => {
    try {
      const updatedEmployee = await employeesService.update(id, employeeData);
      setEmployees(prev => prev.map(emp => emp.Id === parseInt(id) ? updatedEmployee : emp));
      return updatedEmployee;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await employeesService.delete(id);
      setEmployees(prev => prev.filter(emp => emp.Id !== parseInt(id)));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const searchEmployees = async (query) => {
    if (!query.trim()) {
      loadEmployees();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await employeesService.search(query);
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    loadEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees
  };
};