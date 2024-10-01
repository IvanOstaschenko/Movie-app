import { Flex, Image, Rate, Typography } from 'antd';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { StarFilled } from '@ant-design/icons';
import truncateDescription from '../utils/truncateDescription.js';
import { useContext } from 'react';
import { ApiContext } from '../contexts/ApiContext.jsx';
import moviePoster from '/movie_poster.jpg';
export default function MovieCard({ movie }) {
  const {
    original_title,
    poster_path,
    release_date,
    genre_ids,
    overview,
    vote_average,
    id,
    rating = null,
  } = movie;
  const { genres } = useContext(ApiContext);
  const { apiService } = useContext(ApiContext);
  async function addMovieRate(value) {
    const guestSession = localStorage.getItem('guestSessionMovieDB');
    try {
      await apiService.addRateMovie(guestSession, id, value);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Flex className="movie-card">
      <div style={{ flexShrink: 0, width: '180px', height: '280px' }}>
        <Image
          width={180}
          height={280}
          src={poster_path ? `${apiService.apiConfig.imageUrl}` + poster_path : moviePoster}
        />
      </div>
      <Flex vertical gap={8} style={{ padding: '10px 20px' }}>
        <Flex justify={'space-between'}>
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            {original_title}
          </Typography.Title>
          <div
            className={`rate-circle rate-circle-level-${
              vote_average < 3 ? 1 : vote_average < 5 ? 2 : vote_average < 7 ? 3 : 4
            }`}
            style={{ flexShrink: 0 }}
          >
            {vote_average.toFixed(1)}
          </div>
        </Flex>
        <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
          {release_date ? format(new Date(release_date), 'MMMM d, yyyy') : 'release date unknown'}
        </Typography.Text>
        <Flex wrap={'wrap'} gap={5}>
          {genre_ids.map((item, i) => (
            <Typography.Text key={i} keyboard>
              {genres[item]}
            </Typography.Text>
          ))}
        </Flex>
        <Typography.Paragraph>{truncateDescription(overview, 150)}</Typography.Paragraph>
        <Rate
          count={10}
          defaultValue={rating}
          style={{ marginTop: 'auto' }}
          character={<StarFilled style={{ width: '15px' }} />}
          onChange={addMovieRate}
        />
      </Flex>
    </Flex>
  );
}
MovieCard.propTypes = {
  movie: PropTypes.object,
};
