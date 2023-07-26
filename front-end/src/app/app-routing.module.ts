import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListUsersComponent } from './components/list-users/list-users.component';
import { AddEditUsersComponent } from './components/add-edit-users/add-edit-users.component';

const routes: Routes = [
  { path: '', component: ListUsersComponent },
  { path: 'add', component: AddEditUsersComponent },
  { path: 'edit/:id', component: AddEditUsersComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
