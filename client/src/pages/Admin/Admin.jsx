import React, { useState, useEffect } from "react";
import "./style.css";
import instance from "../../api/instance";
import LoadingSpinner from "../../components/LoadingSpinner";

const Admin = () => {
  // const [queries, setQueries] = useState([
  //   {
  //     id: 1,
  //     username: 'John Doe',
  //     query: 'How can I improve my coding skills?',
  //     status: 'Pending',
  //     assignedTo: null,
  //     selectedExecutive: '', // Track the selected executive for each query
  //   },
  //   {
  //     id: 2,
  //     username: 'Alice Johnson',
  //     query: 'What are the best books for learning React?',
  //     status: 'Pending',
  //     assignedTo: null,
  //     selectedExecutive: '',
  //   },
  //   // Add more queries as needed
  // ]);

  const [queries, setQueries] = useState([]);

  const [executives, setExecutives] = useState([]);

  const [loader, setLoader] = useState(false);


  const getAllQueries = () => {
    instance.get("/admin/get-queries").then(({ data }) => {
      setQueries(data);
    });
  };

  const getExecutives = () => {
    instance.get("/admin/get-executives").then(({ data }) => {
      console.log(data);
      setExecutives(data);
    });
  };

  useEffect(() => {
    getExecutives();
  }, []);

  useEffect(() => {
    getAllQueries();
  }, []);
  const handleAssignExecutive = (queryId) => {
    setLoader(true)
    const query = queries.find((query) => query._id === queryId);
    if (query.selectedExecutive) {
     
      instance
        .post("/admin/assaign-query", {
          queryId: query._id,
          executiveId: query.selectedExecutive,
        })
        .then((response) => {
          getAllQueries();
          setLoader(false)
        });
    } else {
      alert("Please select an executive.");
    }
  };

  const handleExecutiveChange = (queryId, selectedExecutive) => {
    setQueries((prevQueries) =>
      prevQueries.map((query) =>
        query._id === queryId ? { ...query, selectedExecutive } : query
      )
    );
  };

  return (
    <div className="admin-dashboard-container">
    {loader ? <LoadingSpinner /> : null}
      <h2 className="admin-dashboard-heading">Pending Queries</h2>
      <div className="query-list">
        {queries.map((query) => (
          <div key={query.id} className="query-item">
            <div className="query-user">
              <span className="query-username">{query.username}</span>
              <span className={`query-status ${query.status.toLowerCase()}`}>
                {query.status}
              </span>
            </div>
            <div className="query-content">
              <div className="query-text">{query.query}</div>
              {query.status === "Pending" && (
                <div className="assign-executive">
                  <select
                    className="executive-select"
                    value={query.selectedExecutive}
                    onChange={(e) =>
                      handleExecutiveChange(query._id, e.target.value)
                    }
                  >
                    <option value="">Select Executive</option>
                    {executives.map((executive, index) => (
                      <option key={index} value={executive._id}>
                        {executive.name}
                      </option>
                    ))}
                  </select>
                  <button
                    className="assign-button"
                    onClick={() => handleAssignExecutive(query._id)}
                  >
                    Assign
                  </button>
                </div>
              )}
              {query.status === "Assigned" && (
                <div className="assigned-to">
                  Assigned to:{" "}
                  <span className="assigned-executive">{query.assignedTo}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
