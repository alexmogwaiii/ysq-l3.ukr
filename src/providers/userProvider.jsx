import React, { createContext, useContext, useMemo } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';

const UserContext = createContext(null);

const validationSchema = yup.object().shape({
  userName: yup.string().required('Required field'),
  data: yup.string().required('Required field'),
});

export const UserProvider = ({ children }) => {
  const onSubmit = () => {
    //
  };

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      userName: '',
      data: dayjs(new Date()).format('YYYY-MM-DD'),
    },
    validationSchema,
    onSubmit,
    validateOnChange: true,
  });

  const user = useMemo(
    () => ({
      values,
      setFieldValue,
      handleSubmit,
    }),
    [values],
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
