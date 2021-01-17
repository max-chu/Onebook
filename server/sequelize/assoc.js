module.exports = {
  applyAssoc(sequelize) {
    const { user, friendship, phonenum, tag, link, address } = sequelize.models;
    user.hasMany(friendship);

    friendship.hasOne(phonenum);
    friendship.hasMany(link);
    friendship.hasOne(address);
    friendship.hasMany(tag);

    friendship.belongsToMany(friendship, {through: 'relation', as: 'friend'});
    
  }
}