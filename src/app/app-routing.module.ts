import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TeamComponent } from './team/team.component';
import { PlayerComponent } from './player/player.component';
import { PronoDefComponent } from './prono-def/prono-def.component';
import { DayComponent } from './day/day.component';
import { PhaseComponent } from './phase/phase.component';
import { GroupComponent } from './group/group.component';
import { StLoginComponent } from './st-user/st-login/st-login.component';
import { StLogoutComponent } from './st-user/st-logout/st-logout.component';
import { StCreateUserComponent} from './st-user/st-create-user/st-create-user.component';
import { StRegisterConfirmComponent} from './st-user/st-register-confirm/st-register-confirm.component';
import { PagePronoComponent} from './page-prono/page-prono.component';
import { PageHomeComponent} from './page-home/page-home.component';
import { PageResetPasswordComponent } from './page-reset-password/page-reset-password.component';
import { PageGroupCreateComponent } from './page-group-create/page-group-create.component';
import { PageGroupEditComponent } from './page-group-edit/page-group-edit.component';
import { PageGroupInviteComponent } from './page-group-invite/page-group-invite.component';
import { PageGroupJoinComponent } from './page-group-join/page-group-join.component';
import { PageGroupMyComponent } from './page-group-my/page-group-my.component';
import { PageGroupMyActiveComponent } from './page-group-my-active/page-group-my-active.component';
import { PageHintComponent } from './page-hint/page-hint.component';
import { PagePartnerComponent } from './page-partner/page-partner.component';
import { PageGeneralComponent } from './page-general/page-general.component';
import { PageGeneralActiveComponent } from './page-general-active/page-general-active.component';
import { PageFaqComponent } from './page-faq/page-faq.component';
import { PageBloggyPlanetComponent } from './page-bloggy-planet/page-bloggy-planet.component';
import { PageContactComponent } from './page-contact/page-contact.component';
import { PagePointsCalculationComponent } from './page-points-calculation/page-points-calculation.component';
import { PageFormuleComponent } from './page-formule/page-formule.component';
import { PageTestComponent } from './page-test/page-test.component';
import { PrologueComponent } from './html/prologue/prologue.component';
import { PageRedirectComponent } from './page-redirect/page-redirect.component';
import { PageTermsComponent } from './page-terms/page-terms.component';
import { PagePrivacyComponent } from './page-privacy/page-privacy.component';
import { StGuardService } from './st-forms/st-guard.service';
import {PagePaymentComponent} from './page-payment/page-payment.component';
import {PagePaymentSuccessComponent} from './page-payment-success/page-payment-success.component';

const routes: Routes = [
  {
    path: 'prono',
    component: PagePronoComponent
  },
  {
    path: 'prono/:userId',
    component: PagePronoComponent
  },
  {
    path: 'pronoDef',
    component: PronoDefComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'day',
    component: DayComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'phase',
    component: PhaseComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'player',
    component: PlayerComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'team',
    component: TeamComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'group',
    component: GroupComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'login',
    component: StLoginComponent
  },
  {
    path: 'logout',
    component: StLogoutComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'user/register',
    component: StCreateUserComponent
  },
  {
    path: 'user/confirm/:code',
    component: StRegisterConfirmComponent
  },
  {
    path: 'user/profile',
    component: StCreateUserComponent
  },
  {
    path: 'user/profile/fb',
    component: StCreateUserComponent
  },
  {
    path: 'redirect/:redirect/:data',
    component: PageRedirectComponent
  },
  {
    path: 'userResetPassword/:code',
    component: PageResetPasswordComponent
  },
  {
    path: 'group/create',
    component: PageGroupCreateComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'group/edit',
    component: PageGroupEditComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'group/edit/:id',
    component: PageGroupCreateComponent
  },
  {
    path: 'group/invite',
    component: PageGroupInviteComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'group/join',
    component: PageGroupJoinComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'group/my',
    component: PageGroupMyComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'group/my-active',
    component: PageGroupMyActiveComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'group/my/:id',
    component: PageGroupMyComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'hint',
    component: PageHintComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'general',
    component: PageGeneralComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'general-active',
    component: PageGeneralActiveComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'terms',
    component: PageTermsComponent
  },
  {
    path: 'privacy',
    component: PagePrivacyComponent
  },
  {
    path: 'faq',
    component: PageFaqComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'points/calculation',
    component: PagePointsCalculationComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'planet',
    component: PageBloggyPlanetComponent
  },
  {
    path: 'formules',
    component: PageFormuleComponent
  },
  {
    path: 'contact',
    component: PageContactComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'partner',
    component: PagePartnerComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'test',
    component: PageTestComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'html/prologue',
    component: PrologueComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'sudinfo',
    data: {source: 'sudinfo'},
    component: PageHomeComponent
  },
  {
    path: 'home',
    component: PageHomeComponent
  },
  {
    path: 'premium/payment',
    component: PagePaymentComponent,
    canActivate: [StGuardService]
  },
  {
    path: 'premium/payment/success',
    component: PagePaymentSuccessComponent,
    canActivate: [StGuardService]
  },
  {
    path: '',
    // component: PageHomeComponent,
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
