module.exports = function makeDataHelpers(db) {
  return {
    // Deletes tweet in 'db'
    deleteTweet: function(id) {
      let idDel = id;
      db.collection("tweets").remove({ id: idDel });
    }
  };
};
