import { FlowGraph, G6 } from '@ant-design/graphs';

import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { extraBuildType } from 'antd-management-fast-common';
import { iconBuilder, ScrollFacadeBox } from 'antd-management-fast-component';
import { DataDrawer } from 'antd-management-fast-framework';

import { fieldDataFlowCase } from '../../../../customConfig';

const { BaseVerticalFlexDrawer } = DataDrawer;

const { treeToGraphData } = G6;

const ApprovalNode = ({ text }) => {
  return (
    <div
      style={{
        // height: 'inherit',
        // width: 'auto',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        textAlign: 'center',
        lineHeight: '22px',
        boxSizing: 'border-box',
        borderRadius: '16px',
        backgroundColor: '#FFF6E3',
        color: '#8B5DFF',
        border: '2px solid #8B5DFF',
        fontFamily: 'Futura',
        padding: '12px 18px',
        // whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};

class BaseFlowCaseProcessChainDrawer extends BaseVerticalFlexDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '表单审批链条信息',
      loadApiPath: '',
      listChainAll: [],
      treeChainAll: null,
      listChainApprove: [],
      treeChainApprove: null,
      showOnlyApprove: false,
    };
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldDataFlowCase.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldDataFlowCase.workflowId.name,
    });

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const listChainAll = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.listChainAll.name,
      convert: convertCollection.array,
    });

    const treeChainAll = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.treeChainAll.name,
    });

    const listChainApprove = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.listChainApprove.name,
      convert: convertCollection.array,
    });

    const treeChainApprove = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.treeChainApprove.name,
    });

    this.setState({
      listChainAll: [...listChainAll],
      listChainApprove: [...listChainApprove],
      treeChainAll,
      treeChainApprove,
    });
  };

  establishExtraActionConfig = () => {
    const { showOnlyApprove } = this.state;

    const that = this;

    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.read(),
          text: '全部节点',
          disabled: !showOnlyApprove,
          handleClick: () => {
            that.setState({
              showOnlyApprove: false,
            });
          },
        },
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.read(),
          text: '审批节点',
          disabled: showOnlyApprove,
          handleClick: () => {
            that.setState({
              showOnlyApprove: true,
            });
          },
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '当存在分支流程时，节点流转信息和表单数据相关。',
        },
        {
          text: '此图仅显示正向审批，不包含逆向审批过程。',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { showOnlyApprove, treeChainAll, treeChainApprove } = this.state;

    return (
      <ScrollFacadeBox
        style={{
          height: '100%',
          width: '100%',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            paddingTop: '16px',
            paddingBottom: '16px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          <FlowGraph
            animation
            autoResize
            autoFit="view"
            direction="vertical"
            node={{
              style: {
                component: (d) => <ApprovalNode text={d.name} />,
                size: [180, 40],
              },
            }}
            edge={{
              style: {
                stroke: '#8B5DFF',
              },
            }}
            layout={{
              type: 'dagre',
              rankSep: 110,
              nodeSep: 60,
            }}
            data={treeToGraphData(
              JSON.parse(
                JSON.stringify(
                  (showOnlyApprove ? treeChainApprove : treeChainAll) || {
                    id: 'root',
                    name: '加载中',
                    value: {
                      name: '加载中',
                      level: 0,
                    },
                    children: [],
                  },
                ),
              ),
            )}
          />
        </div>
      </ScrollFacadeBox>
    );
  };
}

export { BaseFlowCaseProcessChainDrawer };
