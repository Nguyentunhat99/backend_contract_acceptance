import contractService from "../services/contractService";

let getAllContracts = async (req, res) => {
  let data = await contractService.AllContractsService();
  return res.status(200).json(data);
};

let getContract = async (req, res) => {
  let data = await contractService.getContractService(req.params.id);
  if (data) {
    return res.status(200).json(data);
  } else {
    return res
      .status(200)
      .json({ status: "error", message: `contract's not found` });
  }
};

let CreateNewContract = async (req, res) => {
  let data = await contractService.createNewContractService(req.body);
  return res.status(200).json(data);
};

let DeleteContract = async (req, res) => {
  let contractId = req.params.id;
  if (!contractId) {
    return res.status(200).json({
      status: "error",
      message: "Missing required parameters!",
    });
  }
  let message = await contractService.deleteContractService(contractId);
  return res.status(200).json(message);
};

let UpdateContract = async (req, res) => {
  let data = req.body;
  let message = await contractService.updateContractService(data);
  return res.status(200).json(message);
};

let SearchContract = async (req, res) => {
  let valueSearch = req.body;
  let data = await contractService.searchContractService(valueSearch);
  return res.status(200).json(data);
};

module.exports = {
  getAllContracts,
  CreateNewContract,
  DeleteContract,
  UpdateContract,
  SearchContract,
  getContract,
};
