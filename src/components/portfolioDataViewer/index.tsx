import React from 'react';
import clsx from 'clsx';
import { IModelData } from '../../types/models.types';
import Card from '../card';
import { INavigatePopup } from '../../types/common.types';
import styles from './styles.module.scss';
import ModelPopup from './modelPopup';

export const navigationPopup: INavigatePopup[] = [
  {
    id: 0,
    name: 'info',
    image: '/images/info.svg',
  },
  {
    id: 1,
    name: 'info',
    image: '/images/share.svg',
  },
  {
    id: 2,
    name: 'info',
    image: '/images/tune.svg',
  },
  {
    id: 3,
    name: 'info',
    image: '/images/zoom.svg',
  },
];

type Props = {
  data: IModelData[];
};

const bigItems = [2, 3, 6, 7, 10, 11];

const PortfolioDataViewer = (props: Props) => {
  const { data } = props;
  const [activeItem, setActiveItem] = React.useState<IModelData | undefined>()

  const handleCardClick = (id: number) => () => {
    setActiveItem(data.find((el) => el.id === id))
  };

  const handleClose = () => {
    setActiveItem(undefined)
  }

  return (
    <div className={styles.wrapper_portfolio}>
      <div className={clsx(styles.container, 'container')}>
        <ul className={styles.model_list}>
          {data.map(({
            preview,
            title,
            description,
            id,
          }, i) => {
            const _i = i + 1;
            const _size = bigItems.includes(_i) ? 'big' : 'small';

            return (
              <li key={title} data-size={_size} className={styles.model_item}>
                <Card
                  image={preview}
                  name={title}
                  description={description}
                  disabled={false}
                  size={_size}
                  onClick={handleCardClick(id)}
                />
              </li>
            );
          })}
        </ul>
        {
          activeItem
          ? <ModelPopup data={activeItem} onClose={handleClose} />
          : null
        }
      </div>
    </div>
  );
};

export default PortfolioDataViewer;
