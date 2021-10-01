// Getting the DOM Elements
const video = document.querySelector(".player__video");
const toggleButton = document.querySelector(".toggle");
const skipBtns = document.querySelectorAll(".player__button[data-skip]");
const ranges = document.querySelectorAll("input.player__slider");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");

// Functions
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  const symbol = toggleButton.textContent === "►" ? "❚ ❚" : "►";
  toggleButton.textContent = symbol;
}

function handleProgress(e) {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRanges() {
  video[this.name] = this.value;
}

function scrub(e) {
  const scrub = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrub;
}

// Hookup the EventListener
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggleButton.addEventListener("click", togglePlay);

skipBtns.forEach((skipBtn) => {
  skipBtn.addEventListener("click", skip);
});

ranges.forEach((range) => {
  range.addEventListener("change", handleRanges);
});
ranges.forEach((range) => {
  range.addEventListener("mousemove", handleRanges);
});

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
