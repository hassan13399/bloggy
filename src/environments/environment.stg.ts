// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  remoteUrl: 'https://bloggynode.makemeweb.net',
  sudinfoUrl: 'http://mmw.bmodel/iframe.html',
  websiteUrl: 'https://bloggyfront.stg.makemeweb.net',
  register: '/user/register',
  afterSignup: '/prono',
  afterFbSignup: '/user/profile/fb',
  afterSignin: '/prono',
  facebook: {
    appId: '586596586589396',
    xfbml: true,
    version: 'v2.12'
  },
  payment_start: '2018-06-14 15:00:00',
  stripe_key: 'pk_live_t9akJvPM3JXrwSg5k2LOQLLA',
  premium_price: 399,
  competition_start: '2018-06-13 17:00:00'
};