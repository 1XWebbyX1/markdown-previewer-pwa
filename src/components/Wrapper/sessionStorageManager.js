class SessionStorageManager {

  save(key, item){
    sessionStorage.setItem(key, item);
  }

  get(key){
    return sessionStorage.getItem(key);
  }

  clear(key){
    sessionStorage.removeItem(key);
  }
}


export default SessionStorageManager;
