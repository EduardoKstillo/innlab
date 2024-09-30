import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'my-projects',
    loadChildren: () => import('./user/my-projects/my-projects.module').then( m => m.MyProjectsPageModule)
  },
  {
    path: 'create-project',
    loadChildren: () => import('./user/create-project/create-project.module').then( m => m.CreateProjectPageModule)
  },
  {
    path: 'project-details/:id',
    loadChildren: () => import('./user/project-details/project-details.module').then( m => m.ProjectDetailsPageModule)
  },
  {
    path: 'invite-members',
    loadChildren: () => import('./user/invite-members/invite-members.module').then( m => m.InviteMembersPageModule)
  },
  {
    path: 'all-projects',
    loadChildren: () => import('./moderator/all-projects/all-projects.module').then( m => m.AllProjectsPageModule)
  },
  {
    path: 'moderator-loan-requests',
    loadChildren: () => import('./moderator/moderator-loan-requests/moderator-loan-requests.module').then( m => m.ModeratorLoanRequestsPageModule)
  },
  {
    path: 'loan-request-details/:id',
    loadChildren: () => import('./moderator/loan-request-details/loan-request-details.module').then( m => m.LoanRequestDetailsPageModule)
  },
  {
    path: 'device-list',
    loadChildren: () => import('./admin/device-list/device-list.module').then( m => m.DeviceListPageModule)
  },
  {
    path: 'device-create',
    loadChildren: () => import('./admin/device-create/device-create.module').then( m => m.DeviceCreatePageModule)
  },
  {
    path: 'device-detail/:id',
    loadChildren: () => import('./admin/device-detail/device-detail.module').then( m => m.DeviceDetailPageModule)
  },
  {
    path: 'device-update/:id',
    loadChildren: () => import('./admin/device-update/device-update.module').then( m => m.DeviceUpdatePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./user/profile/profile.module').then( m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
