import express from "express";
import ContractController from "../controller/ContractController";
import AcceptanceController from "../controller/AcceptanceController";
let router = express.Router();

const initAPIRoute = (app) => {
  router.post("/create-contract", ContractController.CreateNewContract);
  router.get("/AllContracts", ContractController.getAllContracts);
  router.get("/Contract/:id", ContractController.getContract);
  router.delete("/delete-contract/:id", ContractController.DeleteContract);
  router.put("/update-contract", ContractController.UpdateContract);
  router.post("/search-contract", ContractController.SearchContract);

  router.post("/create-acceptance", AcceptanceController.CreateNewAcceptance);
  router.get("/AllAcceptances", AcceptanceController.getAllAcceptances);
  router.get("/Acceptance/:id", AcceptanceController.getAcceptance);

  router.delete("/delete-acceptance/:id", AcceptanceController.DeleteAcceptance);
  router.put("/update-acceptance", AcceptanceController.UpdateAcceptance);
  router.post("/search-acceptance", AcceptanceController.SearchAcceptance);

  return app.use("/api/v1/", router);
};
export default initAPIRoute;
