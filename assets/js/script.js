'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});


// PAGEEE


// Hero




// Array Soal
const questions = [
  {
    questionNumber: 1,
    questionText: "Seorang pelari menempuh jarak 200 meter dalam waktu 25 detik. Berapakah kecepatan rata-rata pelari tersebut?",
    options: [
      { value: "8", text: "8 m/s" },
      { value: "10", text: "10 m/s" },
      { value: "12", text: "12 m/s" },
      { value: "15", text: "15 m/s" }
    ],
    correctAnswer: "10",
  },
  {
    questionNumber: 2,
    questionText: "Jika sebuah benda bermassa 5 kg bergerak dengan kecepatan 10 m/s, berapakah energi kinetiknya?",
    options: [
      { value: "50", text: "50 Joule" },
      { value: "250", text: "250 Joule" },
      { value: "500", text: "500 Joule" },
      { value: "1000", text: "1000 Joule" }
    ],
    correctAnswer: "250",
  },
  {
    questionNumber: 3,
    questionText: "Jika seorang anak mendorong benda sejauh 10 meter dengan gaya 15 N, berapakah usaha yang dilakukan?",
    options: [
      { value: "8.9", text: "150 J" },
      { value: "9.8", text: "100 J" },
      { value: "10.1", text: "200 J" },
      { value: "11.0", text: "250 J" }
    ],
    correctAnswer: "8.9",
  },
  {
    questionNumber: 4,
    questionText: "Berapakah tekanan yang diberikan oleh sebuah benda bermassa 50 kg yang menekan permukaan seluas 0,5 m²?",
    options: [
      { value: "8.9", text: "500 Pa" },
      { value: "9.8", text: " 1500 Pa" },
      { value: "10.1", text: " 2000 Pa" },
      { value: "11.0", text: "1000 Pa" }
    ],
    correctAnswer: "11.0",
  },
  {
    questionNumber: 5,
    questionText: "Jika panjang gelombang sebuah sinyal adalah 2 meter dan frekuensinya adalah 10 Hz, berapakah kecepatannya?",
    options: [
      { value: "8.9", text: "5 m/s" },
      { value: "9.8", text: "10 m/s" },
      { value: "10.1", text: "20 m/s" },
      { value: "11.0", text: "15 m/s" }
    ],
    correctAnswer: "10.1",
  }
];

let currentQuestionIndex = 0;

// Fungsi untuk Menampilkan Soal
function renderQuestion(index) {
  const quizContainer = document.getElementById("quiz-container");
  const question = questions[index];

  quizContainer.innerHTML = `
    <div class="quiz-question" data-question="${question.questionNumber}" data-answer="${question.correctAnswer}">
      <h3 class="question-title">${question.questionNumber}. ${question.questionText}</h3>
      <ul class="quiz-options">
        ${question.options
          .map(
            (option) => `
            <li>
              <label>
                <input type="radio" name="question${question.questionNumber}" value="${option.value}">
                ${option.text}
              </label>
            </li>
          `
          )
          .join("")}
      </ul>
    </div>
  `;
  updateNavigationButtons();
}

// Fungsi untuk Memperbarui Progress Bar
function updateProgress() {
  const progress = document.getElementById("progress");
  const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  progress.style.width = `${percentage}%`;
  progress.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
}

// Fungsi untuk Menampilkan Popup
function showPopup(popupId, message = null) {
  const popup = document.getElementById(popupId);
  const overlay = document.getElementById("popup-overlay");

  if (message) {
    popup.querySelector("p").innerText = message;
  }

  popup.classList.add("show");
  overlay.classList.add("show");
}

// Fungsi untuk Menutup Popup
function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  const overlay = document.getElementById("popup-overlay");

  popup.classList.remove("show");
  overlay.classList.remove("show");
}

// Fungsi untuk Menavigasi ke Soal Berikutnya
function nextQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = document.querySelector(
    `input[name="question${currentQuestion.questionNumber}"]:checked`
  );

  if (!selectedAnswer) {
    showPopup("popup-warning", "Harap pilih jawaban sebelum melanjutkan!");
    return;
  }

  if (selectedAnswer.value !== currentQuestion.correctAnswer) {
    showPopup("popup-warning", "Jawaban Anda salah, coba lagi!");
    return;
  }

  currentQuestionIndex++;
  renderQuestion(currentQuestionIndex);
  updateProgress();
}

// Fungsi untuk Menavigasi ke Soal Sebelumnya
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion(currentQuestionIndex);
    updateProgress();
  }
}

// Fungsi untuk Memperbarui Status Tombol Navigasi
function updateNavigationButtons() {
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === questions.length - 1;
}

