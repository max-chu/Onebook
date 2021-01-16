module.exports = {
  applyAssoc(sequelize) {
    const { user, friendship, phonenum, tag, link, address } = sequelize.models;
    user.hasMany(friendship);

    friendship.hasMany(phonenum);
    friendship.hasMany(link);
    friendship.hasMany(address);
    friendship.hasMany(tag);

    friendship.belongsToMany(friendship, {through: 'relation', as: 'friend'});
    
  }
}