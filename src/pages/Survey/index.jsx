import React from 'react';

import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { useUserContext } from '../../providers/userProvider';
import { SurveyCard } from '../../components/SurveyCard';

export const Survey = () => {
  const navigate = useNavigate();

  const { questions, handleChange, calculateSchemas, calculateLoading } = useUserContext();

  const onClickComplete = () => {
    calculateSchemas(() => {
      navigate('/results');
    });
  };

  return (
    <div className={styles.container}>
      {questions.map((question) => (
        <SurveyCard question={question} key={question.id} handleChange={handleChange} />
      ))}
      <Button
        loading={calculateLoading}
        onClick={onClickComplete}
        className={styles.button}
        type='primary'
      >
        Зберегти
      </Button>
    </div>
  );
};
