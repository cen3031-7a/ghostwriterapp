//Credit for following solution given to: https://github.com/zenoamaro/react-quill/issues/434#issuecomment-449697097

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
  takeRecords() {return []}
};
global.document.getSelection = function() {}