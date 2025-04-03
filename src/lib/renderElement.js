import { setupEventListeners } from "./eventManager";
import { createElement } from "./createElement";
import { normalizeVNode } from "./normalizeVNode";
import { updateElement } from "./updateElement";

// 이전 vNode를 저장할 WeakMap
const oldNodeMap = new WeakMap();
// container 안 바뀔 텐데 weakmap 쓸 필요있을까?

export function renderElement(vNode, container) {
  // 최초 렌더링시에는 createElement로 DOM을 생성하고
  // 이후에는 updateElement로 기존 DOM을 업데이트한다.
  // 렌더링이 완료되면 container에 이벤트를 등록한다.
  const normalizedVNode = normalizeVNode(vNode);
  const oldNode = oldNodeMap.get(container);

  if (oldNode) {
    updateElement(container, normalizedVNode, oldNode);
  } else {
    const newElement = createElement(normalizedVNode);
    container.appendChild(newElement);
  }

  // 항상 normalizedVNode를 저장 (실제 DOM 요소가 아닌 가상 노드)
  oldNodeMap.set(container, normalizedVNode);

  setupEventListeners(container);
}
