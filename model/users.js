const User = require("./schemas/user");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const findByToken = async (token) => {
  return await User.findOne({ token });
};


const findByVerificationToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

const create = async ({ email, password, verify, verificationToken }) => {
  const user = new User({ email, password, verify, verificationToken });
  return await user.save();
};


const createViaGoogle = async (email) => {
  const user = new User({ email });

  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateVerifyToken = async (id, verify, verificationToken) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { verify, verificationToken }
  );
};


const updateAvatarUrl = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatar });
};

module.exports = {
  findByEmail,
  findById,
  findByToken,
  findByVerificationToken,
  create,
  createViaGoogle,
  updateToken,
  updateVerifyToken,
  // updateUserSubscription,
  updateAvatarUrl,
};
