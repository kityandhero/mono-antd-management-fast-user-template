import { headScripts as headScriptsSource } from './extraScript.development';

const corsTargetDomain = 'http://user.api.oa.local.com';
// const corsTargetDomain = 'http://user.api.oa.32306.net';
// const corsTargetDomain = 'http://test.api.oa.32306.net';

const headScripts = [
  ...headScriptsSource,
  {
    src: `${corsTargetDomain}/interactionConfig/initRemote.js`,
  },
  {
    src: `${corsTargetDomain}/interactionDynamicConfig/officeAutomationManagementConfig.js`,
  },
];

const config = {
  favicons: [`${corsTargetDomain}/assists/image/favicon.ico`],
  headScripts,
};

export { config };
