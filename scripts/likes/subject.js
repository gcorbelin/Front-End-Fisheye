function likesSubject() {
  let observers = [];

  function subscribe(observer) {
    observers.push(observer);
  }

  function unsubscribe(observer) {
    observers = observers.filter((obs) => obs !== observer);
  }

  function fire(action) {
    observers.forEach((obs) => obs.update(action));
  }

  return { subscribe, unsubscribe, fire };
}

export default likesSubject;
