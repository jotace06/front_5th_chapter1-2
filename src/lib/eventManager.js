// { $el: { eventType: [handler1, handler2] } }
const eventMap = new Map();

// { $container: [eventType1, eventType2] }
const containerEventTypesMap = new WeakMap();

export function setupEventListeners(container) {
  if (!containerEventTypesMap.has(container)) {
    containerEventTypesMap.set(container, new Set());
  }
  const oldEventTypes = containerEventTypesMap.get(container);
  const newEventTypes = getNewEventTypes(oldEventTypes);

  newEventTypes.forEach((eventType) => {
    container.addEventListener(eventType, (e) => {
      const handlerMap = eventMap.get(e.target);
      if (!handlerMap) return;

      const handlers = handlerMap.get(eventType);
      if (!handlers) return;

      handlers.forEach((handler) => handler(e));
    });

    oldEventTypes.add(eventType);
  });
}

export function addEvent(element, eventType, handler) {
  if (!eventMap.has(element)) {
    eventMap.set(element, new Map());
  }

  const handlerMap = eventMap.get(element);
  if (!handlerMap.has(eventType)) {
    handlerMap.set(eventType, new Set());
  }

  const handlers = handlerMap.get(eventType);
  handlers.add(handler);
}

export function removeEvent(element, eventType, handler) {
  if (!eventMap.has(element)) return;

  const handlerMap = eventMap.get(element);
  if (!handlerMap.has(eventType)) return;

  const handlers = handlerMap.get(eventType);
  handlers.delete(handler);

  if (handlers.size === 0) {
    handlerMap.delete(eventType);
  }

  if (handlerMap.size === 0) {
    eventMap.delete(element);
  }
}

const getNewEventTypes = (oldEventTypes) => {
  const newEventTypes = new Set();

  eventMap.forEach((handlerMap) => {
    handlerMap.forEach((_, eventType) => {
      if (!oldEventTypes.has(eventType)) {
        newEventTypes.add(eventType);
      }
    });
  });

  return newEventTypes;
};
