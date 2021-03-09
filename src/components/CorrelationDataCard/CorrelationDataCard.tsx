import React from "react";
import { Card } from "../_layouts/Card";

type CorrelationDataCardProps = {
  className?: string;
  correlationData?: any;
};

export function CorrelationDataCard(props: CorrelationDataCardProps) {
  const { correlationData } = props;
  return correlationData ? (
    <Card className={props.className}>
      <div></div>
    </Card>
  ) : null;
}

// Data comes from redux
