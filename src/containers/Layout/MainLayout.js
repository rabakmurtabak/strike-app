import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import Sidebar from 'containers/Layout/Sidebar';
import Header from 'containers/Layout/Header';
import Footer from 'containers/Layout/Footer';
import { Row, Column } from 'components/Basic/Style';

const MainLayoutWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: var(--color-bg-main);
  overflow: auto;

  .main {
    padding: 0px 88px;
    overflow-x: hidden;
    background-color: var(--color-bg-main);

    .main-content {
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 150px);
    }

    @media only screen and (max-width: 768px) {
      padding: 0px;
    }
  }

  /* width */
  &::-webkit-scrollbar {
    width: 7px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    -webkit-border-radius: 3px;
    background-color: #2e2f35;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #3e3f45;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

function MainLayout({ title, isHeader, currentAsset, children }) {
  return (
    <MainLayoutWrapper>
      <Row>
        <Column xs="12" sm="12">
          <Sidebar />
        </Column>
        <Column xs="12" sm="12" className="main">
          <Row>
            {isHeader && title && (
              <Column xs="12">
                <Header title={title} currentAsset={currentAsset} />
              </Column>
            )}
            <Column xs="12">
              <div className="main-content">{children}</div>
            </Column>
          </Row>
        </Column>
        <Column xs="12" sm="12">
          <Footer />
        </Column>
      </Row>
    </MainLayoutWrapper>
  );
}

MainLayout.propTypes = {
  title: PropTypes.string,
  isHeader: PropTypes.bool,
  currentAsset: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

MainLayout.defaultProps = {
  title: '',
  isHeader: true,
  currentAsset: '',
  children: null
};

export default withTheme(MainLayout);
