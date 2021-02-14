import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './entry.module.scss';
import Utils from '~/foundation/utils/Utils';

import { useDispatch } from 'react-redux';
import { SET_UI_COLOR } from '~/state/ui';

const Component = React.memo(({ data, index }: { data; index }) => {
  const dispatch = useDispatch();

  return <></>;
});

export default Component;
