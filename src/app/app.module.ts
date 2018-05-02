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

/**http client */
import { HttpClientModule, HttpClient  } from '@angular/common/http';

/**translate */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
