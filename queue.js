const queue = [];
let isProcessing = false;

function addToQueue(item) {
  queue.push(item);
}

function getNext() {
  return queue.shift();
}

function isEmpty() {
  return queue.length === 0;
}

function processQueue() {
  if (isEmpty() || isProcessing) {
    return;
  }
  isProcessing = true;

  // تابع العمليات على العناصر في الكيو هنا
  const item = getNext();
  // نفذ العملية هنا

  // بمجرد إتمام العملية، قم بتغيير حالة isProcessing إلى false
  isProcessing = false;

  // بعد إتمام عملية واحدة، اتصل بـ processQueue مرة أخرى لتكملة العمليات.
  processQueue();
}

module.exports = {
  addToQueue,
  getNext,
  isEmpty,
  isProcessing,
  processQueue,  // أضفنا هذه الدالة لبدء المعالجة بشكل دوري
  set isProcessing(value) {
    isProcessing = value;
  },
  get isProcessing() {
    return isProcessing;
  }
};
