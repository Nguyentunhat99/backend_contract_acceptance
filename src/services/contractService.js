import db, { sequelize } from "../models/index";
const Op = db.Sequelize.Op;

let AllContractsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let contracts = db.Contracts.findAll({
        raw: true,
      });
      resolve(contracts);
    } catch (error) {
      reject(error);
    }
  });
};

let getContractService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract = db.Contracts.findOne({
        where: {
          id,
        },
        raw: true,
      });
      if (contract) {
        resolve(contract);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let createNewContractService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract = await db.Contracts.findOne({
        where: {
          contract_number: data.contract_number,
          contract_name: data.contract_name,
        },
      });
      if (contract === null) {
        await db.Contracts.create({
          contract_number: data.contract_number,
          contract_name: data.contract_name,
          sign_date: data.sign_date,
          contract_value: data.contract_value,
          customer_id: data.customer_id,
          status: data.status,
          description: data.description,
        });
        resolve({
          status: "success",
          message: "Success! Create a new contract",
        });
      } else {
        resolve({
          status: "error",
          message: "The contract number or contract name already exists",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteContractService = (contractId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract = await db.Contracts.findOne({
        where: {
          id: contractId,
        },
      });
      console.log(typeof contract);
      if (!contract) {
        resolve({
          status: "error",
          message: `The contract isn't exist`,
        });
      }

      await db.Contracts.destroy({
        where: {
          id: contractId,
        },
      });
      resolve({
        status: "success",
        message: "The contract is deleted ",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateContractService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract = await db.Contracts.findOne({
        where: {
          id: data.id,
        },
        raw: false,
      });
      if (contract) {
        contract.contract_number = data.contract_number;
        contract.contract_name = data.contract_name;
        contract.sign_date = data.sign_date;
        contract.contract_value = data.contract_value;
        contract.customer_id = data.customer_id;
        contract.status = data.status;
        contract.description = data.description;

        await contract.save();
        resolve({
          status: "success",
          message: `update the contract succeeds!`,
        });
      } else {
        resolve({
          status: "error",
          message: `contract's not found`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let searchContractService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contract = await db.Contracts.findAll({
        where: {
          [Op.or]: [
            { id: { [Op.like]: "%" + data.ValueSearch + "%" } },
            { contract_number: { [Op.like]: "%" + data.ValueSearch + "%" } },
            { contract_name: { [Op.like]: "%" + data.ValueSearch + "%" } },
            { contract_value: { [Op.like]: "%" + data.ValueSearch + "%" } },
          ],
        },
        raw: true,
      });
      if (contract && contract.length > 0) {
        resolve(contract);
      } else {
        resolve({
          status: "error",
          message: `Not found`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  AllContractsService,
  createNewContractService,
  deleteContractService,
  updateContractService,
  searchContractService,
  getContractService,
};
