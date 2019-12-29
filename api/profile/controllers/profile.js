const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    const { user } = ctx.state;
    const entity = await strapi.services.profile.create({
      ...ctx.request.body,
      user: user.id
    });

    return sanitizeEntity(entity, { model: strapi.models.profile });
  },

  // async update(ctx) {
  //   const { user } = ctx.state;
  //   const entity = await strapi.services.profile.update(
  //     { ...ctx.params, user: user.id },
  //     ctx.request.body
  //   );

  //   return sanitizeEntity(entity, { model: strapi.models.profile });
  // }

  async delete(ctx) {
    const { user } = ctx.state;
    const entity = await strapi.services.profile.delete({
      ...ctx.params,
      user: user.id
    });
    return sanitizeEntity(entity, { model: strapi.models.profile });
  }
};
