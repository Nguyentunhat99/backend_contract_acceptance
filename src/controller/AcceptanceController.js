import acceptanceService from "../services/AcceptanceService";

let getAllAcceptances = async (req, res) => {
  let data = await acceptanceService.AllAcceptancesService();
  return res.status(200).json(data);
};

let CreateNewAcceptance = async (req, res) => {
  let data = await acceptanceService.CreateNewAcceptanceService(req.body);
  return res.status(200).json(data);
};

let DeleteAcceptance = async (req, res) => {
  let acceptanceId = req.params.id;
  if (!acceptanceId) {
    return res.status(200).json({
      status: "error",
      message: "Missing required parameters!",
    });
  }
  let message = await acceptanceService.deleteAcceptanceService(acceptanceId);
  return res.status(200).json(message);
};

let UpdateAcceptance = async (req, res) => {
  let data = req.body;
  let message = await acceptanceService.updateAcceptanceService(data);
  return res.status(200).json(message);
};

let SearchAcceptance = async (req, res) => {
  let valueSearch = req.body;
  let data = await acceptanceService.searchAcceptanceService(valueSearch);
  return res.status(200).json(data);
};


let getAcceptance = async (req, res) => {
  let data = await acceptanceService.getAcceptanceService(req.params.id);
  if (data) {
    return res.status(200).json(data);
  } else {
    return res
      .status(200)
      .json({ status: "error", message: `Acceptance's not found` });
  }
};

module.exports = {
  getAllAcceptances,
  CreateNewAcceptance,
  DeleteAcceptance,
  UpdateAcceptance,
  SearchAcceptance,
  getAcceptance
};
