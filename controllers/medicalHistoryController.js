const {
  Medicalhistory,
  validateUser,
} = require("../models/medicalHistoryModal.js");

const { User } = require("../models/userModel.js");

//post user

const Medicalhistorypost = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.send(error.message);
  }

  const thisEmail = req.body.email;

  const user = await User.findOne({ thisEmail });
  if (!user) {
    res.status(400).send("User does not exist");
  }
  const medicalHistorys = new Medicalhistory({
    pastIllness: req.body.pastIllness,
    email: user,
    operations: req.body.operations,
    operationDate: req.body.operationDate,
    hospitalName: req.body.operationDate,
    name: req.body.name,
    relation: req.body.relation,
    disease: req.body.disease,
  });

  await medicalHistorys.save();
  res.json(medicalHistorys);
  return;
};
module.exports = Medicalhistorypost;
