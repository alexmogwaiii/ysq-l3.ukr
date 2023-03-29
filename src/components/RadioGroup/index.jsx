import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';

export const RadioGroup = ({ disabled, handleChange, id, value }) => {
  const [selectedValue, setSelectedValue] = useState(1);

  const onChange = (e) => {
    if (!handleChange) {
      return;
    }

    setSelectedValue(e.target.value);

    setTimeout(() => {
      handleChange({ questionId: id, choice: e.target.value });
    }, 100);
  };

  useEffect(() => {
    setSelectedValue(value);
  }, []);

  return (
    <Radio.Group disabled={disabled} onChange={onChange} value={selectedValue}>
      <Radio value={1}>1</Radio>
      <Radio value={2}>2</Radio>
      <Radio value={3}>3</Radio>
      <Radio value={4}>4</Radio>
      <Radio value={5}>5</Radio>
      <Radio value={6}>6</Radio>
    </Radio.Group>
  );
};
