module.exports = async (ctx, next) => {
  if (ctx.state.user) {
    let profileId = `/profiles/${ctx.state.user.profile}`;
    let queryId = ctx.url;
    if (profileId === queryId) {
      return await next();
    } else {
      return ctx.unauthorized("You are not authorized do that");
    }
  }
};
