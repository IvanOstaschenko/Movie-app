import { Alert, List } from 'antd';
import MovieCard from './MovieCard.jsx';
import { useEffect, useState } from 'react';
import MoviesApi from '../api/moviesApi.js';
import { CloseSquareFilled } from '@ant-design/icons';

export default function Movies() {
  const apiService = new MoviesApi();
  const [errorApi, setErrorApi] = useState(null);
  const [genres, setGenres] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listPage, setListPage] = useState(1);
  const [totalCountMovies, setTotalCountMovies] = useState(0);

  async function getMovies() {
    try {
      if (!genres) {
        let res = await apiService.getGenres();
        setGenres(res);
      }
      let movies = await apiService.getMoviesList(listPage);
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
  }, [listPage]);
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
              <MovieCard
                title={item.original_title}
                image={`${apiService.apiConfig.imageUrl}` + item.poster_path}
                date={item.release_date}
                genre={item.genre_ids.map((i) => {
                  return genres[i];
                })}
                overview={item.overview}
              />
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
      )}
    </>
  );
}
