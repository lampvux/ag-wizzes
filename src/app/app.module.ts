/** module */
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
// firebase module
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// part module
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/guard/auth.guard';
/** component */
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    AngularFireAuthModule,
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    ComponentsModule,
    NgbModule.forRoot(),
    RouterModule,

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
