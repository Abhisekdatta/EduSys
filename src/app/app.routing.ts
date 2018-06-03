import { RoleGuard } from './authentication/guard/role.guard';
import { AuthenticationGuard } from './authentication/guard/authentication.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';

const routes: Routes = [
  //{path: '', redirectTo: 'apps/navigation', pathMatch: 'full'},
  {path: '', redirectTo: 'sigin', pathMatch: 'full'},
  {path: 'home', loadChildren: './home/home.module#HomeModule'},
  {path: 'sigin', component: SigninComponent},
  {path: 'sigup', component: SignupComponent},
  {
    path: '', component: AdminComponent, children: [
    {
      path: 'apps/navigation', 
      loadChildren: './navigation/navigation.module#NavigationModule',
      canActivate: [AuthenticationGuard,RoleGuard],
      data: { roles : ['ROLE_ADMIN'] }
    },
    {
      path: 'entityManagement', 
      loadChildren: './entity/entity.module#EntityModule',
      canActivate: [AuthenticationGuard,RoleGuard],
      data: { roles : ['ROLE_SUPER_ADMIN'] }
    },
    {
      path: 'hrms', 
      loadChildren: './modules/management/management.module#ManagementModule',
      canActivate: [AuthenticationGuard,RoleGuard],
      data: { roles : ['ROLE_ADMIN'] }
    },
    {
      path: 'course', 
      loadChildren: './course/course.module#CourseModule',
      canActivate: [AuthenticationGuard,RoleGuard],
      data: { roles : ['ROLE_ADMIN'] }
    },
    {path: 'apps/chats', loadChildren: './chats/chats.module#ChatsModule'},
   // {path: 'apps/mail', loadChildren: './mail/mail.module#MailModule'},
  //  {path: 'apps/todo/:filter', loadChildren: './todo/todo.module#TodoModule'},
  //  {path: 'tables', loadChildren: './tables/tables.module#TablesModule'},
  //  {path: 'forms', loadChildren: './forms/forms.module#FormModule'},
    {path: 'materials', loadChildren: './materials/materials.module#MaterialsModule'},
    {path: 'pages', loadChildren: './pages/pages.module#PagesModule'},
    {path: 'components/chart', loadChildren: './chart/chart.module#ChartModule'},
   // {path: 'analysis', loadChildren: './analysis/analysis.module#AnalysisModule'},
    //{path: 'crm', loadChildren: './crm/crm.module#CrmModule'},
    //{path: 'apm', loadChildren: './apm/apm.module#ApmModule'}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
