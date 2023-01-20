import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { newQuestions } from '../constants/questions';

const UserContext = createContext(null);

const validationSchema = yup.object().shape({
  userName: yup.string().min(2).required('Required field'),
  data: yup.string().required('Required field'),
});

export const UserProvider = ({ children }) => {
  // eslint-disable-next-line
  const [questions, setQuestions] = useState([]);

  const handleChange = useCallback(
    ({ questionId, choice }) => {
      const cloneQuestions = questions.map((item) =>
        item.id === questionId
          ? {
              ...item,
              choice,
            }
          : item,
      );

      setQuestions(cloneQuestions);
    },
    [questions],
  );

  useEffect(() => {
    setQuestions(newQuestions);
  }, []);

  const { values, setFieldValue, handleSubmit, errors, validateField } = useFormik({
    initialValues: {
      userName: '',
      data: dayjs(new Date()).format('YYYY-MM-DD'),
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const user = useMemo(
    () => ({
      values,
      setFieldValue,
      handleSubmit,
      errors,
      validateField,
      questions,
      handleChange,
    }),
    [values, handleChange, errors, validateField, questions],
  );

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (ctx === null) {
    throw new Error('AuthContext missing.');
  }

  return ctx;
};
