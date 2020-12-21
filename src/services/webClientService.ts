export interface IWebClientService {
  setAuth: (username: string, password: string, secretKey: string) => void;
  fetch: (method: HttpMethod) => Promise<string>;
}

export enum HttpMethod {
  GET,
  POST,
  DELETE,
}

export default class WebClientService implements IWebClientService {
  private endpoint: string;

  private username?: string;
  private password?: string;
  private secretKey?: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  setAuth(username: string, password: string, secretKey: string) {
    this.username = username;
    this.password = password;
    this.secretKey = secretKey;
  }

  async fetch(method: HttpMethod, body?: string) {
    const headers = new Headers();
    this.appendAuthHeaders(headers);

    return await fetch(this.endpoint, {
      method: HttpMethod[method],
      headers: headers,
      body: body,
    })
      .catch((error) => {
        console.error(error);
        const message = "Unknown error: " + error;
        throw Error(message);
      })
      .then(async (response) => {
        return {
          response,
          text: await response.text(),
        };
      })
      .then(({ response, text }) => {
        if (this.unAuthorized(response)) {
          console.error(response + text);
          const message = "Authorization error: " + text;
          throw Error(message);
        } else if (this.unsuccessful(response)) {
          console.error(response + text);
          const message = "Service error: " + text;
          throw Error(message);
        } else {
          return text;
        }
      });
  }

  private unAuthorized(response: Response) {
    return (response && response.status === 401) || response.status === 403;
  }

  private unsuccessful(response: Response) {
    return !response || response.status < 200 || response.status > 299;
  }

  private appendAuthHeaders(headers: Headers) {
    if (!this.username || !this.password)
      throw Error("Username and password must be specified");
    headers.set(
      "Authorization",
      "Basic " + btoa(this.username + ":" + this.password)
    );

    // This is bad, but pretty straightforward and easy
    if (this.secretKey) headers.set("SecretKey", this.secretKey);
  }
}
