// DOM Elements
const statusBadge = document.getElementById('status-badge');
const memoryUsage = document.getElementById('memory-usage');
const collectionsCount = document.getElementById('collections-count');
const uptime = document.getElementById('uptime');
const logOutput = document.getElementById('log-output');
const refreshBtn = document.getElementById('refresh-btn');

// API Endpoints
const API_BASE = '/api';
const ENDPOINTS = {
    status: `${API_BASE}/status`,
    metrics: `${API_BASE}/metrics`,
    logs: `${API_BASE}/logs`
};

// State
let startTime = Date.now();
let isRefreshing = false;

// Utility Functions
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

function updateStatus(status) {
    const statusText = status ? 'Running' : 'Stopped';
    const statusColor = status ? 'bg-green-500' : 'bg-red-500';
    
    statusBadge.className = `px-3 py-1 rounded-full text-sm font-semibold ${statusColor} text-white`;
    statusBadge.innerHTML = `
        <i class="fas fa-circle text-xs mr-1"></i>
        ${statusText}
    `;
}

function appendLog(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${level}`;
    logEntry.textContent = `[${timestamp}] ${message}`;
    
    logOutput.appendChild(logEntry);
    logOutput.scrollTop = logOutput.scrollHeight;
}

// API Functions
async function fetchMetrics() {
    try {
        const response = await fetch(ENDPOINTS.metrics);
        if (!response.ok) throw new Error('Failed to fetch metrics');
        
        const data = await response.json();
        
        memoryUsage.textContent = formatBytes(data.memory_usage);
        collectionsCount.textContent = data.collections_count;
        uptime.textContent = formatUptime(Date.now() - startTime);
        
        updateStatus(true);
    } catch (error) {
        console.error('Error fetching metrics:', error);
        updateStatus(false);
        appendLog(`Error fetching metrics: ${error.message}`, 'error');
    }
}

async function fetchLogs() {
    try {
        const response = await fetch(ENDPOINTS.logs);
        if (!response.ok) throw new Error('Failed to fetch logs');
        
        const logs = await response.json();
        logOutput.innerHTML = ''; // Clear existing logs
        
        logs.forEach(log => {
            appendLog(log.message, log.level);
        });
    } catch (error) {
        console.error('Error fetching logs:', error);
        appendLog(`Error fetching logs: ${error.message}`, 'error');
    }
}

// Event Handlers
async function handleRefresh() {
    if (isRefreshing) return;
    
    isRefreshing = true;
    refreshBtn.innerHTML = '<i class="fas fa-sync-alt refresh-spin mr-2"></i>Refreshing...';
    
    try {
        await Promise.all([
            fetchMetrics(),
            fetchLogs()
        ]);
    } finally {
        isRefreshing = false;
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt mr-2"></i>Refresh';
    }
}

// Initialize
function init() {
    // Initial fetch
    handleRefresh();
    
    // Set up refresh button
    refreshBtn.addEventListener('click', handleRefresh);
    
    // Set up periodic refresh (every 30 seconds)
    setInterval(handleRefresh, 30000);
    
    // Set up periodic uptime update (every second)
    setInterval(() => {
        uptime.textContent = formatUptime(Date.now() - startTime);
    }, 1000);
}

// Start the application
init();
