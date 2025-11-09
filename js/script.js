// Карусель
const slides = document.querySelectorAll('.slide');
let current = 0;

function showSlide(n) {
    slides[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
}

document.querySelector('.prev')?.addEventListener('click', () => showSlide(current - 1));
document.querySelector('.next')?.addEventListener('click', () => showSlide(current + 1));

// Автопрокрутка каждые 6 секунд
setInterval(() => showSlide(current + 1), 6000);
// === КОСМИЧЕСКИЙ ИНФОРМЕР ===
function updateInformer() {
    // Время Москва
    const now = new Date();
    const moscowTime = now.toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow' });
    document.getElementById('moscowTime').textContent = moscowTime;

    // Люди в космосе
    fetch('http://api.open-notify.org/astros.json')
        .then(r => r.json())
        .then(data => {
            document.getElementById('astroCount').textContent = data.number;
        });

    // Температура на МКС (примерные данные)
    const issTemp = (Math.sin(Date.now() / 1000000) * 5 + 22).toFixed(1);
    document.getElementById('issTemp').textContent = issTemp;

    // Расстояние до Луны (среднее 384 400 км)
    const moonDist = (384400 + Math.sin(Date.now() / 2000000) * 40000).toFixed(0);
    document.getElementById('moonDist').textContent = moonDist.toLocaleString();

    // До Марса (среднее 225 млн км)
    const marsDist = (225 + Math.random() * 50).toFixed(1);
    document.getElementById('marsDist').textContent = marsDist;

    // Следующий пуск
    document.getElementById('nextLaunch').textContent = "Союз-2.1б • 12 фев 2025";
}

// Обновление каждые 5 сек
setInterval(updateInformer, 5000);
updateInformer();

// Кнопка обновить
document.getElementById('refreshBtn').addEventListener('click', updateInformer);
