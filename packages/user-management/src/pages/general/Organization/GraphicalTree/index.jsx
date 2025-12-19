import { G6, MindMap } from '@ant-design/graphs';

import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataForm } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { buildOrganizationGraphConfig } from '../../../utils';

const { BaseUpdateForm } = DataForm;

const { treeToGraphData } = G6;

@connect(({ organization, schedulingControl }) => ({
  organization,
  schedulingControl,
}))
class AddBasicInfo extends BaseUpdateForm {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '组织结构图示',
      loadApiPath:
        modelTypeCollection.organizationTypeCollection.getGraphicalTree,
    };
  }

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    this.setState({
      graphData: treeToGraphData(
        JSON.parse(
          JSON.stringify(
            metaData || {
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
      ),
    });
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    return values;
  };

  establishCardCollectionConfig = () => {
    const { graphData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '组织结构全局概览',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <MindMap {...buildOrganizationGraphConfig()} data={graphData} />
              ),
            },
          ],
        },
      ],
    };
  };
}

export default AddBasicInfo;
