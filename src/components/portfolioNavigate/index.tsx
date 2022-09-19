import React from 'react';
import clsx from 'clsx';
import { IModelData } from '../../types/models.types';
import { Button } from '../button';
import styles from './styles.module.scss';
import { StrapiPagination } from '../../strapi/strapi.requests';

type Props = {
  pagination: StrapiPagination,
  onActiveChange: (page: number) => void
};

const PortfolioNavigate = (props: Props) => {
  const { pagination, onActiveChange } = props;

  const handlePageClick = (page: number) => () => {
    onActiveChange(page)
  }

  if (pagination.total <= 0) {
    return null;
  }

  return (
    <div className={clsx(styles.container, 'container')}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <button className={styles.btn_prev}> </button>
          <ul className={styles.navigate_list}>
            {Array(pagination.pageCount)
              .fill(null)
              .map((item, i) => {
                const _i = i + 1;

                return (
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <li
                    onClick={handlePageClick(_i)}
                    data-active={pagination.page === _i}
                    key={_i}
                    className={styles.navigate_item}
                  >
                    {_i}
                  </li>
                );
              })}
          </ul>
          <button className={styles.btn_next}> </button>
        </nav>
        <div className={styles.btn_wrapper}>
          <Button
            disabled={false}
            name="Show more"
            type="start"
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioNavigate;
