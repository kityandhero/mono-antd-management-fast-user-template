import {
  currentAccount,
  dashboard,
  enterprise,
  flow,
  flowCase,
  notice,
  organization,
  permission,
  person,
  root,
  subsidiaryMessages,
} from './router.custom.config';
import { entrance, notFound, result } from './router.general.config';

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
