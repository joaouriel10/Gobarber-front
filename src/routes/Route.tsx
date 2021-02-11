import React from 'react';

import { useAuth } from '../hooks/auth';

import { Route as ReactDOMRoute, RouteProps as ReactDOMRouterProps, Redirect } from 'react-router-dom';

interface RouteProps extends ReactDOMRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();
  return (
    <ReactDOMRoute 
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard', state: { from: location}}} />
        )
      }} 
    />
  );
};

export default Route;
