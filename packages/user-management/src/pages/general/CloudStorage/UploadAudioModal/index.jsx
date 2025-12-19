import { connect } from 'easy-soft-dva';
import { showInfoMessage } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { addBasicInfoAction } from '../Assist/action';

const { BaseDisplayModal } = DataModal;

const visibleFlag = 'a1734716b49e4aab9b13dabd9294cc1f';

@connect(({ cloudStorage, uploadHistory, schedulingControl }) => ({
  cloudStorage,
  uploadHistory,
  schedulingControl,
}))
class UploadAudioModal extends BaseDisplayModal {
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
      audio: '',
    };
  }

  doOtherWhenChangeVisibleToHide = () => {
    this.setState({ audio: '' });
  };

  afterAudioUploadSuccess = (audio, data) => {
    const that = this;

    const { uploadHistoryId } = {
      uploadHistoryId: '',
      ...data,
    };

    that.setState({ audio }, () => {
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
          UploadAudioModal.close();
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
    const { audio } = this.state;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.audioUpload,
              fieldData: {
                label: '选择音频',
                name: 'name',
                helper: '',
              },
              audio,
              action: `/uploadHistory/uploadAudio`,
              afterUploadSuccess: (audioData, data) => {
                this.afterAudioUploadSuccess(audioData, data);
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

export { UploadAudioModal };
