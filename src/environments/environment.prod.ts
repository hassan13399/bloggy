export const environment = {
  production: true,
  remoteUrl: 'https://api.bloggyfoot.net',
  sudinfoUrl: 'http://www.sudinfo.be/bloggyfoot',
  websiteUrl: 'https://www.bloggyfoot.net/',
  register: '/user/register',
  // afterSignup: '/prono',
  afterSignup: '/planet',
  afterFbSignup: '/user/profile/fb',
  // afterSignin: '/prono',
  afterSignin: '/planet',
  facebook: {
    appId: '112046302167698',
    xfbml: true,
    version: 'v2.12'
  },
  payment_start: '2021-05-01 14:00:00',
  stripe_key: 'pk_live_t9akJvPM3JXrwSg5k2LOQLLA',
  premium_price: 399,
  competition_start: '2021-06-11 21:00:00'
};
