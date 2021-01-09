export interface IFetchService {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
}

export default class FetchService implements IFetchService {
  fetch: (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response> = async (input, init?) => {
    return await fetch(input, init);
  };
}