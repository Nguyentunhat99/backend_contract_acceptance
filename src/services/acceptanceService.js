import db, { sequelize } from "../models/index";
const Op = db.Sequelize.Op;

let AllAcceptancesService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let acceptances = db.Acceptances.findAll({
        raw: true,
      });
      resolve(acceptances);
    } catch (error) {
      reject(error);
    }
  });
};

let CreateNewAcceptanceService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let acceptance = await db.Acceptances.findOne({
        where: {
          acceptance_name: data.acceptance_name,
        },
      });
      if (acceptance === null) {
        await db.Acceptances.create({
          contract_id: data.contract_id,
          acceptance_name: data.acceptance_name,
          acceptance_amount: data.acceptance_amount,
          volume: data.volume,
          status: data.status,
          acceptance_date: data.acceptance_date,
          description: data.description,
        });
        resolve({
          status: "success",
          messae: "Success! Create a new acceptance",
        });
      } else {
        resolve({
          status: "Error",
          message: "The acceptance name already exists",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteAcceptanceService = (acceptanceId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let acceptance = await db.Acceptances.findOne({
        where: {
          id: acceptanceId,
        },
      });
      if (!acceptance) {
        resolve({
          status: "error",
          message: `The acceptance isn't exist`,
        });
      }

      await db.Acceptances.destroy({
        where: {
          id: acceptanceId,
        },
      });
      resolve({
        status: "success",
        message: "The acceptance is deleted ",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateAcceptanceService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let acceptance = await db.Acceptances.findOne({
        where: {
          id: data.id,
        },
        raw: false,
      });
      if (acceptance) {
          acceptance.contract_id = data.contract_id,
          acceptance.acceptance_name = data.acceptance_name,
          acceptance.acceptance_amount = data.acceptance_amount,
          acceptance.volume = data.volume,
          acceptance.status = data.status,
          acceptance.acceptance_date = data.acceptance_date,
          acceptance.description = data.description,

        await acceptance.save();
        resolve({
          status: "success",
          message: `update the acceptance succeeds!`,
        });
      } else {
        resolve({
          status: "error",
          message: `acceptance's not found`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let searchAcceptanceService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let acceptance = await db.Acceptances.findAll({
        where: {
          [Op.or]: [
            { id: { [Op.like]: "%" + data.ValueSearch + "%" } },
            { acceptance_name: { [Op.like]: "%" + data.ValueSearch + "%" } },
            { acceptance_amount: { [Op.like]: "%" + data.ValueSearch + "%" } },
          ],
        },
        raw: true,
      });
      if (acceptance && acceptance.length ) {
        resolve(acceptance);
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

let getAcceptanceService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let acceptance = db.Acceptances.findOne({
        where: {
          id,
        },
        raw: true,
      });
      if (acceptance) {
        resolve(acceptance);
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  AllAcceptancesService,
  CreateNewAcceptanceService,
  deleteAcceptanceService,
  updateAcceptanceService,
  searchAcceptanceService,
  getAcceptanceService
};
