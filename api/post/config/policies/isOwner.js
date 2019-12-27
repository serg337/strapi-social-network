module.exports = async (ctx, next) => {
  if (ctx.state.user) {
    let postId = `/posts/${ctx.state.user.profile}`;
    let queryId = ctx.url;
    if (postId === queryId) {
      return await next();
    } else {
      return ctx.unauthorized("You are not authorized do that");
    }
  }
};
