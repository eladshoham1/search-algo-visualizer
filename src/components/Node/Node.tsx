import React, { useMemo } from 'react';
import { NodeProps } from '../../types';
import './Node.css';

const Node: React.FC<NodeProps> = ({ point, state }) => {
  const extraClassName = useMemo(() => {
    return `node-${state}`;
  }, [state]);

  return (
    <div
      id={`node-${point.row}-${point.col}`}
      className={`node ${extraClassName}`}
    ></div>
  );
};

export default Node;
