import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import instance from "../../api/instance";
import "./style.css";
import LoadingSpinner from "../../components/LoadingSpinner";

const Home = () => {
  const [queries, setQueries] = useState([]);

  const [loader, setLoader] = useState(false);

  const getAnswerdQueries = () => {
    instance.get("/get-answerd-queries").then(({ data }) => {
      setQueries(data);
    });
  };

  useEffect(() => {
    getAnswerdQueries();
  }, []);

  const handleRatingChange = (queryId, rating) => {
    setLoader(true);
    instance.post("/rate-answer", { id: queryId, rating }).then(({ data }) => {
      getAnswerdQueries();
      setLoader(false);
    });
  };

  const renderStarRating = (queryId, rating) => {
    return (
      <div className="rating-container">
        <div className="star-rating">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`star ${index < rating ? "selected" : ""}`}
              onClick={() => handleRatingChange(queryId, index + 1)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="query-list-container">
      {loader ? <LoadingSpinner /> : null}
      <div className="ask-button-div">
        <Link to={"/ask"}>
          <button>Ask New</button>
        </Link>
      </div>
      <h2 className="query-list-heading">List of Queries</h2>
      {queries.map((query) => (
        <div key={query._id} className="query-item">
          <div className="query-user">
            <span className="query-username">{query.username}</span>
            {renderStarRating(query._id, query.rating)}
          </div>
          <div className="query-content">
            <div className="query-text">{query.query}</div>
            <div className="query-answer">
              <span className="query-answer-label">Answer:</span>
              <span className="query-answer-text">{query.answer}</span>
            </div>
            <div className="query-replied">
              <span className="query-replied-label">Replied by:</span>
              <span className="query-replied-person">
                {query.assignedExecutive.name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
