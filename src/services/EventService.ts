import { Injectable } from "@tsed/di";
import { Observable, Subject } from "rxjs";
import { TodoModel } from "src/models/TodoModel";

@Injectable()
export class EventService {
  private subject = new Subject<TodoModel>();

  sendTodo(todo: TodoModel) {
    this.subject.next(todo);
  }

  onTodoReceived(): Observable<TodoModel> {
    return this.subject.asObservable();
  }
}
