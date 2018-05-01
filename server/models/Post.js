
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slug = require('slug');
const User = mongoose.model('User');

const PostSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  title: String,
  body: String,
  likeCount: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tagList: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
PostSchema.plugin(uniqueValidator, { message: 'is already taken' });

PostSchema.pre('validate', function(next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

PostSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

PostSchema.methods.updateLikes = function() {
  const post = this;

  return User.count({ likes: { $in: [post._id] } }).then(function(count) {
    post.likeCount = count;

    return post.save();
  });
};

PostSchema.methods.toJSONFor = function(user) {
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    liked: user ? user.didLike(this._id) : false,
    likeCount: this.likeCount,
    author: this.author.toProfileJSON(),
  };
};

mongoose.model('Post', PostSchema);
