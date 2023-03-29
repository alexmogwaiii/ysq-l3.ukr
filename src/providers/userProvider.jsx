import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { newQuestions } from '../constants/questions';

const SCHEMAS = {
  emotionalDeprivation: {
    name: 'Схема емоційної депривації',
    interval: {
      min: 0,
      max: 9,
    },
    low: {
      min: 1,
      max: 8,
    },
    medium: {
      min: 9,
      max: 18,
    },
    high: {
      min: 19,
      max: 30,
    },
    veryHigh: {
      min: 31,
      max: 54,
    },
  },
  abandonment: {
    name: 'Схема покинення/нестабільності стосунків',
    interval: {
      min: 9,
      max: 26,
    },
    low: {
      min: 1,
      max: 12,
    },
    medium: {
      min: 13,
      max: 25,
    },
    high: {
      min: 26,
      max: 39,
    },
    veryHigh: {
      min: 40,
      max: 102,
    },
  },
};

const UserContext = createContext(null);

const validationSchema = yup.object().shape({
  userName: yup.string().min(2).required('Required field'),
  data: yup.string().required('Required field'),
});

export const UserProvider = ({ children }) => {
  // eslint-disable-next-line
  const [questions, setQuestions] = useState([]);

  const [schemasData, setSchemasData] = useState([]);
  const [calculateLoading, setCalculateLoading] = useState(false);

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

  const getSchemaResult = (schema, currentPoints) => {
    const { low, medium, high, veryHigh } = schema;

    if (currentPoints >= low.min && currentPoints <= low.max) {
      return 'Низький';
    }

    if (currentPoints >= medium.min && currentPoints <= medium.max) {
      return 'Середній';
    }

    if (currentPoints >= high.min && currentPoints <= high.max) {
      return 'Високий';
    }

    if (currentPoints >= veryHigh.min && currentPoints <= veryHigh.max) {
      return 'Дуже високий';
    }

    return 'Низький';
  };

  const getSchemaByInterval = useCallback(
    (schema) => {
      const { min, max } = schema.interval;

      console.log(questions.slice(min, max));

      const schemaPoints = questions.slice(min, max).reduce((acc, currentValue) => {
        const calculatedValue = currentValue.choice <= 3 ? 0 : currentValue.choice;

        return acc + calculatedValue;
      }, 0);

      return {
        name: schema.name,
        point: schemaPoints,
        result: getSchemaResult(schema, schemaPoints),
      };
    },
    [questions],
  );

  const calculateSchemas = useCallback(
    (navigationCallback) => {
      setCalculateLoading(true);

      const emotionalDeprivation = getSchemaByInterval(SCHEMAS.emotionalDeprivation);
      const abandonment = getSchemaByInterval(SCHEMAS.abandonment);

      setSchemasData([emotionalDeprivation, abandonment]);
      setCalculateLoading(false);

      navigationCallback();
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
      schemasData,
      calculateSchemas,
      calculateLoading,
    }),
    [
      values,
      handleChange,
      calculateLoading,
      errors,
      validateField,
      questions,
      schemasData,
      calculateSchemas,
    ],
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
