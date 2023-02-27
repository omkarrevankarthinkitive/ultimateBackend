function canViewProject(user, project) {
  return (user.body.role = "Admin");
}

module.exports = {
  canViewProject,
};
