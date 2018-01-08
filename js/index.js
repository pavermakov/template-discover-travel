'use strict';

var Carousel = (function() {
  var items = document.querySelectorAll('.carousel__item');
  var totalItems = items.length;
  var itemClassTransparent = 'carousel__item_transparent';
  var dotClassActive = 'carousel__dot_active';
  var currentIndex = totalItems - 1;

  var dots;

  function createDots() {
    var dotsContainer = document.querySelector('.carousel__dots');
    var dot, item, i;

    for (i = 0; i < totalItems; i += 1) {
      dot = document.createElement('span');
      dot.className = 'carousel__dot';

      if (i === 0) {
        dot.classList.add('carousel__dot_active');
      }

      dotsContainer.appendChild(dot);
    }

    dots = document.querySelectorAll('.carousel__dot');
  }

  function removeItemsTransparency() {
    var i;

    for (i = 0; i < items.length; i += 1) {
      items[i].classList.remove(itemClassTransparent);
    }
  }

  function updateDots() {
    var i;

    for (i = 0; i < items.length; i += 1) {
      dots[i].classList.remove(dotClassActive);
    }

    dots[-currentIndex + totalItems - 1].classList.add(dotClassActive);
  }

  function start() {
    var INTERVAL = 3500;

    var currentItem, nextItem, nextIndex;

    setInterval(function() {
      if (currentIndex === 0) {
        removeItemsTransparency();
      } else {
        currentItem = items[currentIndex];
        currentItem.classList.add(itemClassTransparent);
      }

      currentIndex = currentIndex > 0 ? currentIndex - 1 : totalItems - 1;
      updateDots();
    }, INTERVAL);
  }

  function init() {
    if (items.length === 1) {
      return;
    }

    createDots();
    start();
  }

  return {
    init: init,
  };
})();

function onDOMReady() {
  Carousel.init();
}

document.addEventListener('DOMContentLoaded', onDOMReady);
