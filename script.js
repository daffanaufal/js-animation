const container = document.querySelector('.container');
const centralBox = document.querySelector('.central-box');
const linesSVG = document.querySelector('.lines');
const appIcons = document.querySelectorAll('.app-icon');

appIcons.forEach(icon => {
    const centralBoxRect = centralBox.getBoundingClientRect();
    const centralBoxCenterX = centralBoxRect.left + centralBoxRect.width / 2;
    const centralBoxCenterY = centralBoxRect.top + centralBoxRect.height / 1;
  
    const iconRect = icon.getBoundingClientRect();
    const iconCenterX = iconRect.left + iconRect.width / 2;
    const iconCenterY = iconRect.top + iconRect.height / 2;
  
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute('class', 'line');
    line.setAttribute('x1', centralBoxCenterX);
    line.setAttribute('y1', centralBoxCenterY);
    line.setAttribute('x2', iconCenterX);
    line.setAttribute('y2', iconCenterY);
    linesSVG.appendChild(line);
  
    icon.addEventListener('mouseover', () => {
      const previousLight = document.querySelector('.light');
      if (previousLight) previousLight.remove();
      const light = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      light.classList.add('light');
      light.setAttribute('cx', centralBoxCenterX);
      light.setAttribute('cy', centralBoxCenterY);
      light.setAttribute('r', '0'); 
      light.setAttribute('fill', 'white');
      linesSVG.appendChild(light);
      animateLight(light, line);
    });
  });
  
function animateLight(light, line) {
  const totalLength = line.getTotalLength();
  let distance = 0;
  const speed = 2; 
  const interval = setInterval(() => {
    if (distance >= totalLength) {
      clearInterval(interval);
      light.remove(); 
    } else {
      distance += speed;
      const point = line.getPointAtLength(distance);
      light.setAttribute('cx', point.x);
      light.setAttribute('cy', point.y);
      light.setAttribute('r', '3'); 
    }
  }, 10); 
}

appIcons.forEach(icon => {
  icon.addEventListener('mouseover', () => {
    const lineIndex = Array.from(icon.parentNode.children).indexOf(icon);
    const line = linesSVG.children[lineIndex];
    animateCable(line);
  });
});

function animateCable(line) {
  line.style.stroke = "orange"; 
  setTimeout(() => {
    line.style.stroke = "white"; 
  }, 1000); 
}

