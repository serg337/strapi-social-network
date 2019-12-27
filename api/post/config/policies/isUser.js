module.exports = async (ctx, next) => {
  if (ctx.state.user) {
    const { id } = ctx.state.user;
    ctx.request.body.user = id;
    return await next();
  } else {
    return ctx.unauthorized("Please Log In");
  }
};
