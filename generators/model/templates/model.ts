import { MetaModel } from "./Meta.model";

export class <%= modelClass %> {

  <% for (let prop of properties) {%>
    <% if (prop === 'id') {%>
      private _id: string;
    <%} else {%>
      @MetaModel.labelKey("<%= prop %>")
      private _<%= prop %>: string;
      <%}
  } %>

  [prop: string]: any;

constructor(<% properties.forEach(function (prop, index) { %> <% if (index === properties.length - 1) {%> <%= prop %>: string <%} else {%> <%= prop %>: string, <% }}) %>) {
    <% for (let prop of properties) {%>
      this._<%= prop %>= <%= prop %>;
      <% } %>
  }

  <% for (let prop of properties) {%>
    <% if (prop === 'id') {%>
      get id() {
        return this._id;
      }
    <%} else {%>
      get <%= prop %>() {
        return this._<%= prop %>;
      }
      set <%= prop %>(<%= prop %>: string) {
        this._<%= prop %>= <%= prop %>;
      }
  <% }} %>
}
