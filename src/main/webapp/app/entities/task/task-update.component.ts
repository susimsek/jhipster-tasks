import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITask, Task } from 'app/shared/model/task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'jhi-task-update',
  templateUrl: './task-update.component.html'
})
export class TaskUpdateComponent implements OnInit {
  task: ITask;
  isSaving: boolean;
  dueDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    dueDate: [null, [Validators.required]],
    completed: [null, [Validators.required]]
  });

  constructor(protected taskService: TaskService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ task }) => {
      this.updateForm(task);
      this.task = task;
    });
  }

  updateForm(task: ITask) {
    this.editForm.patchValue({
      id: task.id,
      name: task.name,
      dueDate: task.dueDate,
      completed: task.completed
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const task = this.createFromForm();
    if (task.id !== undefined) {
      this.subscribeToSaveResponse(this.taskService.update(task));
    } else {
      this.subscribeToSaveResponse(this.taskService.create(task));
    }
  }

  private createFromForm(): ITask {
    const entity = {
      ...new Task(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      dueDate: this.editForm.get(['dueDate']).value,
      completed: this.editForm.get(['completed']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>) {
    result.subscribe((res: HttpResponse<ITask>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
