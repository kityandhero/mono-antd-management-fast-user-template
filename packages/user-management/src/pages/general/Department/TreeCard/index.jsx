import { DownOutlined } from '@ant-design/icons';

import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataOperation } from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseView } = DataOperation;

@connect(({ department, schedulingControl }) => ({
  department,
  schedulingControl,
}))
class TreeCard extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'department/singleTreeList',
    };
  }

  goToPageList = (item) => {
    const departmentId = getValueByKey({
      data: item,
      key: fieldData.departmentId.name,
      defaultValue: '',
    });

    this.goToPath(`/organization/department/pageList/no/${departmentId}`);
  };

  establishCardCollectionConfig = () => {
    const { metaListData } = this.state;

    return {
      list: [
        {
          title: {
            text: '栏目导航',
          },
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
                size: 'small',
              },
            ],
          },
          spinning: this.checkInProgress(),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.tree,
              showLine: true,
              switcherIcon: <DownOutlined />,
              onSelect: (selectedKeys, { node }) => {
                this.goToPageList(node);
              },
              treeData: [
                {
                  key: '-10000',
                  title: '全部栏目',
                  code: '-10000',
                },
                ...metaListData,
              ],
            },
          ],
        },
      ],
    };
  };

  renderFurther() {
    return this.buildCardCollection(this.establishCardCollectionConfig());
  }
}

export { TreeCard };
