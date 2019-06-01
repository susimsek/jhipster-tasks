import { NgModule } from '@angular/core';

import { TasksSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [TasksSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [TasksSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class TasksSharedCommonModule {}
