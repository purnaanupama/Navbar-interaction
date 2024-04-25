
//J query method

//  $('a').click(function(event){
//     event.preventDefault();
//     var thisSection = $(this).attr('href');
//     $('html , body').stop().animate({scrollTop: $(thisSection).offset().top-60},200)
//   })

// Plain JavaScript
   

const navLinks = document.querySelectorAll('a');

navLinks.forEach(function(eachLink){
  eachLink.addEventListener('click',smoothScroll);
})

function smoothScroll(event){
  event.preventDefault();
  const targetId = event.target.getAttribute('href');
  const targetSection = document.querySelector(targetId);
 
  
  const original = (targetSection.getBoundingClientRect().top)-60;
  window.scrollBy({top:original, left:0,behavior : 'smooth'})
}

window.addEventListener('load',function(){
    const posts = document.querySelectorAll('.section');
    let postTops = []
    let pagetop;
    let counter = 1;
    let prevCounter = 1;
    let doneResizing;
   
    resetPagePosition();
    // posts.forEach(function(post){
    //   postTops.push(Math.floor((post.getBoundingClientRect().top)+window.pageYOffset))
    // })
    
   window.addEventListener('scroll',function(){
    pagetop = window.pageYOffset+250;
    // console.log(pagetop) +250;
    if(pagetop > postTops[counter]){
      counter++;
      console.log(`scrolling down ${counter}`);
    }else if(counter > 1 && pagetop < postTops[counter-1]){
      counter--;
      console.log(`scrolling up ${counter}`);
    }if(counter != prevCounter){
      navLinks.forEach(function(eachLink){
        eachLink.removeAttribute('class');
      });
      const thisLink = document.querySelector(`nav .navbar-container ul li:nth-child(${counter}) a`);
      thisLink.className = "selected";
      prevCounter = counter;
      
    }
   });
   window.addEventListener('resize',function() {
    clearTimeout(doneResizing)
    doneResizing = setTimeout(function() {
      resetPagePosition();
    },500);
   });
   function resetPagePosition(){

    postTops = [];
    posts.forEach(function(post){
      postTops.push(Math.floor((post.getBoundingClientRect().top)+window.pageYOffset))
    });
      const pagePosition = window.pageYOffset + 250;
      counter = 0;

      postTops.forEach(function(post){
        if(pagePosition > post){
          counter++;
        }
      })
      navLinks.forEach(function(eachLink){
        eachLink.removeAttribute('class');
      });
      const thisLink = document.querySelector(`nav .navbar-container ul li:nth-child(${counter}) a`);
      thisLink.className = "selected";
   }
});