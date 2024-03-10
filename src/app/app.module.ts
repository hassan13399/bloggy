import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StFormsModule } from './st-forms/st-forms.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { StRemoteDataService } from './st-forms/st-remote-data.service';
import { StFormService } from './st-forms/st-form.service';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { ReactiveFormsModule } from '@angular/forms';

// locale
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { PlayerComponent } from './player/player.component';
import { TeamComponent } from './team/team.component';
import { DayComponent } from './day/day.component';
import { PronoDefComponent } from './prono-def/prono-def.component';
import { GroupComponent } from './group/group.component';
import { PhaseComponent } from './phase/phase.component';
import { RankingCalculationComponent } from './ranking-calculation/ranking-calculation.component';
import { RankingComponent } from './ranking/ranking.component';
import { StLoginComponent } from './st-user/st-login/st-login.component';
import { StCreateUserComponent } from './st-user/st-create-user/st-create-user.component';
import { StForgotPasswordComponent } from './st-user/st-forgot-password/st-forgot-password.component';
import { StFacebookConnectComponent } from './st-facebook-connect/st-facebook-connect.component';
import { FacebookModule} from 'ngx-facebook';
import { HomeRegisterComponent } from './home-register/home-register.component';
import { HomeNextMatchComponent } from './home-next-match/home-next-match.component';
import { FooterComponent } from './footer/footer.component';
import { PagePronoComponent } from './page-prono/page-prono.component';
import { PronoComponent } from './bloc/prono/prono.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PhaseMenuComponent } from './bloc/phase-menu/phase-menu.component';
import { PointUserComponent } from './bloc/point-user/point-user.component';
import { CountdownComponent } from './bloc/countdown/countdown.component';
import { MainMenuComponent } from './bloc/main-menu/main-menu.component';
import { DayMenuComponent } from './bloc/day-menu/day-menu.component';
import { FlashComponent } from './bloc/flash/flash.component';
import { PageResetPasswordComponent } from './page-reset-password/page-reset-password.component';
import { StResetPasswordComponent } from './st-user/st-reset-password/st-reset-password.component';
import { PageGroupCreateComponent } from './page-group-create/page-group-create.component';
import { PageGroupEditComponent } from './page-group-edit/page-group-edit.component';
import { PageGroupJoinComponent } from './page-group-join/page-group-join.component';
import { PageGroupInviteComponent } from './page-group-invite/page-group-invite.component';
import { PageGroupMyComponent } from './page-group-my/page-group-my.component';
import { PageTopComponent } from './bloc/page-top/page-top.component';
import { StRegisterConfirmComponent } from './st-user/st-register-confirm/st-register-confirm.component';
import { PageTestComponent } from './page-test/page-test.component';
import { PrologueComponent } from './html/prologue/prologue.component';
import { PagePartnerComponent } from './page-partner/page-partner.component';
import { PageHintComponent } from './page-hint/page-hint.component';
import { CmsComponent } from './bloc/cms/cms.component';
import { PagePointsCalculationComponent } from './page-points-calculation/page-points-calculation.component';
import { PageFaqComponent } from './page-faq/page-faq.component';
import { PageBloggyPlanetComponent } from './page-bloggy-planet/page-bloggy-planet.component';
import { PageContactComponent } from './page-contact/page-contact.component';
import { PageRedirectComponent } from './page-redirect/page-redirect.component';
import { StLogoutComponent } from './st-user/st-logout/st-logout.component';
import { PageGeneralComponent } from './page-general/page-general.component';
import { PageFormuleComponent } from './page-formule/page-formule.component';
import { PageTermsComponent } from './page-terms/page-terms.component';
import { PagePrivacyComponent } from './page-privacy/page-privacy.component';
import {PagePaymentComponent} from './page-payment/page-payment.component';
import {DynamicModule} from 'ng-dynamic-component';
import {PaymentButtonComponent} from './bloc/payment-button/payment-button.component';
import {PaymentComponent} from './bloc/payment/payment.component';
import {PagePaymentSuccessComponent} from './page-payment-success/page-payment-success.component';
import { PageGeneralActiveComponent } from './page-general-active/page-general-active.component';
import { Level2MenuComponent } from './bloc/level2-menu/level2-menu.component';
import { PageGroupMyActiveComponent } from './page-group-my-active/page-group-my-active.component';
import {PronoTimerComponent} from './bloc/prono-timer/prono-timer.component';
import {PremiumService} from './services/premium.service';
import {RouterExtensionService} from './services/router.extension.service';
import { PodiumComponent } from './podium/podium.component';

// translation -- AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PlayerComponent,
    TeamComponent,
    DayComponent,
    PronoDefComponent,
    GroupComponent,
    PhaseComponent,
    RankingCalculationComponent,
    RankingComponent,
    StLoginComponent,
    StCreateUserComponent,
    StForgotPasswordComponent,
    StFacebookConnectComponent,
    HomeRegisterComponent,
    HomeNextMatchComponent,
    FooterComponent,
    PagePronoComponent,
    PageHomeComponent,
    PhaseMenuComponent,
    PointUserComponent,
    CountdownComponent,
    MainMenuComponent,
    PronoComponent,
    DayMenuComponent,
    FlashComponent,
    PageResetPasswordComponent,
    StResetPasswordComponent,
    PageGroupCreateComponent,
    PageGroupEditComponent,
    PageGroupJoinComponent,
    PageGroupInviteComponent,
    PageGroupMyComponent,
    PageTopComponent,
    StRegisterConfirmComponent,
    PageTestComponent,
    PrologueComponent,
    PagePartnerComponent,
    PageHintComponent,
    CmsComponent,
    PagePointsCalculationComponent,
    PageFaqComponent,
    PageBloggyPlanetComponent,
    PageContactComponent,
    PageRedirectComponent,
    StLogoutComponent,
    PageGeneralComponent,
    PageFormuleComponent,
    PageTermsComponent,
    PagePrivacyComponent,
    PagePaymentComponent,
    PaymentButtonComponent,
    PaymentComponent,
    PagePaymentSuccessComponent,
    PageGeneralActiveComponent,
    Level2MenuComponent,
    PageGroupMyActiveComponent,
    PagePaymentSuccessComponent,
    PronoTimerComponent,
    PodiumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StFormsModule,
    NgxPaginationModule,
    NgbModule.forRoot(),
    DynamicFormsCoreModule.forRoot(),
    FacebookModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    DynamicModule.withComponents([
      PaymentButtonComponent,
      PaymentComponent
    ])
  ],
  providers: [
    StRemoteDataService,
    StFormService,
    PremiumService,
    RouterExtensionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}