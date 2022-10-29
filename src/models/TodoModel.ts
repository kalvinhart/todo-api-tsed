import { Model, ObjectID } from "@tsed/mongoose";
import { Default, Name, Required } from "@tsed/schema";
/**
 * ## How to inject model?
 *
 * ```typescript
 * import { MongooseModel } from "@tsed/mongoose";
 * import { Injectable, Inject } from "@tsed/di";
 *
 * @Injectable()
 * class MyService {
 *   @Inject(todos)
 *   model: MongooseModel<todos>;
 * }
 * ```
 */
@Model({
  name: "todos",
})
export class TodoModel {
  @Name("id")
  @ObjectID("id")
  _id: string;

  @Required()
  text: string;

  @Default(false)
  completed: boolean;
}
