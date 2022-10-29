import { Controller } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { BodyParams, PathParams } from "@tsed/platform-params";
import { Delete, Description, Get, Post, Put, Returns } from "@tsed/schema";
import { TodoModel } from "src/models/TodoModel";
import { TodoService } from "src/services/TodoService";

@Controller("/todos")
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @Description("Get all todos.")
  @Returns(200, TodoModel)
  async getAll(): Promise<TodoModel[]> {
    return await this.todoService.getAll();
  }

  @Get("/:id")
  @Description("Gets one todo item by it's ID.")
  @Returns(200, TodoModel)
  @Returns(404)
  async getById(@PathParams("id") id: string): Promise<TodoModel> {
    console.log(id);
    const todo = await this.todoService.getById(id);

    if (!todo) throw new NotFound("Todo item does not exist");

    return todo;
  }

  @Post()
  @Description("Creates a new todo item.")
  @Returns(201, TodoModel)
  async create(@BodyParams() todo: TodoModel): Promise<TodoModel> {
    return await this.todoService.create(todo);
  }

  @Put("/:id")
  @Description("Updates an existing todo.")
  @Returns(200, TodoModel)
  @Returns(404)
  async update(
    @PathParams("id") id: string,
    @BodyParams() todo: TodoModel
  ): Promise<TodoModel> {
    const updatedTodo = await this.todoService.update(id, todo);

    if (!updatedTodo) throw new NotFound("Todo item does not exist");

    return updatedTodo;
  }

  @Delete("/:id")
  @Description("Deletes a todo item.")
  @Returns(200)
  @Returns(404)
  async delete(@PathParams("id") id: string): Promise<TodoModel> {
    const deleted = await this.todoService.delete(id);

    if (!deleted) throw new NotFound("Todo item does not exist");

    return deleted;
  }
}
