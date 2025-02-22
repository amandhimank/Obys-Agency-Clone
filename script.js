function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function loadingAnimation() {
    var tl = gsap.timeline();
tl.from(".line h1, .line h2", {
    y:150,
    duration:0.5,
    opacity:0,
    stagger:0.2
}, 'a')
tl.from(".line1-part1",{
    opacity:0,
    delay:0.2,
    onStart:function(){
        var counter = document.querySelector(".line1-part1 h5");
        var count = 0;
        var countInt = setInterval(function(){
            count++;
            counter.textContent = count;
        
            if(count >= 100) {
                clearInterval(countInt);
            }
        }, 25);
    }
}, 'a')
tl.to(".line h2",{
    animationName: "textAnim"
}, 'a')
tl.to(".line",{
    opacity: 0,
    duration: 1,
    delay: 3
})
tl.to("#loader",{
    y:"-20%",
    duration: 0.5,
    ease: "power2.in",
    onComplete:function(){
        gsap.to("#loader",{
            duration: 0.5,
            y: "-100%",
            ease: "power4.out",
            display: "none"
        })
    },
}, 'b')
tl.from(".hero h1, #hero3 h2, #hero3 h3",{
    y: 120,
})

}

function cursorAnimation(){
    document.addEventListener("mousemove", function(dets){
        gsap.to("#crsr", {
            left: dets.x - (document.querySelector("#crsr").offsetWidth / 2),
            top: dets.y - (document.querySelector("#crsr").offsetHeight / 2),
            duration: 0.2,
            ease: "power2.out"
        })
    });
    
    Shery.makeMagnet("#nav-part2 h4", {
        //Parameters are optional.
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
      });

    var videoContainer = document.querySelector("#video-container");
    var video = document.querySelector("#video-container video");
    videoContainer.addEventListener("mouseenter", () => {
        videoContainer.addEventListener("mousemove", (dets) => {
            gsap.to("#crsr", {
                opacity: 0
            })
            gsap.to("#video-cursor", {
                left: dets.x - 520,
                top: dets.y - 350            
            })
        })
    });
    videoContainer.addEventListener("mouseleave", () => {
        gsap.to("#crsr", {
            opacity: 1
        })
        gsap.to("#video-cursor", {
            left: "70%",
            top: "-10%"            
        })
    })

    var flag = 0;
    videoContainer.addEventListener("click", () => {
        if(flag == 0){
            video.play();
            document.querySelector("#video-container img").style.display = "none";
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-line"></i>`;
            gsap.to("#video-cursor", {
                scale: 0.5
            })
            flag = 1;
        }else{
            video.pause();
            document.querySelector("#video-container img").style.display = "initial";
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-large-fill"></i>`;
            gsap.to("#video-cursor", {
                scale: 1
            })
            flag = 0;
        }
    })
}

function sheryAnimation(){
    Shery.imageEffect(".image-div", {
        style: 5,
        config: {"a":{"value":2,"range":[0,30]},"b":{"value":-0.71,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7817980501167012},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.53,"range":[0,10]},"metaball":{"value":0.38,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
        gooey: true
    })
}

function flagAnimation(){
    document.addEventListener("mousemove", (dets) => {
        gsap.to("#flag", {
            left: dets.clientX,
            top: dets.clientY,
            ease: "power1.out"
        })
    })
    
    document.querySelector("#hero3").addEventListener("mouseenter", () => {
        gsap.to("#flag", {
            opacity: 1
        })
    })
    document.querySelector("#hero3").addEventListener("mouseleave", () => {
        gsap.to("#flag", {
            opacity: 0
        })
    })
    
}

function footerAnimation(){
    var clutter1 = "";
    var clutter2 = "";
    document.querySelector("#footer-text h1").textContent.split('').forEach((letter) => {
        clutter1 += `<span>${letter}</span>`;
    })

    document.querySelector("#footer-text h2").textContent.split('').forEach((char) => {
        clutter2 += `<span>${char}</span>`;
    })

    document.querySelector("#footer-text h1").innerHTML = clutter1;
    document.querySelector("#footer-text h2").innerHTML = clutter2;

    document.querySelector("#footer-text").addEventListener("mouseenter", () => {
        gsap.to("#footer-text h1 span", {
            opacity: 0,
            stagger: 0.05,
        });
        gsap.to("#footer-text h2 span, #footer h2", {
            delay: 0.20,
            opacity: 1,
            stagger: 0.1,
        });
    })

    document.querySelector("#footer-text").addEventListener("mouseleave", () => {
        gsap.to("#footer-text h1 span", {
            opacity: 1,
            stagger: 0.1,
            // delay: 0.35,
        })
        gsap.to("#footer-text h2 span, #footer h2", {
            opacity: 0,
            stagger: 0.05
        })
    })

}

loadingAnimation();
cursorAnimation();
locomotiveAnimation();
sheryAnimation();
flagAnimation();
footerAnimation();
