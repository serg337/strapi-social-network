module.exports = async ctx => {
  const { user } = ctx.state;
  const { query } = ctx;
  if (user) {
    query.user = user.id;
    const entity = await strapi.services.profile.findOne(query);
    ctx.send(entity);
  }
};
