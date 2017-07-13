/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  NgaThemeModule,
  NgaSidebarModule,
  NgaCardModule,
  NgaLayoutModule,
  NgaMenuModule,
} from '@akveo/nga-theme';
import { NgdAppComponent } from './app.component';
import { routes } from './app.routes';
import { ReactHomepageComponent } from './homepage/homepage.component';
import { DocsService } from './docs/docs.service';
import { NgdDocsComponent } from './docs/docs.component';
import { NgdPageComponent } from './docs/page/page.component';
import { NgdMarkdownComponent } from './docs/page/blocks/ngd-markdown-block.component';
import { NgdDescriptionBlockComponent } from './docs/page/blocks/ngd-description-block.component';
import { NgdExamplesBlockComponent } from './docs/page/blocks/ngd-examples-block.component';
import { NgdPropsBlockComponent } from './docs/page/blocks/ngd-props-block.component';
import { NgdMethodsBlockComponent } from './docs/page/blocks/ngd-methods-block.component';
import { NgdDescriptionDirective } from './docs/utils/ngd-description.directive';

import { NgdHighlighterComponent } from './docs/utils/code-highlighter.component';
import { NgdHeaderComponent } from './components/header/ngd-header.component';
import { ReactFooterComponent } from './components/footer/ngd-footer.component';


// import { ReactDemoPhoneComponent } from './docs/page/blocks/react-demo-phone.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgaThemeModule,
    NgaSidebarModule,
    NgaCardModule,
    NgaLayoutModule,
    NgaMenuModule.forRoot(),
    NgaThemeModule.forRoot({ name: 'default' }),
    NgaSidebarModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),

  ],
  declarations: [
    NgdAppComponent,
    ReactHomepageComponent,
    NgdDocsComponent,
    NgdPageComponent,
    NgdMarkdownComponent,
    NgdDescriptionBlockComponent,
    NgdExamplesBlockComponent,
    NgdPropsBlockComponent,
    NgdMethodsBlockComponent,
    NgdDescriptionDirective,
    NgdHighlighterComponent,
    NgdHeaderComponent,
    ReactFooterComponent,

  ],
  providers: [
    DocsService,
    Title
  ],
  entryComponents: [
  ],
  bootstrap: [NgdAppComponent],
})
export class AppModule {
}
