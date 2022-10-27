import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { TodoModel } from "src/models/TodoModel";

@Injectable()
export class TodoService {
  @Inject(TodoModel)
  private Todo: MongooseModel<TodoModel>;

  async getAll(): Promise<TodoModel[]> {
    return await this.Todo.find();
  }

  async getById(id: string): Promise<TodoModel | null> {
    return await this.Todo.findById(id);
  }

  async create(todo: TodoModel): Promise<TodoModel> {
    const newTodo = new this.Todo(todo);

    return await newTodo.save();
  }

  async update(todo: TodoModel): Promise<TodoModel | null> {
    return await this.Todo.findByIdAndUpdate(todo._id, todo, {
      runValidators: true,
      new: true,
    });
  }

  async delete(id: string): Promise<void | null> {
    return await this.Todo.findByIdAndDelete(id);
  }
}
