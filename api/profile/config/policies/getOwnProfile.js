module.exports = async ctx => {
  if (ctx.state.user) {
    const query = ctx.query;
    query.user = ctx.state.user.id;
    const entity = await strapi.services.profile.findOne(query);
    ctx.send(entity);
  }
};
