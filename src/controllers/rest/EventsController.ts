import { Req, Request, Res, Response } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";
import { EventService } from "src/services/EventService";

@Controller("/events")
export class EventsController {
  constructor(private eventService: EventService) {}

  @Get("/")
  get(@Req() req: Request, @Res() res: Response): void {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    res.write(`data: ${JSON.stringify({ status: "connected to live updates" })}\n\n`);
    res.write(`data: ${JSON.stringify({ message: "second update" })}\n\n`);

    setTimeout(() => {
      res.write(`data: ${JSON.stringify({ message: "new message" })}`);
    }, 1000);

    const todoUpdates = this.eventService
      .onTodoReceived()
      .subscribe((todo) => res.write(`data: ${JSON.stringify(todo)}/n/n`));

    res.flushHeaders();
    res.flush();

    req.on("close", () => {
      todoUpdates.unsubscribe();
    });
  }
}
