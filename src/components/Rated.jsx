import { List } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../contexts/ApiContext.jsx';
import MovieCard from './MovieCard.jsx';

export default function Rated() {
  const { apiService } = useContext(ApiContext);
  const [ratedMovies, setRatedMovies] = useState([]);
  async function getRatedMovies() {
    const guestSessionId = localStorage.getItem('guestSessionMovieDB');
    const ratedMovies = await apiService.getRatedList(guestSessionId);
    setRatedMovies(ratedMovies.results);
  }
  useEffect(() => {
    getRatedMovies();
  }, []);
  return (
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
      dataSource={ratedMovies}
      renderItem={(item) => (
        <List.Item>
          <MovieCard movie={item} />
        </List.Item>
      )}
    />
  );
}
