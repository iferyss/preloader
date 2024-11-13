const relativePath = document.currentScript.src,
dvdContain = document.createElement('div');
document.body.style.position = 'fixed';
dvdContain.style.position = 'fixed';
dvdContain.style.width = '100vw';
dvdContain.style.height = '100vh';
dvdContain.style.opacity = '1';
dvdContain.style.backdropFilter = 'blur(10px)';
dvdContain.style.backgroundBlendMode = 'difference';
dvdContain.style.top = 0;
dvdContain.style.left = 0;
dvdContain.style.backgroundPosition = `center`;
document.body.appendChild(dvdContain);
let positionX = positionY = 0, invertX = invertY = false;


fetch(new URL('config.json', relativePath))
    .then(response => {
        return response.json();
    })
    .then(function(config) {
    let bgSettings = `url(${new URL(config.elements.logoSrc, relativePath).href}) 0/${config.elements.widthDvd}px no-repeat, linear-gradient(to ${config.gradientSettings.gradientRange}, `;
    for (let i = 0; i < config.gradientSettings.gradientColors.length; i++) {
        bgSettings += `${(config.gradientSettings.gradientColors[i]) + ((i + 1 == config.gradientSettings.gradientColors.length) ? '' : ', ')}`;
    }
    bgSettings += `), url(${new URL(config.elements.bgSrc, relativePath).href}) center/cover #000`;
    dvdContain.style.background = bgSettings;
    dvdContain.style.transition = `opacity ${config.moving.blendTime}s, background-position ${config.moving.drunk}s`;
    function moving() {
        positionX += (invertX ? -1 : 1) * config.moving.counter;
        positionY += (invertY ? -1 : 1) * config.moving.counter;

        invertX = (positionX > dvdContain.offsetWidth - config.elements.widthDvd) ? true : (positionX < 0) ? false : invertX;
        invertY = (positionY > dvdContain.offsetHeight - (config.elements.widthDvd / 2)) ? true : ((positionY < 0)) ? false : invertY;

        dvdContain.style.backgroundPosition = `${positionX}px ${positionY}px, center, center`;
    }

    setInterval(() => {requestAnimationFrame(moving)}, config.moving.speed);

    
        function hidePreloader() {
            dvdContain.style.opacity = '0';
            document.body.style.position = 'static';
            setTimeout(() => {
                dvdContain.style.display = 'none';
                document.body.removeChild(dvdContain);
            }, config.moving.blendTime * 1000)
        }
  
        if (!config.developeMode) {
            if (document.readyState !== 'loading') {
                hidePreloader();
            }
            else {
                document.addEventListener('DOMContentLoaded',function() {
                    hidePreloader();
                })
            }
        }

});



