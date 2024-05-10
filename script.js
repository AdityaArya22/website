function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
locomotive()
let tl = gsap.timeline()
function responsive() {
  let hamburger = document.querySelector(".hamburger");
  let navItems = document.querySelector(".nav-items");
  let open = false;
  hamburger.addEventListener("click", () => {

    if (open === true) {
      // tl.reverse()
      navItems.style.left = "800px"
      open = false
    }
    else {
      gsap.from(".nav-links", {
        x: 100,
        opacity:1,
        duration:1,
        stagger:0.15
      })
      navItems.style.left = "0px"
      open = true
    }
  })
}
responsive()
function page1Animation(){
  tl.from("header",{
    opacity:0,
    duration:1
  })
  tl.from(".socials i , .details",{
    y:10,
    opacity:0,
    duration:2,
    ease:"elastic",
    stagger:0.2
  },"a")
  tl.from(".logo, .nav-links",{
    y:10,
    opacity:0,
    duration:2,
    ease:"elastic",
    stagger:0.2
  },"a")
  tl.from(".bg-img img",{
    // x:100,
    opacity:0,
    duration:3,
    // ease:"elastic"
  },"a")
  tl.from(".card",{
    opacity:0,
    duration:0.3
  },"a")
  tl.from(".card h3,.card h1,.card .btn-container,.card .txt",{
    y:100,
    opacity:0,
    duration:1,
    delay:0.3,
    stagger:0.24
  },"a")
 
}
page1Animation()
// let tl2= gsap.timeline()

function page2Animation(){
  tl.from(".card-container .card-details,.right-card h1,.right-card p",{
    y:20,
    opacity:0,
    stagger:0.34,
    duration:3,
    // ease:"elastic",
    scrollTrigger:{
      trigger:".page2",
      scroller:".main",
      // markers:true,
      pin:true,
      scrub:3,
      end:"top 50%",
      start:"top 30%"     
    }
})
}
page2Animation()

function page3Animation(){
  tl.from(".info h1, .info p, .score-container",{
    y:20,
      opacity:0,
      stagger:0.34,
      duration:3,
      // ease:"elastic",
      scrollTrigger:{
        trigger:".page3",
        scroller:".main",
        markers:true,
        pin:true,
        scrub:3,
        end:"top 50%",
        start:"top 30%"     
      }
  })
  tl.from(".progress-80,.progress-90,.progress-95",{
    width:"0%",
    duration:4,
    stagger:0.12,
    scrollTrigger:{
      trigger:".page3",
      scroller:".main",
      markers:true,
      pin:true,
      scrub:3,
      end:"top 50%",
      start:"top 30%"     
    }
  })
}
page3Animation()