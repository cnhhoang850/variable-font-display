const rowOne = document.getElementsByClassName("one")[0];
const rowTwo = document.getElementsByClassName("two")[0];
const rowThree = document.getElementsByClassName("three")[0];
const body = document.getElementsByTagName("body")[0];
const wrapper = document.getElementsByClassName("wrapper")[0];
let root = document.documentElement;
let fontSize = wrapper.offsetHeight / 3;
let midPoint = wrapper.offsetHeight / 2;

root.style.setProperty("--fitFontHeight", fontSize + "px");

//tween for each row

let hoverOne = gsap.timeline({
  paused: true,
});

hoverOne
  .fromTo(
    ".one",
    {
      scaleY: 2 * 1.2,
    },
    {
      scaleY: 0.5 * 1.2,
    }
  )
  .to(
    ".three",
    {
      duration: 0,
      scaleY: 0.5 * 1.2,
      y: fontSize * 2 + fontSize / 2,
    },
    "<"
  )
  .fromTo(
    ".two",
    {
      scaleY: 0.5 * 1.2,
      y: fontSize * 2 - fontSize / 28,
    },
    {
      scaleY: 2 * 1.2,
      y: fontSize / 2,
    },
    "<"
  )
  .fromTo(
    ".two",
    {
      scaleY: 2 * 1.2,
      y: fontSize / 2,
    },
    {
      scaleY: 0.5 * 1.2,
      y: fontSize / 2,
    },
    ">"
  )
  .fromTo(
    ".three",
    {
      scaleY: 0.5 * 1.2,
      y: fontSize * 2 + fontSize / 2,
    },
    {
      scaleY: 2 * 1.2,
      y: fontSize,
    },
    "<"
  );
//horizontal animation

// play on hover

//slider for animation
/*
const slider = document.querySelector("#slider");

rangeSlider.create(slider, {
  min: 0,
  max: 1,
  step: 0.0001,
  onSlide: function (value, percent, position) {
    hoverOne.progress(percent).pause();
  },
  onSlideEnd: function (position, value) {
    hoverOne.pause();
  },
});

function updateSlider() {
  slider.rangeSlider.update(
    {
      value: hoverOne.progress(),
    },
    false
  );
}

function verticalUpdateSlider(percent) {
  slider.rangeSlider.update(
    {
      value: percent,
    },
    false
  );
}
*/

//get stretched dimensions

const spans = document.getElementsByTagName("span");

let hoverHori = gsap.timeline({
  paused: true,
});

hoverHori
  .to(".lfive", { "--font-stretch": 20, duration: 0 }, "<")
  .to(".lfour", { "--font-stretch": 50, duration: 0 }, "<")
  .to(".lthree", { "--font-stretch": 100, duration: 0 }, "<")
  .fromTo(
    ".lone",
    {
      "--font-stretch": 200,
    },
    {
      "--font-stretch": 20,
    },
    "<"
  )
  .fromTo(
    ".ltwo",
    {
      "--font-stretch": 180,
    },
    {
      "--font-stretch": 50,
    },
    "<"
  )
  .fromTo(
    ".lfour",
    {
      "--font-stretch": 50,
    },
    {
      "--font-stretch": 180,
    },
    "<"
  )
  .fromTo(
    ".lfive",
    {
      "--font-stretch": 20,
    },
    {
      "--font-stretch": 200,
    },
    "<"
  );

function resize() {
  gsap.to(".one", {
    scaleY: 1,
    duration: 0,
  });
  gsap.to(".two", {
    scaleY: 1,
    y: fontSize,
    duration: 0,
  });
  gsap.to(".three", {
    scaleY: 1,
    y: fontSize * 2,
    duration: 0,
  });
}
resize();

function reshape() {
  gsap.to(".lone", { "--font-stretch": 150, duration: 0 });
  gsap.to(".ltwo", { "--font-stretch": 150, duration: 0 });
  gsap.to(".lthree", { "--font-stretch": 150, duration: 0 });
  gsap.to(".lfour", { "--font-stretch": 150, duration: 0 });
  gsap.to(".lfive", { "--font-stretch": 150, duration: 0 });
}

reshape();

function stretch(stretchRatio1, stretchRatio2, stretchRatio3) {
  gsap
    .timeline({})
    .to(".one", {
      scaleX: stretchRatio1,
    })
    .to(
      ".two",
      {
        scaleX: stretchRatio2,
      },
      "<"
    )
    .to(
      ".three",
      {
        scaleX: stretchRatio3,
      },
      "<"
    );
}

function getWordLength(spans, start, end) {
  let worldLength = 0;
  for (i = start; i < end; i++) {
    worldLength += spans[i].offsetWidth;
  }
  console.log(worldLength);
  return wrapper.offsetWidth / worldLength;
}

wrapper.addEventListener("mousemove", (e) => {
  let mousePos = e.clientY - wrapper.offsetTop;
  let mouseHoriPos = e.clientX - wrapper.offsetLeft;
  let progress = mousePos / wrapper.offsetHeight;
  let progressHor = mouseHoriPos / wrapper.offsetWidth;
  if (progress < 0) {
    progress = 0;
  }
  if (progressHor < 0) {
    progressHor = 0;
  }

  let wordScale1 = getWordLength(spans, 0, 5);
  let wordScale2 = getWordLength(spans, 5, 10);
  let wordScale3 = getWordLength(spans, 10, 15);
  requestAnimationFrame(() => stretch(wordScale1, wordScale2, wordScale3));
  requestAnimationFrame(() => hoverHori.progress(progressHor).pause());
  requestAnimationFrame(() => hoverOne.progress(progress).pause());
});

window.addEventListener(
  "deviceorientation",
  (e) => {
    let x = e.beta;
    let y = e.gamma;
    let progressY = Math.abs(x) / 180;
    let progressX = Math.abs(y - 45) / 90;

    if (progressX < 0) {
      progressX = 0;
    }
    if (progressY < 0) {
      progressY = 0;
    }

    let wordScale1 = getWordLength(spans, 0, 5);
    let wordScale2 = getWordLength(spans, 5, 10);
    let wordScale3 = getWordLength(spans, 10, 15);
    requestAnimationFrame(() => stretch(wordScale1, wordScale2, wordScale3));
    requestAnimationFrame(() => hoverHori.progress(progressX).pause());
    requestAnimationFrame(() => hoverOne.progress(progressY).pause());
  },
  true
);
