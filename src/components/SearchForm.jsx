import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

export default function SearchForm({ submitAction }) {
  const debouncedSubmit = debounce(submitAction, 2000);
  return (
    <Form
      style={{ marginBottom: '34px' }}
      onFinish={(e) => e.preventDefault()}
      onValuesChange={(text) => {
        console.log(text.request);
        debouncedSubmit(text.request);
      }}
    >
      <Form.Item name="request">
        <Input placeholder="Type to search..." />
      </Form.Item>
    </Form>
  );
}
SearchForm.propTypes = {
  submitAction: PropTypes.func,
};
