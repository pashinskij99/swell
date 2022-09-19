import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import arrow_category_down from '../../assets/images/svg/arrow_down_category.svg';
import { IModelCategoryWithActive } from '../../types/models.types';

interface ISearchProps {

}

// eslint-disable-next-line no-empty-pattern
const Search: React.FC<ISearchProps> = ({ /* TODO */ }) => {
  return (
    <div className={styles.input_wrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="search for inspiration (characters/arch/electronic...)"
      />
      <button className={styles.search_btn}> </button>
    </div>
  )
}

interface IActiveCategoriesProps {
  categories: IModelCategoryWithActive[];
  onRemove: (category: number) => void
}

const ActiveCategories: React.FC<IActiveCategoriesProps> = ({ categories, onRemove }) => {
  const handleRemove = (category: number) => () => {
    onRemove(category)
  }

  const renderItem = ({ id, name }: IModelCategoryWithActive) => {
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <li
        onClick={handleRemove(id)}
        key={id}
      >
        <div className={styles.btn_active_category}>{name}</div>
        <span
          className={styles.btn_remove}
        >
        </span>
      </li>
    );
  }

  return (
    <ul className={styles.list_items_active}>
      {
        categories.map(renderItem)
      }
    </ul>
  )
}

interface ICategoriesPickerProps {
  isOpened: boolean,
  onAddCategory: (id: number) => void,
  categories: IModelCategoryWithActive[],
  onSearch: () => void,
  onRemove: (category: number) => void,
}

const CategoriesPicker: React.FC<ICategoriesPickerProps> = ({
  isOpened,
  onAddCategory,
  categories,
  onSearch,
  onRemove,
}) => {
  const onCategoryClick = (id: number, isActive: boolean) => () => {
    if (isActive) {
      onRemove(id);
    } else {
      onAddCategory(id);
    }
  };

  const renderCategory = ({
    name,
    id,
    count,
    active,
  }: IModelCategoryWithActive) => {
    const renderRemoveButton = () => {
      if (!active) {
        return null;
      }

      return (
        <button
          className={styles.btn_remove}
        >
        </button>
      )
    }

    return (
      <li key={id} data-active={active} className={styles.item}>
        <div onClick={onCategoryClick(id, !!active)} className={styles.item_wrapper}>
          {name}
          <span>{count}</span>
        </div>
        {
          renderRemoveButton()
        }
      </li>
    )
  }

  return (
    <nav data-active={isOpened} className={styles.nav_list}>
      <div className={clsx(styles.container, 'container')}>
        <ul className={styles.list_items_all}>
          {categories.map(renderCategory)}
        </ul>
        <button
          onClick={onSearch}
          // data-ready={listActiveItems[0] ? 'active' : ''}
          className={styles.search_btn}
        >
          Search
        </button>
      </div>
    </nav>
  )
}

type Props = {
  categories: IModelCategoryWithActive[];
  updateCategories: (categories: number[]) => void;
};

const CategoriesFilter: React.FC<Props> = ({ categories, updateCategories }) => {
  const [pickeOpened, setPickerOpened] = useState<boolean>(false);
  const activeCategories = categories.filter((i) => i.active)
  // const [nextCategories, setNextCategories] = React.useState(categories)

  const togglePicker = () => {
    setPickerOpened((v) => !v)
  }

  const handleRemoveCategory = (category: number) => {
    updateCategories(activeCategories.map((el) => el.id).filter((el) => el !== category))
  }

  const handleAddCategory = (category: number) => {
    updateCategories([...activeCategories.map((el) => el.id), category])
  }

  const handleSearchSubmit = () => {
  }

  const renderOpenButton = () => (
    <button onClick={togglePicker} className={styles.filter_category_btn}>
      Category
      <div className={styles.img_wrapper} data-active={pickeOpened}>
        <img src={arrow_category_down.src} alt="arrow" />
      </div>
    </button>
  )

  return (
    <div
      className={styles.filter_wrapper}
    >
      <div className={styles.filter_container}>
        <div className={clsx(styles.container, 'container')}>
          <nav className={styles.filter_nav}>
            {renderOpenButton()}
            <Search />
          </nav>
          <ActiveCategories
            categories={activeCategories}
            onRemove={handleRemoveCategory}
          />
        </div>
        <CategoriesPicker
          onSearch={handleSearchSubmit}
          isOpened={pickeOpened}
          onRemove={handleRemoveCategory}
          onAddCategory={handleAddCategory}
          categories={categories}
        />
      </div>
    </div>
  );
};

export { CategoriesFilter as Filter };
