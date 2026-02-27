import React from 'react';

import { isFunction } from 'easy-soft-utility';

import { ElasticitySelectButton } from 'antd-management-fast-component';

import { PageListWithWorkflowSelectDrawer } from '../PageListWithWorkflowSelectDrawer';

const { BaseElasticitySelectButton } = ElasticitySelectButton;

class SelectWithWorkflowDrawerButton extends BaseElasticitySelectButton {
  openSelector = () => {
    PageListWithWorkflowSelectDrawer.open();
  };

  afterSelectSuccessCore = (o) => {
    if ((o || null) == null) {
      return;
    }

    const { afterSelectSuccess } = this.props;

    this.setState({
      selectData: o,
    });

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(o);
    }
  };

  renderPresetSelector = () => {
    const { label } = this.props;

    return (
      <PageListWithWorkflowSelectDrawer
        title={label}
        width={800}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

SelectWithWorkflowDrawerButton.defaultProps = {
  ...BaseElasticitySelectButton.defaultProps,
  label: 'Label',
  helper: '',
};

export { SelectWithWorkflowDrawerButton };
