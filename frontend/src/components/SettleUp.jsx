import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaMoneyCheckAlt, FaArrowLeft } from "react-icons/fa";
import Loader from "./Loader";
import API from "../api/api";

const SettleUp = () => {
  const { id } = useParams();
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchSettlements = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/expenses/${id}/settle`);
      setSettlements(data.settlements || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch settlements!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettlements();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
            <FaMoneyCheckAlt /> Settle Up
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-green-500 hover:text-green-700"
          >
            <FaArrowLeft /> Back
          </button>
        </div>

        {settlements.length === 0 ? (
          <p className="text-gray-600 text-center">No pending settlements. 🧘</p>
        ) : (
          <div className="space-y-4">
            {settlements.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-green-50 p-4 rounded-lg shadow"
              >
                <span className="text-lg font-medium text-gray-700">
                  {item.from.email} ➡️ {item.to.email}
                </span>
                <span className="text-green-600 font-bold text-xl">₹{item.amount}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettleUp;
