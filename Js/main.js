// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }
  
  // Dynamic greeting based on time
  setDynamicGreeting();
  
  // Daily trigger functionality
  initializeDailyTrigger();
  
  // Update stats
  updateStats();
  
  // Highlight current page in navigation
  highlightCurrentPage();
});

function setDynamicGreeting() {
  const greetingEl = document.getElementById('dynamicGreeting');
  if (!greetingEl) return;
  
  const hour = new Date().getHours();
  let greeting = '';
  
  if (hour < 12) greeting = 'Good Morning, Scientist!';
  else if (hour < 18) greeting = 'Good Afternoon, Researcher!';
  else greeting = 'Good Evening, Stargazer!';
  
  greetingEl.textContent = greeting;
}

function initializeDailyTrigger() {
  const questionEl = document.getElementById('dailyQuestion');
  const newBtn = document.getElementById('newTriggerBtn');
  
  if (!questionEl || !newBtn) return;
  
  // Load from localStorage or use random
  let todayTrigger = localStorage.getItem('dailyTrigger');
  const lastUpdate = localStorage.getItem('dailyTriggerDate');
  const today = new Date().toDateString();
  
  if (!todayTrigger || lastUpdate !== today) {
    // New day, new trigger
    const randomIndex = Math.floor(Math.random() * dailyTriggers.length);
    todayTrigger = dailyTriggers[randomIndex];
    localStorage.setItem('dailyTrigger', todayTrigger);
    localStorage.setItem('dailyTriggerDate', today);
  }
  
  questionEl.textContent = todayTrigger;
  
  newBtn.addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * dailyTriggers.length);
    const newTrigger = dailyTriggers[randomIndex];
    questionEl.textContent = newTrigger;
    // Don't save to localStorage - manual override just for today
  });
}

function updateStats() {
  const historyCount = document.getElementById('historyCount');
  const inventionCount = document.getElementById('inventionCount');
  const questionCount = document.getElementById('questionCount');
  const notebookCount = document.getElementById('notebookCount');
  
  if (historyCount) historyCount.textContent = scienceHistory.length;
  if (inventionCount) inventionCount.textContent = inventions.length;
  if (questionCount) questionCount.textContent = brainTriggers.length;
  
  // Get notebook entries count from localStorage
  if (notebookCount) {
    const entries = JSON.parse(localStorage.getItem('notebookEntries') || '[]');
    notebookCount.textContent = entries.length;
  }
}

function highlightCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}
