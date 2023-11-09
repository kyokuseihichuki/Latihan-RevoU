// Declare form of HTML to enable element inside of it
const form = document.querySelector('.form')

let weightInput = form.querySelector('[name=weight')
let heightInput = form.querySelector('[name=height')
let ageInput = form.querySelector('[name=age')

// When button click, trigger confirmation dialog and function validateForm()
form.addEventListener("submit", function(event) {
    event.preventDefault();
    Swal.fire({
        title: 'Apa Anda Yakin?',
        text: "Kamu ingin hitung BMI dengan data berikut?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ffd44c',
        cancelButtonColor: '#bebebe',
        confirmButtonText: 'Hitung BMI'
      }).then((result) => {
        if (result.isConfirmed) {
            validateForm();
        }
      });
});

// Validate form input using sweet alert for styling
function validateForm() {
    let weight = parseFloat(weightInput.value)
    let height = parseFloat(heightInput.value)
    let age = parseFloat(ageInput.value)
    
    if (isNaN(weight) || weight < 0 || weight > 200) {
        Swal.fire(
            'Oops!',
            'Please enter a valid weight',
            'warning'
        );
    } else if (isNaN(height) || height < 0 || height > 300) {
        Swal.fire(
            'Oops!',
            'Please enter a valid height',
            'warning'
        );
    } else if (isNaN(age) || age < 0 || age > 150) {
        Swal.fire(
            'Oops!',
            'Please enter a valid age',
            'warning'
        );
    } else {
        calculateBMI()
    }
}

function calculateBMI() {
    // Convert string into a floating number
    let weight = parseFloat(weightInput.value)
    let height = parseFloat(heightInput.value)

    // Calculate BMI
    let bmi = weight / Math.pow(height / 100, 2);

    // BMI result selection
    if (bmi < 18.5) {
        category = "Kekurangan Berat Badan";
        explanation = "Individu dengan BMI di bawah 18,5 dianggap Kurus , yang dapat diindikasikan kekurangan gizi, masalah kesehatan yang mendasarinya, atau praktik penurunan berat badan yang tidak sehat."
        tips = "Health tips:<br>-Tambah asupan kalori Anda untuk menambah berat badan. <br> -Konsumsi lebih banyak makanan protein tinggi dalam makanan Anda, seperti daging tanpa lemak, telur, dan kacang. -Hindari makanan olahan dan minuman manis."
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal (Ideal)";
        explanation = "Individu dengan BMI antara 18,5 dan 24,9 dianggap memiliki berat badan normal. Kategori ini memiliki risiko terendah terkena masalah kesehatan terkait berat badan."
        tips = "Health tips:<br>- Pertahankan diet seimbang dengan berbagai buah, sayuran, biji -bijian, protein tanpa lemak, dan lemak sehat. <br> - terlibat dalam aktivitas fisik yang teratur, seperti berjalan cepat, bersepeda, atau berenang. <br> - Hindari merokok dan konsumsi alkohol yang berlebihan. <br> - cukup tidur dan kelola tingkat stres Anda."
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Kelebihan Berat Badan";
        explanation = "Individu dengan BMI antara 25 dan 29,9 dianggap kelebihan berat badan, yang dapat mengindikasikan peningkatan risiko mengembangkan masalah kesehatan terkait berat badan, seperti tekanan darah tinggi, diabetes tipe 2, dan penyakit jantung."
        tips = "Health tips:<br>- Kurangi asupan kalori dan batasi ukuran porsi Anda. <br>- Pilih pilihan makanan yang lebih sehat, seperti biji-bijian, buah-buahan, sayuran, dan protein tanpa lemak. <br>- Tingkatkan tingkat aktivitas fisik Anda untuk membakar lebih banyak kalori. <br> - Konsultasikan dengan profesional kesehatan atau ahli diet terdaftar untuk nasihat yang dipersonalisasi."
    } else {
        category = "Kegemukan"
        explanation = "Individu dengan BMI antara 30 dan 34,9 dianggap memiliki obesitas (kelas I), yang dapat meningkatkan risiko mengembangkan masalah kesehatan terkait berat badan, termasuk penyakit jantung, stroke, dan beberapa jenis kanker."
        tips = "Health tips:<br>- Ikuti program penurunan berat badan terstruktur di bawah bimbingan seorang ahli diet profesional kesehatan atau terdaftar. <br>- Tetapkan tujuan yang realistis dan lacak kemajuan Anda. <br>- Tingkatkan tingkat aktivitas fisik Anda secara bertahap dan terlibat dalam baik aerobik dan pelatihan kekuatan dan kekuatan Latihan. <br>- mencari dukungan dari keluarga, teman, atau kelompok pendukung."
    }

    // Get the result element
    let bmiCategory1 = document.querySelector('#bmi-category-1')
    let bmiCategory2 = document.querySelector('#bmi-category-2')
    let bmiCategory3 = document.querySelector('#bmi-category-3')
    let bmiCategory4 = document.querySelector('#bmi-category-4')
    let bmiCategory5 = document.querySelector('#bmi-category-5')
    let bmiCategory6 = document.querySelector('#bmi-category-6')

    let bmiResult = document.querySelector('#bmi-result');

    // Round the result to two decimal places
    let roundedBmi = bmi.toFixed(2);

    // Display the result on the web page
    bmiCategory1.textContent = `${category}`
    bmiResult.textContent = `BMI = ${roundedBmi}`
    bmiCategory2.textContent = `Kategori Kamu Adalah ${category}`
    bmiCategory3.textContent = `${explanation}`
    bmiCategory4.innerHTML = `${tips}`;

    // Display or hide the results page
    document.getElementById("results").style.display = "block";
    document.getElementById("calculator").style.display = "none";
    if (bmi < 30) {
        document.getElementById("obese-only").style.display = "none";
    } else {
        document.getElementById("obese-only").style.display = "block";
    }
}