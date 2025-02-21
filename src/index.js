import './style.css'; 

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById('popover-button');
    const popover = document.getElementById('popover');

    button.addEventListener('click', () => {
        const isVisible = popover.style.display === 'block'; 

        if (isVisible) {
            popover.style.display = 'none'; //Если popover уже видим, то скрываем его при клике
        } else {
            // Показываем popover
            const rect = button.getBoundingClientRect();
            const popoverHeight = popover.offsetHeight;

            // Центрируем popover по кнопке
            const top = rect.top - popoverHeight - 120; // Отступ сверху
            const left = rect.left + rect.height / 2 - 50 ; // Центр по горизонтали

            popover.style.left = `${left}px`;
            popover.style.top = `${top}px`;

            popover.style.display = 'block'; // Показываем popover
        }
    });
});