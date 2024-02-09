import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MessagingComponent} from './messaging/messaging.component';

import {AuthGuard} from './auth.guard';


import {UnauthGuard} from './unauth.guard';


const routes: Routes = [


  {path: 'messaging/:id', component: MessagingComponent, canActivate: [AuthGuard]},

  {
    path: 'settings',
    loadChildren: () => import('./profile/user-settings/user-settings.module').then(m => m.UserSettingsModule),
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./awsauth/aws-auth.module').then(m => m.AwsAuthModule), pathMatch: 'full', canActivate: [UnauthGuard]
  },

  {path: 'feed', loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule)},
  {path: '', loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule), pathMatch: 'full'},


  {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard]},

  {path: 'user-profile', loadChildren: () => import('./profile/profile-view/profile-view.module').then(m => m.ProfileViewModule)},

  {
    path: 'responds',
    loadChildren: () => import('./post/respond/post-responds.module').then(m => m.PostRespondsModule),
    canActivate: [AuthGuard]
  },

  {path: 'post', loadChildren: () => import('./post/post-view/post-view.module').then(m => m.PostViewModule)},

  {
    path: 'edit-article',
    loadChildren: () => import('./post/article/edit-article/edit-article.module').then(m => m.EditArticleModule),
    canActivate: [AuthGuard]
  },

  {path: 'article', loadChildren: () => import('./post/article/article-view/article-view.module').then(m => m.ArticleViewModule)},

  {
    path: 'requests',
    loadChildren: () => import('./supply-request/supply-requests-view/supply-requests-view.module').then(m => m.SupplyRequestsViewModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'manage-company',
    loadChildren: () => import('./company/user-company/user-company.module').then(m => m.UserCompanyModule),
    canActivate: [AuthGuard]
  },


  {path: 'companies', loadChildren: () => import('./company/companies-search/companies-search.module').then(m => m.CompaniesSearchModule)},


  {
    path: 'company-admin', loadChildren: () => import('./company/company-admin/company-admin.module').then(m => m.CompanyAdminModule),
    canActivate: [AuthGuard]
  },


  {path: 'company', loadChildren: () => import('./company/company-view/company-view.module').then(m => m.CompanyViewModule)},


  {
    path: 'communities',
    loadChildren: () => import('./community/communities-home/communities-home.module').then(m => m.CommunitiesHomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-community',
    loadChildren: () => import('./community/community-admin/community-admin.module').then(m => m.CommunityAdminModule),
    canActivate: [AuthGuard]
  },


  {
    path: 'community', loadChildren: () => import('./community/community.module').then(m => m.CommunityModule),
    canActivate: [AuthGuard]
  },


  {
    path: 'product-admin', loadChildren: () => import('./product/product-admin/product-admin.module').then(m => m.ProductAdminModule),
    canActivate: [AuthGuard]
  },


  {path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},

  {path: 'product', loadChildren: () => import('./product/product-view/product-view.module').then(m => m.ProductViewModule)},


  {path: 'hashtag', loadChildren: () => import('./tag/tag.module').then(m => m.TagModule)},


  {path: 'keyword', loadChildren: () => import('./search-keyword/search-keyword.module').then(m => m.SearchKeywordModule)},


  {
    path: 'document',
    loadChildren: () => import('./general/show-document/show-document.module').then(m => m.ShowDocumentModule)
  },


  {
    path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule),
    canActivate: [AuthGuard]
  },


  {path: 'login', loadChildren: () => import('./awsauth/login/login.module').then(m => m.LoginModule)},


  {
    path: 'payment-accounts',
    loadChildren: () => import('./promotion/payment-accounts/payment-accounts.module').then(m => m.PaymentAccountsModule),
    canActivate: [AuthGuard]
  },


  {
    path: 'promotion', loadChildren: () => import('./promotion/promotion.module').then(m => m.PromotionModule),
    canActivate: [AuthGuard]
  },


  { path: 'account-details', loadChildren: () => import('./promotion/account-details/account-details.module').then(m => m.AccountDetailsModule) },


  // otherwise redirect to home
  // {path: '**', redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
