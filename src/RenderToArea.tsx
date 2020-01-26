import React from 'react';
import { SubtreeContext } from './Subtree';

const { useEffect, useContext, useRef } = React;

let orderNumber = 0;

interface ComponentData {
  value: React.ReactNode;
  orderNumber: number | null;
}

export function useRender(areaId: string, children: React.ReactNode) {
  const { addComponent, removeComponent, updateComponent } = useContext(
    SubtreeContext,
  );
  const ref = useRef<ComponentData>({ value: children, orderNumber: null });

  ref.current.orderNumber = orderNumber;
  orderNumber += 1;

  useEffect(() => {
    addComponent(areaId, ref.current);
    return () => {
      removeComponent(areaId, ref.current);
    };
  }, [ref.current, addComponent, removeComponent]);

  useEffect(() => {
    ref.current.value = children;
    updateComponent(areaId, ref.current);
  }, [children]);
}

export const RenderToArea: React.FunctionComponent<{ areaId: string }> = ({
  areaId,
  children,
}) => {
  useRender(areaId, children);
  return null;
};
