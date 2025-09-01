import { useState, useEffect } from "react";
import { leaveService } from "@/services/api/leaveService";

export const useLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadLeaveRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await leaveService.getAll();
      setLeaveRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createLeaveRequest = async (requestData) => {
    try {
      const newRequest = await leaveService.create(requestData);
      setLeaveRequests(prev => [...prev, newRequest]);
      return newRequest;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const approveLeaveRequest = async (id) => {
    try {
      const updatedRequest = await leaveService.approve(id, "Lisa Miller");
      setLeaveRequests(prev => prev.map(req => 
        req.Id === parseInt(id) ? updatedRequest : req
      ));
      return updatedRequest;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const rejectLeaveRequest = async (id) => {
    try {
      const updatedRequest = await leaveService.reject(id, "Lisa Miller");
      setLeaveRequests(prev => prev.map(req => 
        req.Id === parseInt(id) ? updatedRequest : req
      ));
      return updatedRequest;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getPendingRequests = () => {
    return leaveRequests.filter(req => req.status === "pending");
  };

  useEffect(() => {
    loadLeaveRequests();
  }, []);

  return {
    leaveRequests,
    loading,
    error,
    loadLeaveRequests,
    createLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    getPendingRequests
  };
};