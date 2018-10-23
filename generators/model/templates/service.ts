import axios from "axios";
import { <%= modelClass %> } from "models/<%= modelClass %>.model";


export interface <%= modelClass %>JSON {
  <% for (let prop of properties) {%>
    <%= prop %>: string;
  <% } %>
  [key: string]: any;
}

export class <%= modelClass %>sService {
  static url = "";

  static async get<%= modelClass %>s(ssr: boolean = false) {
    const resp = await axios.get(`${<%= modelClass %>sService.url}`);
    if (ssr) {
      return resp.data;
    }
    return resp.data.map(<%= modelClass %>sService.to<%= modelClass %>);
  }

  static async get<%= modelClass %>(id: string, ssr: boolean = false) {
    const resp = await axios.get(`${ <%= modelClass %>sService.url}/${id}`);
    if (ssr) {
      return resp.data;
    }
    return <%= modelClass %>sService.to<%= modelClass %>(resp.data);
  }

  static async update<%= modelClass %>(<%= model%>: <%= modelClass %>) {
  const { data } = await axios.put<<%= modelClass %>JSON>(
    `${<%= modelClass %>sService.url}/${<%= model%>.id}`,
      <%= model %>.flatten()
  );
  return data;
}

  static async new<%= modelClass %>(<%= model %>: <%= modelClass %>) {
  const { data } = await axios.post<<%= modelClass %>JSON>(
    `${<%= modelClass %>sService.url}`,
      <%= model %>.flatten()
    );
    return data;
  }

    static to<%= modelClass %>(<%= model %>: <%= modelClass %>JSON) {
    return new <%= modelClass %>(
      <% properties.forEach(function (prop, index) { %>
          <% if (index === properties.length -1) {%>
            <%= model %>.<%= prop %>
          <%} else {%>
            <%= model %>.<%= prop %>,
      <% }}) %>
    );
  }
}
