import { IAuthorizedWebClientService } from "../../services/authorizedWebClientService";
import { IFetchService } from "../../services/fetchService";

export const authorizedWebClientServiceMock = (body?: string) => {
  let serviceMock = {} as IAuthorizedWebClientService;
  serviceMock.fetch = () => Promise.resolve(body ?? "");
  return serviceMock;
}

export const fetchMock = (status: number, body?: string) => {
  let fetchMock = {} as IFetchService;
  let response = new Response(body, { status });
  fetchMock.fetch = () => Promise.resolve(response);
  return fetchMock;
}