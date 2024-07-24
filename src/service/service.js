
import http from "./config";

const service = {
  get: (params) => http.get("/service/all", { params}),
  add: (data) => http.post("/service", data),
  // update: (data) => http.put("/service/", data),
  delete: (id) => http.delete("/service", { params: { id } }),
};

export default service;
