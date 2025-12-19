import { dashboard, root } from './router.custom.config';
import {
  currentAccount,
  enterprise,
  entrance,
  flow,
  flowCase,
  notFound,
  notice,
  organization,
  permission,
  person,
  result,
  subsidiaryMessages,
} from './router.general.config';

export default [
  entrance,
  root,
  dashboard,
  notice,
  flow,
  flowCase,
  organization,
  subsidiaryMessages,
  enterprise,
  person,
  permission,
  currentAccount,
  result,
  notFound,
];
