import { React, useState } from "react";
import './style.css'
import instance from "../../api/instance";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const CreateQuery = () => {
  const navigator = useNavigate()

  const [username, setUsername] = useState('');
  const [query, setQuery] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    if (username === '' || query === '') {
      alert('Please enter fields')
    }
    else {
      setLoader(true)
      e.preventDefault();
      instance.post('/ask', { username, query }).then((response) => {
        setLoader(false)
        alert('You can see the answer after we replied , Thankyou')
        navigator('/')
      })
    }
  };

  return (
    <div className="form-container">
      {loader ? <LoadingSpinner /> : null}
      <h2 className="form-heading">Ask Whatever You Want</h2>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <label className="form-label">
          Name:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Query:
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-textarea"
          />
        </label>
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default CreateQuery;
