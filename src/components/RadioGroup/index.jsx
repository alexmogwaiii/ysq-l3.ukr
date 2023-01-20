import React from 'react';
import { Radio } from 'antd';

export const RadioGroup = ({ value, disabled, handleChange, id }) => {
  const onChange = (e) => {
    if (!handleChange) {
      return;
    }
    handleChange({ questionId: id, choice: e.target.value });
  };

  return (
    <Radio.Group disabled={disabled} onChange={onChange} value={value}>
      <Radio value={1}>1</Radio>
      <Radio value={2}>2</Radio>
      <Radio value={3}>3</Radio>
      <Radio value={4}>4</Radio>
      <Radio value={5}>5</Radio>
      <Radio value={6}>6</Radio>
    </Radio.Group>
  );
};
