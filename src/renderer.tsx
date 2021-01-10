import React, { Fragment } from "react";

const mapPropsToConfig = (config: any[]) => {
  const configWithProps: any[] = [];

  config.forEach((item: any) => {
    if (item.component) {
      const { component, props, name } = item;
      configWithProps.push({
        ...props,
        name: name,
        Component: component
      });
    }
  });

  return configWithProps;
};

export const Renderer = ({config}:any) => {
  if (!config) {
    throw new Error('You are calling Renderer with no config.');
  }

  const configWithProps = mapPropsToConfig(config);

  const renderComponents = (items: any) => {
    return items.map((item: any) => {
      const { Component, name, ...props } = item;
      return (
        <Fragment key={props.name}>
          <Component {...props} />
        </Fragment>
      );
    })
  }

  return renderComponents(configWithProps)
};
