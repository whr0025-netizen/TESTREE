let provider = window.solana;
let walletAddress = null;
let connection = new solana.Web3.Connection(solana.clusterApiUrl('mainnet-beta'), 'confirmed');

// Check if Phantom is installed
if (!provider || !provider.isPhantom) {
    alert('Please install Phantom Wallet extension to use this app!');
}

async function connectWallet() {
    try {
        // Request wallet connection
        const response = await provider.connect();
        walletAddress = response.publicKey.toString();
        document.getElementById('walletAddress').textContent = walletAddress;

        // Update UI: Show wallet info
        document.getElementById('walletInfo').classList.remove('hidden');
        document.getElementById('connectButton').classList.add('hidden');
        
        // Fetch and display wallet balance and percent return
        fetchWalletBalance();
        fetchPercentReturn();
    } catch (err) {
        console.error("Wallet connection failed", err);
    }
}

async function fetchWalletBalance() {
    try {
        const balance = await connection.getBalance(new solana.Web3.PublicKey(walletAddress));
        const solBalance = balance / solana.Web3.LAMPORTS_PER_SOL; // Convert lamports to SOL
        document.getElementById('walletBalance').textContent = `${solBalance.toFixed(2)} SOL`;
    } catch (err) {
        console.error("Failed to fetch wallet balance", err);
    }
}

function fetchPercentReturn() {
    // Simulating a simple calculation of percent return on an investment
    const initialInvestment = 100; // Example: initial investment in USD
    const currentValue = 150; // Example: current portfolio value in USD
    const percentReturn = ((currentValue - initialInvestment) / initialInvestment) * 100;
    
    document.getElementById('percentReturn').textContent = `${percentReturn.toFixed(2)}%`;
}
