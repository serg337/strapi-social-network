const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  // Create Profile linked to user ID
  async create(ctx) {
    const { user } = ctx.state;
    const entity = await strapi.services.profile.create({
      ...ctx.request.body,
      user: user.id
    });

    return sanitizeEntity(entity, { model: strapi.models.profile });
  },

  // Delete Profile linked to user ID
  async delete(ctx) {
    const { user } = ctx.state;
    const entity = await strapi.services.profile.delete({
      ...ctx.params,
      user: user.id
    });
    return sanitizeEntity(entity, { model: strapi.models.profile });
  },

  //add entry object to Education Array
  addEducation: async ctx => {
    let entity = await strapi.services.profile.findOne(ctx.params);

    if (entity.user.id === ctx.state.user.id) {
      let profile = sanitizeEntity(entity, { model: strapi.models.profile });
      delete profile.user;
      delete profile.experience;

      profile.education = profile.education.map(education => {
        delete education._id;
        return education;
      });

      profile.education.push(ctx.request.body);
      entity = await strapi.services.profile.update(ctx.params, profile);

      return sanitizeEntity(entity, { model: strapi.models.profile });
    } else {
      return { error: "You are not allowed to do that" };
    }
  },

  //add entry object to Experience Array
  addExperience: async ctx => {
    let entity = await strapi.services.profile.findOne(ctx.params);

    if (entity.user.id === ctx.state.user.id) {
      let profile = sanitizeEntity(entity, { model: strapi.models.profile });
      delete profile.user;
      delete profile.education;

      profile.experience = profile.experience.map(experience => {
        delete experience._id;
        return experience;
      });
      profile.experience.push(ctx.request.body);
      entity = await strapi.services.profile.update(ctx.params, profile);

      return sanitizeEntity(entity, { model: strapi.models.profile });
    } else {
      return { error: "You are not allowed to do that" };
    }
  },

  //Delete education item from profile
  removeEducation: async ctx => {
    let entity = await strapi.services.profile.findOne(ctx.params);
    console.log(entity);
  }
};
