document.addEventListener('DOMContentLoaded', () => {
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    const videoContainer = document.getElementById('videoContainer');
    const video = document.getElementById('video');
    const message = document.getElementById('message');

    let attempts = 0;
    const messages = [
        "Emin misin?",
        "Gerçekten emin misin?",
        "Tekrar düşün!",
        "Son şansın!",
        "Cidden mi?",
        "Bunu yaparsan pişman olabilirsin!",
        "Bir kez daha düşün!",
        "Kesinlikle emin misin?",
        "Bu bir hata olabilir!",
        "O kadar emin olma!",
        "Fikrini değiştirir misin?",
        "Bu son cevabın mı?",
        "Kalbimi kırıyorsun ;)"
    ];

    // Function to move the No button to a random position
    function moveNoButton() {
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();
        
        const maxX = containerRect.width - buttonRect.width;
        const maxY = containerRect.height - buttonRect.height;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        noButton.style.position = 'absolute';
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;

        // Update message
        if (attempts < messages.length) {
            message.textContent = messages[attempts];
            attempts++;
        }
    }

    // Add mouseover event to No button
    noButton.addEventListener('mouseover', moveNoButton);

    // Video yükleme ve oynatma işlemleri
    function loadAndPlayVideo() {
        return new Promise((resolve, reject) => {
            video.load(); // Videoyu yeniden yükle
            
            const handleCanPlay = () => {
                video.removeEventListener('canplay', handleCanPlay);
                resolve();
            };
            
            const handleError = (error) => {
                video.removeEventListener('error', handleError);
                reject(error);
            };
            
            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('error', handleError);
        });
    }

    // Add click event to Yes button
    yesButton.addEventListener('click', async () => {
        try {
            videoContainer.style.display = 'block';
            message.textContent = "Video yükleniyor...";
            
            await loadAndPlayVideo();
            await video.play();
            
            message.textContent = "Harika seçim! 😊";
        } catch (error) {
            console.error("Video hatası:", error);
            message.textContent = "Video açılamadı. Lütfen şunları kontrol edin:\n" +
                                "1. Video dosyası mevcut mu?\n" +
                                "2. Video dosyası doğru formatta mı?\n" +
                                "3. Video dosyası HTML ile aynı klasörde mi?";
        }
    });

    // Video yükleme hatası
    video.addEventListener('error', (e) => {
        console.error("Video yükleme hatası:", video.error);
        message.textContent = "Video yüklenemedi. Hata kodu: " + video.error.code;
    });

    // Video hazır olduğunda
    video.addEventListener('canplay', () => {
        message.textContent = "Video hazır!";
    });
}); 