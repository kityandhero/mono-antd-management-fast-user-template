import { connect } from 'easy-soft-dva';
import { showInfoMessage } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { addBasicInfoAction } from '../Assist/action';

const { BaseDisplayModal } = DataModal;

const visibleFlag = '0c724adb0779462c825da60a397d255d';

@connect(({ cloudStorage, uploadHistory, schedulingControl }) => ({
  cloudStorage,
  uploadHistory,
  schedulingControl,
}))
class UploadFileModal extends BaseDisplayModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '上传音频',
      file: '',
    };
  }

  doOtherWhenChangeVisibleToHide = () => {
    this.setState({ file: '' });
  };

  afterFileUploadSuccess = (file, data) => {
    const that = this;

    const { uploadHistoryId } = {
      uploadHistoryId: '',
      ...data,
    };

    that.setState({ file }, () => {
      showInfoMessage({
        text: '上传成功，即将设置文件信息',
        onClose: () => {
          that.add({ uploadHistoryId });
        },
      });
    });
  };

  add = (data) => {
    const { uploadHistoryId } = data;

    addBasicInfoAction({
      target: this,
      handleData: {
        uploadHistoryId: uploadHistoryId || 0,
      },
      successCallback: () => {
        setTimeout(() => {
          UploadFileModal.close();
        }, 400);
      },
    });
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '70px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
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
    const { file } = this.state;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.fileUpload,
              fieldData: {
                label: '选择文件',
                name: 'name',
                helper: '',
              },
              file,
              action: `/uploadHistory/uploadFile`,
              afterUploadSuccess: (fileData, data) => {
                this.afterFileUploadSuccess(fileData, data);
              },
            },
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '上传成功将自动保存, 上传成功后关闭窗口即可。',
        },
      ],
    };
  };
}

export { UploadFileModal };
