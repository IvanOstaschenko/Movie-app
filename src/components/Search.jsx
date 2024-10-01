import { Alert, List } from 'antd';
import MovieCard from './MovieCard.jsx';
import { useContext, useEffect, useState } from 'react';
import { CloseSquareFilled } from '@ant-design/icons';
import SearchForm from './SearchForm.jsx';
import { ApiContext } from '../contexts/ApiContext.jsx';

export default function Search() {
  const { apiService } = useContext(ApiContext);
  const [errorApi, setErrorApi] = useState(null);
  const [requestText, setRequestText] = useState('return');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listPage, setListPage] = useState(1);
  const [totalCountMovies, setTotalCountMovies] = useState(0);

  async function getMovies() {
    try {
      let movies = await apiService.getMoviesList(listPage, requestText);
      setMovies(movies.results);
      setTotalCountMovies(movies.total_results);
      setIsLoading(false);
    } catch (e) {
      setErrorApi({ name: e.name, message: e.message });
    }
  }

  useEffect(() => {
    !isLoading && setIsLoading(true);
    getMovies();
  }, [listPage, requestText]);
  return (
    <>
      {errorApi && (
        <Alert
          type="error"
          message={errorApi.name}
          description={errorApi.message}
          closable={{
            'aria-label': 'close',
            closeIcon: <CloseSquareFilled />,
          }}
          onClose={() => {
            setErrorApi(null);
            getMovies();
          }}
        />
      )}
      {!errorApi && (
        <>
          <SearchForm
            submitAction={(text) => {
              setListPage(1);
              setRequestText(text);
            }}
          />
          <List
            grid={{
              gutter: [32, 16],
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
            dataSource={movies}
            renderItem={(item) => (
              <List.Item>
                <MovieCard movie={item} />
              </List.Item>
            )}
            loading={{ spinning: isLoading, fullscreen: isLoading }}
            pagination={{
              align: 'center',
              current: listPage,
              defaultPageSize: 20,
              total: totalCountMovies,
              onChange: (page) => setListPage(page),
              showSizeChanger: false,
            }}
          />
        </>
      )}
    </>
  );
}
