import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [empData, setEmpData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmpData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3200/getEmployeeData");
      setEmpData(data);
      setLoading(false);
      alert("data fetched successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("failed to fetch data");
    }
  };

  useEffect(() => {
    fetchEmpData();
  }, []);

  return (
    <>
      <div className="py-6 px-14">
        <h2 className="text-4xl font-bold text-sky-600 text-center">
          Employee Data
        </h2>
        <div className="flex justify-end mt-4">
          <button className="bg-sky-600 hover:bg-sky-700 px-4 p-2 rounded text-white">
            + Add New Employees
          </button>
        </div>

        <div className="overflow-x-auto flex justify-center mt-16">
          <table className="border">
            <thead>
              <th className="px-2 text-left border">Sr. No.</th>
              <th className="px-2 text-left border">Name</th>
              <th className="px-2 text-left border">Department</th>
              <th className="px-2 text-left border">Salary</th>
              <th className="px-2 text-left border">Action</th>
            </thead>
            {loading ? (
              "Loading.........."
            ) : (
              <>
                {empData?.length === 0 ? (
                  <>
                    <p>No data found.</p>
                  </>
                ) : (
                  <>
                    {empData?.map((item, index) => (
                      <>
                        <tbody>
                          <tr className="px-2 text-left">{index + 1}</tr>
                          <tr className="px-2 text-left">
                            {item?.name || "--"}
                          </tr>
                          <tr className="px-2 text-left">
                            {item?.department || "--"}
                          </tr>
                          <tr className="px-2 text-left">
                            {item?.salary || "--"}
                          </tr>
                          <tr className="px-2 text-left">Action buttons</tr>
                        </tbody>
                      </>
                    ))}
                  </>
                )}
              </>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
