import React, { ReactNode } from "react";
import "./Card.scss";

type CardProps = {
  children: ReactNode;
  className?: string;
  style?: object;
};

export function Card(props: CardProps) {
  const { children, className = "", style = {} } = props;

  return (
    <div style={style} className={`Card ${className}`}>
      {children}
    </div>
  );
}
