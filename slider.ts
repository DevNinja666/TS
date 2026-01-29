const slidesEl = document.getElementById("slides") as HTMLDivElement;
const sliderEl = document.getElementById("slider") as HTMLDivElement;
const indicatorsContainer = document.getElementById("indicators") as HTMLDivElement;
const firstBtn = document.getElementById("firstBtn") as HTMLButtonElement;
const prevBtn = document.getElementById("prevBtn") as HTMLButtonElement;
const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;
const lastBtn = document.getElementById("lastBtn") as HTMLButtonElement;
const autoBtn = document.getElementById("autoBtn") as HTMLButtonElement;
const fsBtn = document.getElementById("fsBtn") as HTMLButtonElement;
const slides = slidesEl.children;
const totalSlides: number = slides.length;
let currentIndex: number = 0;
let autoInterval: number | null = null;
for (let i = 0; i < totalSlides; i++) {
    const dot: HTMLDivElement = document.createElement("div");
    dot.className = "indicator";
    dot.addEventListener("click", () => goToSlide(i));
    indicatorsContainer.appendChild(dot);
}
function updateSlider(): void {
    slidesEl.style.transform = `translateX(-${currentIndex * 100}%)`;
    const dots = document.querySelectorAll(".indicator");
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}
function stopAuto(): void {
    if (autoInterval !== null) {
        clearInterval(autoInterval);
        autoInterval = null;
    }
}
function nextSlide(): void {
    stopAuto();
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
}
function prevSlide(): void {
    stopAuto();
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
}
function firstSlide(): void {
    stopAuto();
    currentIndex = 0;
    updateSlider();
}
function lastSlide(): void {
    stopAuto();
    currentIndex = totalSlides - 1;
    updateSlider();
}
function goToSlide(index: number): void {
    stopAuto();
    currentIndex = index;
    updateSlider();
}
function toggleAuto(): void {
    if (autoInterval) {
        stopAuto();
    } else {
        autoInterval = window.setInterval(() => {
            if (currentIndex === totalSlides - 1) {
                stopAuto(); /
            } else {
                currentIndex++;
                updateSlider();
            }
        }, 2000);
    }
}
function toggleFullscreen(): void {
    if (!document.fullscreenElement) {
        sliderEl.requestFullscreen();
        sliderEl.classList.add("fullscreen");
    } else {
        document.exitFullscreen();
        sliderEl.classList.remove("fullscreen");
    }
}
firstBtn.addEventListener("click", firstSlide);
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);
lastBtn.addEventListener("click", lastSlide);
autoBtn.addEventListener("click", toggleAuto);
fsBtn.addEventListener("click", toggleFullscreen);
updateSlider();
