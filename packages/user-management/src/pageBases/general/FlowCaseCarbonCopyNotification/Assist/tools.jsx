import { flowCaseCarbonCopyNotificationStatusCollection } from '../../../../customConfig';

export function getFlowCaseCarbonCopyNotificationStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case flowCaseCarbonCopyNotificationStatusCollection.success: {
      result = 'success';
      break;
    }

    default: {
      result = 'default';
      break;
    }
  }

  return result;
}
