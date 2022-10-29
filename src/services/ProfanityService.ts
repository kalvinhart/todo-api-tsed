import { Injectable } from "@tsed/di";
import axios from "axios";

export interface ProfanityJSONResponse {
  result: string;
}

export type ProfanityPlainTextResponse = string;

@Injectable()
export class ProfanityService {
  url: string = "https://www.purgomalum.com/service/";

  async checkInput(
    input: string,
    format: "json" | "plain"
  ): Promise<ProfanityJSONResponse | ProfanityPlainTextResponse> {
    const { data } = await axios.get(`${this.url}${format}?text=${input}&add=react`);
    return data;
  }
}
