import {
  buildModel as buildCurrentAccountModel,
  currentAccountTypeCollection,
} from './currentAccount';
import {
  buildModel as buildMetaDataModel,
  metaDataTypeCollection,
} from './metaData';

export const modelTypeCollection = {
  currentAccountTypeCollection,
  metaDataTypeCollection,
};

export function listModelBuilder() {
  const list = [];

  list.push(buildCurrentAccountModel, buildMetaDataModel);

  return list;
}
