import { useState, useEffect } from "react";
import { attendanceService } from "@/services/api/attendanceService";

export const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAttendance = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await attendanceService.getAll();
      setAttendance(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createAttendanceRecord = async (recordData) => {
    try {
      const newRecord = await attendanceService.create(recordData);
      setAttendance(prev => [...prev, newRecord]);
      return newRecord;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateAttendanceStatus = async (id, status) => {
    try {
      const updatedRecord = await attendanceService.updateStatus(id, status);
      setAttendance(prev => prev.map(record => 
        record.Id === parseInt(id) ? updatedRecord : record
      ));
      return updatedRecord;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getAttendanceByDate = async (date) => {
    setLoading(true);
    setError(null);
    try {
      const data = await attendanceService.getByDate(date);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  return {
    attendance,
    loading,
    error,
    loadAttendance,
    createAttendanceRecord,
    updateAttendanceStatus,
    getAttendanceByDate
  };
};