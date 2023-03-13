module.exports.removePassword = (user) => {
  const userWithoutPassword = user;
  delete userWithoutPassword._doc.password;
  return userWithoutPassword;
};
