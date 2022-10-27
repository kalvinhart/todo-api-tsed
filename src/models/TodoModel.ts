import { Model, ObjectID } from "@tsed/mongoose";
import { Default, Required } from "@tsed/schema";
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
  @ObjectID("id")
  _id: string;

  @Required()
  text: string;

  @Default(false)
  completed: boolean;
}
