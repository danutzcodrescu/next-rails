import axios from "axios";
import { vat } from "models/Vat.model";


export class VatService {
  static url = "";

  static async get Vats(ssr: boolean = false) {
    const resp = await axios.get(`${VatService.url}`);
    if (ssr) {
      return resp.data;
    }
    return resp.data.map(VatService.toPost);
  }

  static async getVat(id: string, ssr: boolean = false) {
    const resp = await axios.get(`${ VatService.url}/${id}`);
    if (ssr) {
      return resp.data;
    }
  return VatService.toPost(resp.data);
  }
}
