// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  remoteUrl: 'http://localhost:3000',
  sudinfoUrl: 'http://mmw.bmodel/iframe.html',
  websiteUrl: 'http://localhost:4200/',
  register: '/user/register',
  // afterSignup: '/prono',
  afterSignup: '/planet',
  afterFbSignup: '/user/profile/fb',
  // afterSignin: '/prono',
  afterSignin: '/planet',
  facebook: {
    appId: '783421805189278',
    xfbml: true,
    version: 'v2.12'
  },
  payment_start: '2021-05-01 14:00:00',
  premium_price: 10,
  stripe_key: 'pk_test_BaIAQQTsp1KfJWOr2LyXQBKm',
  competition_start: '2021-06-05 21:00:00'
};
