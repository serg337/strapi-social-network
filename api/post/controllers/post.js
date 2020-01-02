"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  //Add a comment to post
  addComment: async ctx => {
    const { user } = ctx.state;
    let entity = await strapi.services.post.findOne(ctx.params);
    let post = sanitizeEntity(entity, { model: strapi.models.post });
    delete post.likes;

    post.comments = post.comments.map(comment => {
      delete comment._id;
      return comment;
    });

    post.comments.push({ ...ctx.request.body, user: user.id });
    entity = await strapi.services.post.update(ctx.params, post);
    return sanitizeEntity(entity, { model: strapi.models.post });
  },

  addLike: async ctx => {
    const { user } = ctx.state;
    let entity = await strapi.services.post.findOne(ctx.params);
    let post = sanitizeEntity(entity, { model: strapi.models.post });
    delete post.comments;
    console.log(post.likes);

    post.likes = post.likes.map(like => {
      delete like._id;

      return like;
    });

    post.likes.push({ ...ctx.request.body, user: user.id });
    entity = await strapi.services.post.update(ctx.params, post);
    return sanitizeEntity(entity, { model: strapi.models.post });
  }
};
