import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageDetailComponent } from './image/image-detail/image-detail.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const appRoutes : Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'notfound', component: NotFoundComponent },
    { path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthGuard]},
    { path: 'contacts', component: ContactsComponent},
    { path: 'gallery/:id', component: GalleryComponent, canActivate:[AuthGuard], data: { roles: ['Users', 'Administrators'] }},
    { path: 'gallery/image/:id', component: ImageDetailComponent, canActivate:[AuthGuard], data: { roles: ['Users', 'Administrators'] }},
    { path: 'adminPanel', component: AdminPanelComponent, canActivate: [AuthGuard] , data: { roles: ['Administrators'] }},
    { path: 'signin', component: UserComponent },
    { 
        path : '', redirectTo: '/home', 
        pathMatch: 'full'
    }
];