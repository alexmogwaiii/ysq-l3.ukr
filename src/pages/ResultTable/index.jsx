import React, { useMemo } from 'react';

import { Table } from 'antd';
import { useUserContext } from '../../providers/userProvider';

export const ResultTable = () => {
  const { schemasData } = useUserContext();

  console.log(schemasData);

  const columns = useMemo(
    () => [
      {
        title: 'Назва схеми',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Ваш бал',
        dataIndex: 'point',
        key: 'point',
      },
      {
        title: 'Результати',
        dataIndex: 'result',
        key: 'result',
      },
    ],
    [],
  );

  return <Table columns={columns} dataSource={schemasData} />;
};
