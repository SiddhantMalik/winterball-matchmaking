document.addEventListener('DOMContentLoaded', () => {
    const swipeCard = document.querySelector('.swipe-card');
    
    if (swipeCard) {
      let startX = 0;
      let currentX = 0;
      
      swipeCard.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      });
      
      swipeCard.addEventListener('touchmove', (e) => {
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        
        // Limit the card movement
        if (Math.abs(diffX) < 100) {
          swipeCard.style.transform = `translateX(${diffX}px) rotate(${diffX * 0.1}deg)`;
        }
      });
      
      swipeCard.addEventListener('touchend', () => {
        const diffX = currentX - startX;
        
        if (diffX > 100) {
          // Swipe right (like)
          document.querySelector('.btn-like').click();
        } else if (diffX < -100) {
          // Swipe left (dislike)
          document.querySelector('.btn-dislike').click();
        } else {
          // Reset position
          swipeCard.style.transform = '';
        }
      });
    }
  });