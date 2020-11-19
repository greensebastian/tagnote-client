import React, { Fragment, FunctionComponent } from "react";
type ConditionalWrapperProps = {
  condition: boolean;
  wrapper: FunctionComponent;
};

const ConditionalWrapper: FunctionComponent<ConditionalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => {
  if (!children) return null;
  return condition ? wrapper({ children }) : <Fragment>{children}</Fragment>;
};

export default ConditionalWrapper;
