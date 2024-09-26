import './styles/normalize.css';
import './App.css';
import Movies from './components/Movies.jsx';
import { Col, Row } from 'antd';

function App() {
  return (
    <Row justify="center">
      <Col style={{ backgroundColor: '#fff', padding: '20px 32px' }} flex="1010px">
        <Movies />
      </Col>
    </Row>
  );
}

export default App;
