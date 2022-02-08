import {useEffect, useState} from 'react';
import axios from 'axios';

export default url => {
  const baseUrl = 'https://api.realworld.io/api';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }

  useEffect(() => {
    if (!isLoading) return;
    // https://conduit.productionready.io/api/users/login
    axios(baseUrl + url, options)
      .then(res => {
        console.log(res);
        setIsLoading(false);
        setResponse(res.data);
      }).catch(err => {
      console.error(err);
      setIsLoading(false);
      setError(err.response.data);
    })
  }, [isLoading])

  return [{isLoading, response, error}, doFetch];
}