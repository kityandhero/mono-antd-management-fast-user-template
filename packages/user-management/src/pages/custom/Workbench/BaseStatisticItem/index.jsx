import { Avatar } from 'antd';

import { checkStringIsNullOrWhiteSpace, toString } from 'easy-soft-utility';

import {
  BaseComponent,
  CenterBox,
  FlexBox,
} from 'antd-management-fast-component';
import { LoadingOverlay } from 'antd-management-fast-framework';

class BaseStatisticItem extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      value: '0',
      title: '标题',
      icon: null,
      backgroundColor: '',
    };
  }

  getFlag = () => '';

  getIcon = () => null;

  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
    const { onClick } = this.props;
    const { backgroundColor, value, title } = this.state;

    return (
      <div
        style={{
          backgroundColor: backgroundColor,
          borderRadius: '6px',
          overflow: 'hidden',
          width: '380px',
          height: '80px',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <LoadingOverlay flag={[this.getFlag()]} fill>
          <CenterBox>
            <FlexBox
              flexAuto="right"
              style={{
                width: '120px',
              }}
              left={
                <CenterBox>
                  <Avatar
                    size="small"
                    style={{
                      width: '56px',
                      height: '56px',
                    }}
                    shape="square"
                    src={this.getIcon()}
                    alt=""
                  />
                </CenterBox>
              }
              leftStyle={{}}
              right={
                <FlexBox
                  flexAuto="top"
                  top={
                    <div
                      style={{
                        fontSize: '26px',
                        paddingTop: '0px',
                        color: '#fff',
                        fontWeight: 'bold',
                        width: '100%',
                        height: '36px',
                        overflow: 'hidden',
                        textAlign: 'center',
                      }}
                    >
                      {checkStringIsNullOrWhiteSpace(toString(value))
                        ? '--'
                        : toString(value)}
                    </div>
                  }
                  bottom={
                    <div
                      style={{
                        height: '30px',
                        fontSize: '14px',
                        color: '#fff',
                        paddingBottom: '4px',
                      }}
                    >
                      {title}
                    </div>
                  }
                />
              }
            />
          </CenterBox>
        </LoadingOverlay>
      </div>
    );
  }
}

export { BaseStatisticItem };
