/**
 * favorites.js — Favorite channels management (list-specific)
 */
const Favorites = (() => {
  let _favIds = new Set();

  function init() {
    const list = typeof Store !== 'undefined' ? Store.get('currentList') : null;
    const listId = list ? list.id : null;
    _favIds = new Set(Storage.getFavs(listId));
  }

  function toggle(channelId) {
    if (_favIds.has(channelId)) {
      _favIds.delete(channelId);
      _save();
      return false; // removed
    } else {
      _favIds.add(channelId);
      _save();
      return true;  // added
    }
  }

  function isFav(channelId) { return _favIds.has(channelId); }

  function getIds() { return Array.from(_favIds); }

  function _save() {
    const list = typeof Store !== 'undefined' ? Store.get('currentList') : null;
    const listId = list ? list.id : null;
    Storage.saveFavs(listId, Array.from(_favIds));
  }

  return { init, toggle, isFav, getIds };
})();
