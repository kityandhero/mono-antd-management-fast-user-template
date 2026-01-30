// 此文件将会从模板库自动更新，请勿改动此文件内容，如需增加或调整，请在tools.custom.jsx中进行。

import { Divider, Space } from 'antd';
import React from 'react';

import { getModelRemoteData } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  datetimeFormat,
  formatDatetime,
  getValueByKey,
  isArray,
  isEmptyArray,
  isEmptyObject,
  isFunction,
  isNull,
  isObject,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';

import { keyValueEditModeCollection } from '../../customConfig';

export function getSexName(value) {
  let result = '未知';

  switch (`${value}`) {
    case '1': {
      result = '男';
      break;
    }

    case '2': {
      result = '女';
      break;
    }

    default: {
      break;
    }
  }

  return result;
}

export function getLogo() {
  const { data } = {
    data: {},
    ...getModelRemoteData('currentAccount'),
  };

  const { platform } = {
    platform: { logo: '' },
    ...data,
  };

  const { logo } = {
    logo: '',
    ...platform,
  };

  return logo;
}

export function getTitle() {
  const { data } = {
    data: {},
    ...getModelRemoteData('currentAccount'),
  };

  const { platform } = {
    platform: { logo: '' },
    ...data,
  };

  const { shortName } = {
    shortName: '',
    ...platform,
  };

  if (checkStringIsNullOrWhiteSpace(shortName)) {
    return '';
  }

  return shortName;
}

export function buildKeyTag(key) {
  return `${key}Tag`;
}

export function buildKeyValueNote({ label, name, helper = '' }) {
  return {
    label: label,
    name: `${name}Note`,
    helper: helper,
  };
}

export function buildKeyValueTag({ label, name, helper = '' }) {
  return {
    label: label,
    name: `${name}Tag`,
    helper: helper,
  };
}

export function buildKeyValueInstruction({ label, name, helper = '' }) {
  return {
    label: label,
    name: `${name}Instruction`,
    helper: helper,
  };
}

function appendFiledHelper({ data, fieldData: f }) {
  let { helper } = {
    helper: '',
    ...f,
  };

  if (checkStringIsNullOrWhiteSpace(helper)) {
    const o = buildKeyValueInstruction(f);

    const { name } = {
      name: '',
      ...o,
    };

    const v = getValueByKey({
      data: data,
      key: name,
    });

    if (!checkStringIsNullOrWhiteSpace(v)) {
      helper = v;
    }
  }

  return { ...f, helper };
}

export function buildInputDisplay({
  handleData,
  fieldData: f,
  hidden = false,
  inputIcon = iconBuilder.read(),
  value = '',
  editMode = keyValueEditModeCollection.string,
}) {
  return {
    lg: 24,
    type: cardConfig.contentItemType.onlyShowInput,
    icon: inputIcon || iconBuilder.read(),
    fieldData: appendFiledHelper({
      data: handleData,
      fieldData: f,
    }),
    value:
      value ||
      getValueByKey({
        data: handleData,
        key: f.name,
        convertBuilder: (v) => {
          let result = v;
          switch (editMode) {
            case keyValueEditModeCollection.time: {
              result = formatDatetime({
                data: v,
                format: datetimeFormat.hourMinute,
                defaultValue: '--',
              });
              break;
            }

            default: {
              result = v;
              break;
            }
          }

          return result;
        },
      }),
    hidden,
  };
}

export function buildInputItem({
  firstLoadSuccess,
  handleData,
  fieldData: f,
  hidden = false,
  inputIcon = iconBuilder.read(),
  icon = iconBuilder.form(),
  text = '更改配置',
  value = '',
  editMode = keyValueEditModeCollection.string,
  // eslint-disable-next-line no-unused-vars
  handleClick: handleClickSimple = ({ fieldData, editMode }) => {},
  extra = null,
}) {
  const extraExist = !(isNull(extra) || isEmptyObject(extra));

  let extraButton = null;

  if (extraExist) {
    const { extraText, extraIcon, extraAction } = {
      extraText: '',
      extraIcon: iconBuilder.form(),
      // eslint-disable-next-line no-unused-vars
      extraAction: ({ fieldData, editMode }) => {},
      ...extra,
    };

    extraButton = buildButton({
      style: {
        border: '0px solid #d9d9d9',
        backgroundColor: '#fafafa',
        height: '30px',
        paddingLeft: '0',
        paddingRight: '0',
      },
      icon: extraIcon,
      text: extraText,
      disabled: !firstLoadSuccess,
      handleClick: () => {
        extraAction({
          fieldData: appendFiledHelper({
            data: handleData,
            fieldData: f,
          }),
          editMode,
        });
      },
    });
  }

  return {
    lg: 24,
    type: cardConfig.contentItemType.onlyShowInput,
    icon: inputIcon || iconBuilder.read(),
    fieldData: appendFiledHelper({
      data: handleData,
      fieldData: f,
    }),
    value:
      value ||
      getValueByKey({
        data: handleData,
        key: f.name,
        convertBuilder: (v) => {
          let result = v;
          switch (editMode) {
            case keyValueEditModeCollection.time: {
              result = formatDatetime({
                data: v,
                format: datetimeFormat.hourMinute,
                defaultValue: '--',
              });
              break;
            }

            default: {
              result = v;
              break;
            }
          }

          return result;
        },
      }),
    hidden,
    innerProps: {
      addonAfter: (
        <Space separator={<Divider orientation="vertical" />}>
          {buildButton({
            style: {
              border: '0px solid #d9d9d9',
              backgroundColor: '#fafafa',
              height: '30px',
              paddingLeft: '0',
              paddingRight: '0',
            },
            icon: icon,
            text: text,
            disabled: !firstLoadSuccess,
            handleClick: () => {
              handleClickSimple({
                fieldData: appendFiledHelper({
                  data: handleData,
                  fieldData: f,
                }),
                editMode,
              });
            },
          })}

          {extraButton}
        </Space>
      ),
    },
  };
}

// arr是原数组，N是想分成多少个
export function splitToGroup(array, size) {
  let result = [];

  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, index + size));
  }

  return result;
}

export function buildOrganizationGraphConfig() {
  return {
    height: 600,
    autoFit: 'view',
    labelField: (o) => {
      return o.name;
    },
    type: 'boxed',
  };
}

/**
 * build upload file data
 * @param {Object} options options
 * @param {string} options.uniqueFlag unique flag
 * @param {string} options.name file name
 * @param {string} options.url file url
 * @param {Function} options.adjustCallback adjust data callback, must be function and return object
 * @returns upload file data
 */
export function buildUploadFileData({
  uniqueFlag,
  name = '',
  url,
  adjustCallback = null,
}) {
  let data = {
    uid: uniqueFlag,
    name: name ?? '',
    status: 'done',
    url: url,
  };

  if (isFunction(adjustCallback)) {
    const dataAdjust = adjustCallback(data);

    if (isObject(dataAdjust)) {
      data = dataAdjust;
    }
  }

  return data;
}

/**
 * 获取指定元数据首项值
 * @param {*} list 指定的元数据项集合
 * @returns 元数据首项值
 */
export function getTargetMetaDataFirstFlag(list) {
  if (!isArray(list) || isEmptyArray(list)) {
    return null;
  }

  const first = list[0];

  const { flag } = {
    flag: '',
    ...first,
  };

  return flag || '';
}