// Inisialisasi Halaman
document.addEventListener("DOMContentLoaded", () => {
  renderQuestion(currentQuestionIndex);
  updateProgress();

  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  nextBtn.addEventListener("click", nextQuestion);
  prevBtn.addEventListener("click", prevQuestion);
});

// Fungsi untuk Menavigasi ke Soal Berikutnya
function nextQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = document.querySelector(
    `input[name="question${currentQuestion.questionNumber}"]:checked`
  );

  // Cek jika belum memilih jawaban
  if (!selectedAnswer) {
    showPopup("popup-warning", "Harap pilih jawaban sebelum melanjutkan!");
    return;
  }

  // Cek jawaban
  if (selectedAnswer.value !== currentQuestion.correctAnswer) {
    showPopup("popup-warning", "Jawaban Anda salah, coba lagi!");
    return;
  }

  // Pindah ke soal berikutnya
  currentQuestionIndex++;

  // Jika soal terakhir, tampilkan popup sukses
  if (currentQuestionIndex < questions.length) {
    renderQuestion(currentQuestionIndex);
    updateProgress();
  } else {
    showPopup("popup-success"); // Menampilkan popup sukses
  }

  // Update tombol navigasi (prev & next)
  updateNavigationButtons();
}

// Fungsi untuk Memperbarui Tombol Navigasi
function updateNavigationButtons() {
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  // Menonaktifkan tombol prev pada soal pertama
  prevBtn.disabled = currentQuestionIndex === 0;

  // Menonaktifkan tombol next pada soal terakhir
  nextBtn.disabled = currentQuestionIndex === questions.length;
}

  // Fungsi untuk menampilkan efek loading
  function showLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.classList.add('show');
}

// Fungsi untuk menyembunyikan efek loading
function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.classList.remove('show');
}

// Menambahkan event listener untuk menangani klik pada link
const links = document.querySelectorAll('a');

links.forEach(link => {
    link.addEventListener('click', (event) => {
        const currentPage = window.location.pathname; // Mengambil URL saat ini
        const targetPage = link.getAttribute('href'); // Mengambil tujuan URL dari link yang diklik

        // Cek jika sedang berpindah dari index.html ke soal.html
        if (currentPage.includes('index.html') && targetPage === 'soal.html') {
            event.preventDefault(); // Mencegah berpindah halaman langsung
            showLoading(); // Tampilkan efek loading

            // Menunggu beberapa detik untuk menampilkan efek loading sebelum pindah halaman
            setTimeout(() => {
                window.location.href = targetPage; // Arahkan ke soal.html setelah loading
            }, 1000); // Sesuaikan waktu loading sesuai kebutuhan (1000ms = 1 detik)
        }
    });
});


// HERO IMAGE
// Ambil elemen hero
const hero = document.querySelector(".hero");

// Array gambar untuk slideshow
const images = [
  "./assets/images/foto4.jpg",
  "./assets/images/foto3.jpg",
  "./assets/images/foto5.jpg",
  "./assets/images/foto6.jpg"
];


let currentIndex = 0;

// Fungsi untuk mengganti background
function changeBackground() {
  currentIndex = (currentIndex + 1) % images.length; // Rotasi gambar
  hero.style.backgroundImage = `url('${images[currentIndex]}')`;
}

// Ganti gambar setiap 5 detik
setInterval(changeBackground, 5000);

// Set gambar awal
hero.style.backgroundImage = `url('${images[currentIndex]}')`;


// AOS

AOS.init({
  offset: 100, // Jarak elemen muncul dari viewport
  duration: window.innerWidth < 768 ? 300 : 500, // Durasi lebih singkat untuk mobile
  delay: 0, // Hilangkan delay
  easing: 'ease-in-out', // Jenis animasi
  once: true, // Animasi hanya terjadi sekali
  anchorPlacement: 'top-bottom', // Posisi elemen relatif ke viewport
});


// dropdown

document.querySelectorAll('.dropdown > .navbar-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // Mencegah default behavior link
    const dropdownContent = this.nextElementSibling;

    // Tutup dropdown lain jika ada
    document.querySelectorAll('.dropdown-content').forEach(content => {
      if (content !== dropdownContent) content.style.display = 'none';
    });

    // Toggle display dropdown
    if (dropdownContent.style.display === 'block') {
      dropdownContent.style.display = 'none';
    } else {
      dropdownContent.style.display = 'block';
    }
  });
});

// Klik di luar dropdown untuk menutup
document.addEventListener('click', function (e) {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-content').forEach(content => {
      content.style.display = 'none';
    });
  }
});
