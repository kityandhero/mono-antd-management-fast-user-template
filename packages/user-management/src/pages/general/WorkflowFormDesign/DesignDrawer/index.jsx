import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
  isArray,
  isEmptyArray,
  isEmptyObject,
  isFunction,
} from 'easy-soft-utility';

import { Playground } from 'antd-management-fast-design-playground';
import {
  ArrayCards,
  ArrayTable,
  Card,
  Cascader,
  Checkbox,
  DatePicker,
  Field,
  Form,
  FormCollapse,
  FormGrid,
  FormLayout,
  FormTab,
  Input,
  NumberPicker,
  ObjectContainer,
  Password,
  Radio,
  Rate,
  Select,
  Slider,
  Space,
  Switch,
  Text,
  TimePicker,
  Transfer,
  TreeSelect,
  // Upload,
} from 'antd-management-fast-formily';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = '252334568e6a4f4fafd462d059a57425';

function analysisEnumProperty(enumList) {
  if (!isArray(enumList) || isEmptyArray(enumList)) {
    return [];
  }

  return enumList.map((o) => {
    const { label, value } = {
      label: '',
      value: '',
      ...o,
    };

    return { label, value };
  });
}

@connect(({ workflowFormDesign, schedulingControl }) => ({
  workflowFormDesign,
  schedulingControl,
}))
class DesignDrawer extends BaseUpdateDrawer {
  destroyOnClose = true;

  resetDataAfterLoad = false;

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
      showBottomBar: false,
      loadApiPath:
        modelTypeCollection.workflowFormDesignTypeCollection.getByWorkflow,
      submitApiPath:
        modelTypeCollection.workflowFormDesignTypeCollection.updateBasicInfo,
      width: '100vw',
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

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
    });

    return d;
  };

  adjustHeaderStyle = () => {
    return {
      display: 'none',
    };
  };

  save = (data) => {
    const { afterSave } = this.props;
    const { metaData } = this.state;

    const workflowFormDesignId = getValueByKey({
      data: metaData,
      key: fieldData.workflowFormDesignId.name,
    });

    const {
      schema: { properties },
    } = {
      form: {},
      schema: {},
      ...(checkStringIsNullOrWhiteSpace(data) ? {} : JSON.parse(data)),
    };

    const dataSchema = [];

    for (const [key, value] of Object.entries(properties)) {
      const {
        title,
        type,
        name,
        enum: enumList,
      } = {
        title: '',
        name: key,
        enum: [],
        ...value,
      };

      let items = [];

      if (type === 'array') {
        const {
          items: { properties: itemProperties },
        } = value;

        for (const item of Object.values(itemProperties)) {
          const {
            title: itemTitle,
            width: itemWidth = 0,
            align: itemAlign = 'left',
          } = item['x-component-props'];

          const isEditColumn = (item['x-pattern'] || '') === 'editable';

          if (isEditColumn) {
            continue;
          }

          let innerKey = '';
          let innerValue = {};

          for (const [itemInnerKey, itemInnerValue] of Object.entries(
            item['properties'],
          )) {
            const { type } = itemInnerValue;

            if (type === 'void') {
              continue;
            }

            if (innerKey === '') {
              innerKey = itemInnerKey;
              innerValue = itemInnerValue;
            } else {
              break;
            }
          }

          if (isEmptyObject(innerValue)) {
            continue;
          }

          const { type: innerType, enum: innerEnumList } = {
            enum: [],
            ...innerValue,
          };

          items.push({
            name: innerKey,
            title: itemTitle,
            width: itemWidth,
            align: itemAlign,
            type: innerType,
            enumList: analysisEnumProperty(innerEnumList),
          });
        }
      }

      const l = analysisEnumProperty(enumList);

      dataSchema.push({ title, type, name, enumList: l, items });
    }

    this.execSubmitApi({
      values: {
        workflowFormDesignId,
        designSchema: data,
        dataSchema: JSON.stringify(dataSchema),
      },
      successCallback: () => {
        if (isFunction(afterSave)) {
          afterSave();
        }
      },
    });
  };

  renderPresetTitle = () => {
    return '表单设计';
  };

  renderPresetContentContainorInner = () => {
    return (
      <Playground
        inputs={[
          Input,
          Password,
          NumberPicker,
          Rate,
          Slider,
          Select,
          TreeSelect,
          Cascader,
          Transfer,
          Checkbox,
          Radio,
          DatePicker,
          TimePicker,
          // Upload,
          Switch,
          ObjectContainer,
        ]}
        layouts={[Card, FormGrid, FormTab, FormLayout, FormCollapse, Space]}
        arrays={[ArrayCards, ArrayTable]}
        displays={[Text]}
        widgetComponents={{
          Form,
          Field,
          Input,
          Select,
          TreeSelect,
          Cascader,
          Radio,
          Checkbox,
          Slider,
          Rate,
          NumberPicker,
          Transfer,
          Password,
          DatePicker,
          TimePicker,
          // Upload,
          Switch,
          Text,
          Card,
          ArrayCards,
          ArrayTable,
          Space,
          FormTab,
          FormCollapse,
          FormGrid,
          FormLayout,
          ObjectContainer,
        }}
        onClose={() => {
          DesignDrawer.close();
        }}
        afterLocalSave={(data) => {
          this.save(data);
        }}
      />
    );
  };
}

export { DesignDrawer };
