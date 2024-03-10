import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  // // Add stripe with correct key depending on env
  // document.write(
  //   '<script type="text/javascript">' +
  //   'var stripe = Stripe(' + environment.stripe_key + ');' +
  //   'var elements = stripe.elements();' +
  //   '</script>'
  // );
} else {

}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

