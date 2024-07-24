
import http from "./config";

const service = {
  get: (params) => http.get("/client/all", { params}),
  add: (data) => http.post("/client", data),
  // update: (data) => http.put("/service/", data),
  delete: (id) => http.delete("/client", { params: {owner_id, id } }),
};

export default service;
