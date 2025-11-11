class WebClient {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuth();
    }

    bindEvents() {
        // Обработчик формы логина
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Обработчик кнопки выхода
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });
    }

    checkAuth() {
        // Проверяем, есть ли сохраненная сессия
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showMainScreen();
        } else {
            this.showLoginScreen();
        }
    }

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Простая валидация
        if (!username || !password) {
            this.showMessage('Пожалуйста, заполните все поля', 'error');
            return;
        }

        // Здесь должна быть реальная проверка с сервером
        // Для демонстрации используем mock авторизацию
        if (this.mockAuth(username, password)) {
            this.currentUser = {
                username: username,
                loginTime: new Date().toLocaleString()
            };
            
            // Сохраняем в localStorage
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            
            this.showMainScreen();
            this.showMessage('Успешный вход!', 'success');
        } else {
            this.showMessage('Неверный логин или пароль', 'error');
        }
    }

    mockAuth(username, password) {
        // Mock авторизация - в реальном приложении здесь будет запрос к серверу
        const validUsers = [
            { username: 'admin', password: 'admin123' },
            { username: 'user', password: 'user123' },
            { username: 'test', password: 'test123' }
        ];
        
        return validUsers.some(user => 
            user.username === username && user.password === password
        );
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.showLoginScreen();
        this.clearLoginForm();
    }

    showLoginScreen() {
        document.getElementById('loginScreen').classList.add('active');
        document.getElementById('mainScreen').classList.remove('active');
    }

    showMainScreen() {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('mainScreen').classList.add('active');
        
        // Обновляем приветствие
        if (this.currentUser) {
            document.getElementById('userGreeting').textContent = 
                `Добро пожаловать, ${this.currentUser.username}!`;
        }
    }

    showMessage(text, type) {
        const messageEl = document.getElementById('loginMessage');
        messageEl.textContent = text;
        messageEl.className = `message ${type}`;
        messageEl.style.display = 'block';
        
        // Автоматически скрываем сообщение через 3 секунды
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }

    clearLoginForm() {
        document.getElementById('loginForm').reset();
    }
}

// Инициализация приложения когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    new WebClient();
});