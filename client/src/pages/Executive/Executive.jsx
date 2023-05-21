import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../api/instance";
import "./style.css";
import LoadingSpinner from "../../components/LoadingSpinner";

const Executive = () => {
  const navigator = useNavigate();
  const [queries, setQueries] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loader, setLoader] = useState(false);


  const getQueries = () => {
    //Checking is user logged in
    const executiveId = localStorage.getItem("executiveId");
    if (!executiveId) navigator("/executive/login");
    else {
      instance
        .post("/executive/get-assigned-queries", { id: executiveId })
        .then(({ data }) => {
          setQueries(data);
        });
    }
  };

  useEffect(() => {
    getQueries();
  }, []);

  const doLogout = () => {
    localStorage.clear();
    navigator("/executive/login");
  };

  const handleAnswerSubmit = (queryId) => {
    setLoader(true)
    instance
      .post("/executive/answer", { id: queryId, answer })
      .then(({ data }) => {
        getQueries()
        setLoader(false)
      });
  };

  return (
    <div className="executive-page-container">
    {loader ? <LoadingSpinner /> : null}
      <div className="logout-button">
        <button onClick={doLogout}>Logout</button>
      </div>
      <h2 className="executive-page-heading">Answer Queries</h2>
      <div className="query-list">
        {queries.map((query) => (
          <div key={query._id} className="query-item">
            <div className="query-user">
              <span className="query-username">{query.username}</span>
              <span className={`${query.status === 'Answerd' ? 'answerd' : 'assigned'}`}>
                {query.status}
              </span>
            </div>
            <div className="query-content">
              <div className="query-text">{query.query}</div>
              <div className="answer-section">
                <textarea
                  className="answer-input"
                  placeholder="Type your answer here..."
                  onChange={(e) => setAnswer(e.target.value)}
                ></textarea>
                <button
                  className="submit-answer-button"
                  onClick={() => handleAnswerSubmit(query._id)}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Executive;
