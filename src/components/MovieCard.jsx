import { Flex, Image, Typography } from 'antd';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
export default function MovieCard({ title, image, date, genre, overview }) {
  function truncateDescription(description, maxLength) {
    if (description.length <= maxLength) {
      return description;
    }

    const words = description.split(' ');
    let truncatedText = '';

    for (const word of words) {
      if ((truncatedText + word).length <= maxLength) {
        truncatedText += (truncatedText ? ' ' : '') + word;
      } else {
        break;
      }
    }

    return truncatedText + (truncatedText.length < description.length ? '...' : '');
  }
  return (
    <Flex className="movie-card">
      <div style={{ flexShrink: 0, width: '180px', height: '280px' }}>
        <Image width={180} height={280} src={image} />
      </div>
      <Flex vertical gap={8} style={{ padding: '10px 20px' }}>
        <Typography.Title level={4} style={{ marginBottom: 0 }}>
          {title}
        </Typography.Title>
        <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
          {date ? format(new Date(date), 'MMMM d, yyyy') : 'release date unknown'}
        </Typography.Text>
        <Flex wrap={'wrap'} gap={5}>
          {genre.map((item, i) => (
            <Typography.Text key={i} keyboard>
              {item}
            </Typography.Text>
          ))}
        </Flex>
        <Typography.Paragraph>{truncateDescription(overview, 150)}</Typography.Paragraph>
      </Flex>
    </Flex>
  );
}
MovieCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  genre: PropTypes.array,
  overview: PropTypes.string,
};
