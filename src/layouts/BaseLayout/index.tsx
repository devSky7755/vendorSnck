import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Header from '../SidebarLayout/Header';

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return <>
    <Header isBasic={true} />
    {children || <Outlet />}
  </>;
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
