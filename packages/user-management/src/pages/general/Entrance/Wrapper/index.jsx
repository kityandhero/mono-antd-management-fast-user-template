import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';
import { Helmet } from '@umijs/max';

import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { getCopyright } from 'antd-management-fast-common';
import {
  BaseComponent,
  Bubbly,
  CenterBox,
  FlexBox,
  VerticalBox,
} from 'antd-management-fast-component';

const defaultProps = {};

class Wrapper extends BaseComponent {
  renderFurther() {
    const { children } = this.props;

    const title = '登录';

    const { officeAutomationManagementSignInBackgroundImage } = {
      officeAutomationManagementSignInBackgroundImage: '',
      ...window.officeAutomationManagementRemoteConfig,
    };

    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />
        </Helmet>

        <div style={{ height: '100vh' }}>
          <FlexBox
            flexAuto="top"
            vertical={{
              bottomHeight: '180rpx',
            }}
            top={
              <VerticalBox
                align="center"
                alignJustify="center"
                style={{
                  height: '100%',
                }}
              >
                <CenterBox>
                  <div
                    style={{
                      width: '400px',
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                    }}
                  >
                    {children}
                  </div>
                </CenterBox>

                {/* <div
                  style={{
                    flex: '1',
                    padding: '32px 0',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>{children}</div>
                </div> */}
              </VerticalBox>
            }
            bottom={
              <DefaultFooter
                style={{ background: 'inherit' }}
                links={[]}
                copyright={getCopyright() || ''}
              />
            }
          />

          <div
            style={{
              position: 'fixed',
              width: '100%',
              height: '100%',
              top: 0,
              zIndex: -1,
            }}
          >
            {checkStringIsNullOrWhiteSpace(
              officeAutomationManagementSignInBackgroundImage,
            ) ? (
              <Bubbly />
            ) : (
              <img
                style={{
                  height: '100%',
                  width: '100%',
                }}
                src={officeAutomationManagementSignInBackgroundImage}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

Wrapper.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Wrapper;
