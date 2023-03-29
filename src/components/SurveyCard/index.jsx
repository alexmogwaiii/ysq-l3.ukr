import React from 'react';
import { Card } from 'antd';
import styles from '../../pages/Survey/styles.module.scss';
import { RadioGroup } from '../RadioGroup';

export const SurveyCard = ({ question, handleChange }) => {
  return (
    <Card
      style={{
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      }}
      title={`${question.id}. ${question.text}`}
      bordered={false}
    >
      <div className={styles.listItem}>
        <RadioGroup handleChange={handleChange} id={question.id} value={question.choice} />
      </div>
    </Card>
  );
};
