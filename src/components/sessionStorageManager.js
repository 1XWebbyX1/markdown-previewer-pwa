class SessionStorageManager {

  insertCaretStore(p1, p2, p3, p4){
    this.p1 = sessionStorage.setItem('startPos', p1);
    this.p2 = sessionStorage.setItem('endPos', p2);
    this.p3 = sessionStorage.setItem('undoStart', p3);
    this.p4 = sessionStorage.setItem('undoEnd', p4);
  }

  selectionCaretStore(p12, p13, p14){
    this.p12 = sessionStorage.setItem('style', p12);
    this.p13 = sessionStorage.setItem('lastStartPos', p13);
    this.p14 = sessionStorage.setItem('lastSelection', p14);
  }

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
