import React from 'react';

import { Button } from 'antd';
import styles from './styles.module.scss';
import { useUserContext } from '../../providers/userProvider';
import { RadioGroup } from '../../components/RadioGroup';

export const Survey = () => {
  const { questions, handleChange } = useUserContext();

  return (
    <div className={styles.container}>
      {questions.map((question) => (
        <div className={styles.listItem} key={question.id}>
          <p className={styles.text}>
            <span>{question.id + 1}. </span>
            {question.text}
          </p>
          <RadioGroup handleChange={handleChange} id={question.id} value={question.choice} />
        </div>
      ))}
      <Button className={styles.button} type='primary'>
        Зберегти
      </Button>
    </div>
  );
};
