import { accessWayBusinessCollection } from './custom/accessWayCollection';
import { accessWayInfrastructureCollection } from './general/accessWayCollection';

export const accessWayCollection = {
  ...accessWayInfrastructureCollection,
  ...accessWayBusinessCollection,
};
