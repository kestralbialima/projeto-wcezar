// Espera o documento HTML ser completamente carregado
document.addEventListener('DOMContentLoaded', function () {

    // 1. SELEÇÃO DOS ELEMENTOS
    const categoryCards = document.querySelectorAll('.category-card');
    const galleryOverlay = document.getElementById('gallery-overlay');
    const closeGalleryBtn = document.querySelector('.close-gallery');
    const mediaItems = document.querySelectorAll('.media-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    // 2. LÓGICA PARA ABRIR A GALERIA DA CATEGORIA
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;

            // Esconde todos os vídeos primeiro para limpar a galeria
            mediaItems.forEach(item => {
                item.style.display = 'none';
            });

            // Mostra apenas os vídeos da categoria clicada
            const itemsToShow = document.querySelectorAll(`.media-item[data-category="${category}"]`);
            itemsToShow.forEach(item => {
                item.style.display = 'block'; // Ou 'grid', dependendo do seu layout
            });

            // Mostra o overlay da galeria com efeito de fade-in
            galleryOverlay.style.display = 'flex';
        });
    });

    // 3. LÓGICA PARA FECHAR A GALERIA
    closeGalleryBtn.addEventListener('click', () => {
        galleryOverlay.style.display = 'none';
    });

    // 4. LÓGICA PARA ABRIR O VÍDEO EM TELA CHEIA (LIGHTBOX)
    mediaItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.dataset.src;

            // Limpa o conteúdo anterior do lightbox
            lightboxContent.innerHTML = '';

            const videoElement = document.createElement('video');
            videoElement.src = videoSrc;
            videoElement.controls = true;         // Mantém os controles de play/pause
            videoElement.autoplay = true;         // Inicia o vídeo automaticamente
            videoElement.loop = true;             // Opcional: faz o vídeo repetir
            videoElement.muted = true;            // <<< GARANTE QUE O VÍDEO NÃO TENHA SOM

            // Comandos para dificultar o download
            videoElement.setAttribute('controlslist', 'nodownload'); // <<< REMOVE O BOTÃO DE DOWNLOAD
            videoElement.addEventListener('contextmenu', e => e.preventDefault()); // <<< DESATIVA O CLIQUE DIREITO
            // Adiciona o vídeo ao lightbox e o exibe
            lightboxContent.appendChild(videoElement);
            lightbox.style.display = 'flex';
        });
    });

    // 5. LÓGICA PARA FECHAR O LIGHTBOX
    closeLightboxBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        // Para o vídeo que estava tocando
        lightboxContent.innerHTML = '';
    });

    // Opcional: Fechar o lightbox ao clicar fora do vídeo
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
            lightboxContent.innerHTML = '';
        }
    });

});