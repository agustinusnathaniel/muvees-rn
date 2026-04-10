import React from 'react';
import { AnimatedView } from './AnimatedView';

type StaggeredGroupProps = {
  children: React.ReactNode;
  stagger?: number;
};

export const StaggeredGroup = ({
  children,
  stagger = 80,
}: StaggeredGroupProps) =>
  React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    return <AnimatedView delayMs={index * stagger}>{child}</AnimatedView>;
  });
