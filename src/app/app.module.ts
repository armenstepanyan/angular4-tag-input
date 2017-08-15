import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomTagsInputComponent } from './custom-tags-input/custom-tags-input.component';
import { TagItemComponent } from './custom-tags-input/tag-item/tag-item.component';
import { TagsService } from './tags.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomTagsInputComponent,
    TagItemComponent

  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TagsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
