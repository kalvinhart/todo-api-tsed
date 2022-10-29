import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { TodoModel } from "src/models/TodoModel";
import { ProfanityJSONResponse, ProfanityService } from "./ProfanityService";

@Injectable()
export class TodoService {
  @Inject(TodoModel)
  private Todo: MongooseModel<TodoModel>;

  constructor(private profanityService: ProfanityService) {}

  async getAll(): Promise<TodoModel[]> {
    return await this.Todo.find();
  }

  async getById(id: string): Promise<TodoModel | null> {
    return await this.Todo.findById(id);
  }

  async create(todo: TodoModel): Promise<TodoModel> {
    todo.text = await this.checkForProfanity(todo.text);

    const newTodo = new this.Todo(todo);

    return await newTodo.save();
  }

  async update(id: string, todo: TodoModel): Promise<TodoModel | null> {
    todo.text = await this.checkForProfanity(todo.text);

    return await this.Todo.findByIdAndUpdate(id, todo, {
      runValidators: true,
      new: true,
    });
  }

  async delete(id: string): Promise<TodoModel | null> {
    return await this.Todo.findByIdAndDelete(id);
  }

  async checkForProfanity(text: string): Promise<string> {
    const profanityCheckResponse: ProfanityJSONResponse =
      (await this.profanityService.checkInput(text, "json")) as ProfanityJSONResponse;

    return profanityCheckResponse.result;
  }
}
