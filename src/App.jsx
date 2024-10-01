import './styles/normalize.css';
import './App.css';
import Search from './components/Search.jsx';
import { Alert, Col, Row, Spin, Tabs } from 'antd';
import Rated from './components/Rated.jsx';
import { ApiContext } from './contexts/ApiContext.jsx';
import MoviesApi from './api/moviesApi.js';
import { useEffect, useState } from 'react';

function App() {
  const apiService = new MoviesApi();
  const [getData, setGetData] = useState(false);
  const [genres, setGenres] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [errorObj, setErrorObj] = useState({});

  async function startGuestSession() {
    try {
      if (!genres.length) {
        const genresData = await apiService.getGenres();
        setGenres(genresData);
      }
      if (!localStorage.getItem('guestSessionMovieDB')) {
        const session = await apiService.createGuestSession();
        localStorage.setItem('guestSessionMovieDB', session.guest_session_id);
      }
      setGetData(true);
    } catch (e) {
      setErrorObj(e);
      setFetchError(true);
    }
  }

  useEffect(() => {
    startGuestSession();
  }, []);
  return (
    <Row justify="center">
      <Col style={{ backgroundColor: '#fff', padding: '20px 32px' }} flex="1010px">
        {!getData && <Spin fullscreen={true} />}
        {getData && fetchError && (
          <Alert
            type="error"
            message={errorObj.message}
            closable
            onClose={() => {
              setFetchError(false);
            }}
          />
        )}
        {getData && !fetchError && (
          <ApiContext.Provider value={{ genres, apiService }}>
            <Tabs
              defaultActiveKey="1"
              centered
              tabBarStyle={{
                display: 'inline-block',
                marginInline: 'auto',
              }}
              items={[
                {
                  label: 'Search',
                  key: '1',
                  children: <Search />,
                },
                {
                  label: 'Rated',
                  key: '2',
                  children: <Rated />,
                },
              ]}
            />
          </ApiContext.Provider>
        )}
      </Col>
    </Row>
  );
}

export default App;
