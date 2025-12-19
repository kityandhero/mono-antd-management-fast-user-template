import { connect } from 'easy-soft-dva';
import { showInfoMessage } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { addBasicInfoAction } from '../Assist/action';

const { BaseDisplayModal } = DataModal;

const visibleFlag = '2d07f3123aca450e9b7badc1c69cca5c';

@connect(({ cloudStorage, uploadHistory, schedulingControl }) => ({
  cloudStorage,
  uploadHistory,
  schedulingControl,
}))
class UploadImageModal extends BaseDisplayModal {
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
      pageTitle: '上传图片',
      image: '',
    };
  }

  doOtherWhenChangeVisibleToHide = () => {
    this.setState({ image: '' });
  };

  afterImageUploadSuccess = (image, data) => {
    const that = this;

    const { uploadHistoryId } = {
      uploadHistoryId: '',
      ...data,
    };

    that.setState({ image }, () => {
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
          UploadImageModal.close();
        }, 400);
      },
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
    const { image } = this.state;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              image,
              uploadProps: {
                singleMode: {
                  width: '100%',
                  emptyImage: '',
                },
              },
              action: `/uploadHistory/uploadImage`,
              afterUploadSuccess: (imageData, data) => {
                this.afterImageUploadSuccess(imageData, data);
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

export { UploadImageModal };
