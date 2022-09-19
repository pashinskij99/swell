import React, { ComponentProps, FC, ReactNode } from 'react';

type IComponentType = FC<{ children: ReactNode }>;

export const combineComponents = (
  components: IComponentType[],
): IComponentType => {
  return components.reduce((AccumulatedComponents, CurrentComponent) => {
    const NextComponent = ({ children }: ComponentProps<IComponentType>): JSX.Element => {
      return (
        <AccumulatedComponents>
          <CurrentComponent>{children}</CurrentComponent>
        </AccumulatedComponents>
      );
    };

    return NextComponent;
  });
};
