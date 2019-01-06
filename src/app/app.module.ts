import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertsModule } from 'angular-alert-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './shared/user.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageService } from './image/image.service';
import { ImageDetailComponent } from './image/image-detail/image-detail.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { NavbarComponent } from './navbar/navbar.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { from } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgBootstrapFormValidationModule,
  CUSTOM_ERROR_MESSAGES
} from "ng-bootstrap-form-validation";

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    GalleryComponent,
    ImageDetailComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AlertsModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    CarouselModule.forRoot(),
    NgbModule,
    Ng2CarouselamosModule,
    ImageCropperModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
  ],
  providers: [UserService, AuthGuard, ImageService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
