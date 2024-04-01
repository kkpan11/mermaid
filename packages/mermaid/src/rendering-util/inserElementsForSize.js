// import type { LayoutData } from './types';
import { select } from 'd3';
import { insertNode } from '../dagre-wrapper/nodes.js'

// export const getDiagramElements = (id: string, securityLevel: any) => {
export const getDiagramElements = (id, securityLevel) => {
  let sandboxElement;
  if (securityLevel === 'sandbox') {
    sandboxElement = select('#i' + id);
  }
  const root =
    securityLevel === 'sandbox'
      ? select(sandboxElement.nodes()[0].contentDocument.body)
      : select('body');

      const svg = root.select(`[id="${id}"]`);
      console.log('SVG:', svg, svg.node(), 'id:',id,'root:', root, root.node());

  // console.log('SVG:', svg, svg.node(), 'root:', root, 'sandboxElement:', sandboxElement, 'id:', id, 'securityLevel:', securityLevel);
  // Run the renderer. This is what draws the final graph.

  // @ts-ignore todo: fix this
  const element = root.select('#' + id + ' g');
  return { svg, element };
}

// export function insertElementsForSize(el: SVGElement, data: LayoutData): void {
export function insertElementsForSize(el, data) {
  const nodesElem = el.insert('g').attr('class', 'nodes');
  const edgesElem = el.insert('g').attr('class', 'edges');
  console.log('Inserting elements for size:', data);
  data.nodes.forEach(async item => {
    item.shape = 'rect';
    console.log('Inserting node id:', item.id, 'shape:', item.shape);
    const e = await insertNode(nodesElem, {...item, class: 'default flowchart-label', labelStyle: '', x:0, y:0, width: 100,rx:0,ry:0, height: 100, shape: 'rect', padding:8});
    console.log('Inserted node:', e, e.node());
        // Create a new DOM element
        // const element = document.createElement('div');

        // // Set the content of the element to the name of the item
        // element.textContent = item.name;

        // // Set the size of the element to the size of the item
        // element.style.width = `${item.size}px`;
        // element.style.height = `${item.size}px`;

        // Append the element to the body of the document
        // document.body.appendChild(element);
  });
  console.log('Element', el, 'data:',  data);
}

export default insertElementsForSize;
