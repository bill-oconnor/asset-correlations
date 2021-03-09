import React, { ReactNode } from "react";
import "./ContentGrid.scss";

type ContentGridProps = {
  children: ReactNode | ReactNode[];
};

// TODO: make this dynamic...or name it something else
export function ContentGrid(props: ContentGridProps) {
  return <div className="ContentGrid">{props.children}</div>;
}
