// StockTrader.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';
import NavBar from '../components/NavBar';
import Background from '../components/Background';

const STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corp.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc.' }
];

const LAST_PRICES = {
  'AAPL': 173.50,
  'MSFT': 332.20,
  'GOOGL': 141.80,
  'AMZN': 127.90,
  'META': 485.60
};

// Stock Analysis Panel Component
const StockAnalysisPanel = ({ indicators, darkMode }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`p-6 rounded-xl ${
      darkMode ? 'bg-gray-800/50' : 'bg-white/50'
    } backdrop-blur-sm shadow-lg transition-all duration-300`}
  >
    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center`}>
      Technical Analysis
    </div>
    {indicators && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-2"
      >
        <div className="flex items-center justify-center space-x-2">
          {indicators.direction === 'up' ? (
            <TrendingUp className="text-green-500" />
          ) : indicators.direction === 'down' ? (
            <TrendingDown className="text-red-500" />
          ) : (
            <span>⟷</span>
          )}
          <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {(indicators.confidence * 100).toFixed(0)}% confident
          </span>
        </div>
        
        {/* RSI Indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-center mt-1 space-x-2">
            <div className={`text-xs px-2 py-1 rounded ${
              Number(indicators.rsi) > 70 
                ? 'bg-red-500/20 text-red-500' 
                : Number(indicators.rsi) < 30 
                  ? 'bg-green-500/20 text-green-500'
                  : darkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-200/50 text-gray-600'
            }`}>
              RSI: {indicators.rsi} 
              ({Number(indicators.rsi) > 70 
                ? 'Overbought' 
                : Number(indicators.rsi) < 30 
                  ? 'Oversold' 
                  : 'Neutral'})
            </div>
          </div>
        </div>

        {/* SMA Indicators */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className={`text-xs p-2 rounded ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'
          }`}>
            <div className="text-center">SMA5</div>
            <div className={`font-bold ${
              Number(indicators.sma5) > Number(indicators.sma20)
                ? 'text-green-500'
                : 'text-red-500'
            }`}>
              {indicators.sma5}
            </div>
          </div>
          <div className={`text-xs p-2 rounded ${
            darkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'
          }`}>
            <div className="text-center">SMA20</div>
            <div className="font-bold">{indicators.sma20}</div>
          </div>
        </div>

        {/* Trend Indicator */}
        <div className="mt-4 text-xs text-center">
          <span className={`inline-block px-2 py-1 rounded ${
            Number(indicators.sma5) > Number(indicators.sma20)
              ? 'bg-green-500/20 text-green-500'
              : 'bg-red-500/20 text-red-500'
          }`}>
            {Number(indicators.sma5) > Number(indicators.sma20)
              ? 'Bullish Trend'
              : 'Bearish Trend'}
          </span>
        </div>
      </motion.div>
    )}
  </motion.div>
);

// Price Chart Component
const PriceChart = ({ data, darkMode }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    className={`p-6 rounded-2xl backdrop-blur-sm ${
      darkMode ? 'bg-gray-800/50' : 'bg-white/50'
    } shadow-xl mt-8`}
  >
    <div className="h-[700px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={darkMode ? '#374151' : '#e5e7eb'} 
          />
          <XAxis 
            dataKey="timestamp" 
            tick={{ fill: darkMode ? 'white' : 'black' }}
          />
          <YAxis 
            domain={['auto', 'auto']} 
            tick={{ fill: darkMode ? 'white' : 'black' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#1f2937' : 'white',
              color: darkMode ? 'white' : 'black',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          />
          <Legend 
            wrapperStyle={{
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)'
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={darkMode ? '#3b82f6' : '#2563eb'}
            strokeWidth={2}
            dot={false}
            name="Price"
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

const StockTrader = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedStock, setSelectedStock] = useState(STOCKS[0]);
  const [stockData, setStockData] = useState({});
  const [lastUpdate, setLastUpdate] = useState(null);

  // Technical analysis functions
  const calculateSMA = (data, period) => {
    if (!data || data.length < period) return null;
    const prices = data.slice(-period);
    return prices.reduce((sum, item) => sum + item.price, 0) / period;
  };

  const calculateRSI = (data, period = 14) => {
    if (!data || data.length < period + 1) return null;
    let gains = 0, losses = 0;
    for (let i = data.length - period; i < data.length; i++) {
      const difference = data[i].price - data[i - 1].price;
      if (difference >= 0) gains += difference;
      else losses -= difference;
    }
    const avgGain = gains / period;
    const avgLoss = losses / period;
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  };

  const fetchStockData = async (symbol) => {
    const basePrice = LAST_PRICES[symbol];
    const variation = (Math.random() - 0.5) * 2;
    const newPrice = basePrice + variation;
    
    setStockData(prev => {
      const existingData = prev[symbol] || [];
      const newDataPoint = {
        timestamp: new Date().toLocaleTimeString(),
        price: newPrice,
        volume: Math.floor(Math.random() * 10000)
      };
      return {
        ...prev,
        [symbol]: [...(existingData.slice(-30)), newDataPoint]
      };
    });
    
    setLastUpdate(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      STOCKS.forEach(stock => fetchStockData(stock.symbol));
    }, 1000);
    STOCKS.forEach(stock => fetchStockData(stock.symbol));
    return () => clearInterval(interval);
  }, []);

  const calculateIndicators = (data) => {
    if (!data || data.length === 0) return null;
    const sma20 = calculateSMA(data, 20);
    const sma5 = calculateSMA(data, 5);
    const rsi = calculateRSI(data);
    
    let direction = 'neutral';
    let confidence = 0.5;

    if (sma5 && sma20 && rsi) {
      const trendStrength = (sma5 - sma20) / sma20;
      const isOverbought = rsi > 70;
      const isOversold = rsi < 30;

      if (trendStrength > 0.001 && !isOverbought) {
        direction = 'up';
        confidence = Math.min(0.9, 0.5 + Math.abs(trendStrength) * 50);
      } else if (trendStrength < -0.001 && !isOversold) {
        direction = 'down';
        confidence = Math.min(0.9, 0.5 + Math.abs(trendStrength) * 50);
      }

      if (isOverbought && direction === 'up') confidence *= 0.5;
      if (isOversold && direction === 'down') confidence *= 0.5;
    }

    return {
      direction,
      confidence,
      rsi: rsi?.toFixed(2) || 'N/A',
      sma5: sma5?.toFixed(2) || 'N/A',
      sma20: sma20?.toFixed(2) || 'N/A'
    };
  };

  const selectedStockData = stockData[selectedStock.symbol] || [];
  const currentPrice = selectedStockData[selectedStockData.length - 1]?.price;
  const previousPrice = selectedStockData[selectedStockData.length - 2]?.price;
  const priceChange = currentPrice && previousPrice ? currentPrice - previousPrice : 0;
  const indicators = calculateIndicators(selectedStockData);

  return (
    <div className="min-h-screen transition-colors duration-500">
      <Background darkMode={darkMode} />
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="pt-20 px-4 max-w-7xl mx-auto">
        {/* Stock Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {STOCKS.map((stock, index) => (
            <motion.button
              key={stock.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 12
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedStock(stock)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedStock.symbol === stock.symbol
                  ? (darkMode 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                      : 'bg-blue-500 text-white shadow-lg shadow-blue-500/20')
                  : (darkMode 
                      ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50' 
                      : 'bg-white/50 text-gray-800 hover:bg-gray-50/50')
              } backdrop-blur-sm hover:shadow-lg`}
            >
              {stock.symbol}
            </motion.button>
          ))}
        </motion.div>

        {/* Header Section */}
        <motion.div
          layout
          className="text-center mb-6"
        >
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {selectedStock.name} ({selectedStock.symbol})
          </motion.h2>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            Last Update: {lastUpdate}
            <RefreshCcw className="inline ml-2 h-4 w-4 animate-spin" />
          </motion.span>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Current Price Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/50'
            } backdrop-blur-sm shadow-lg transition-all duration-300`}
          >
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center`}>
              Current Price
            </div>
            <div className={`text-3xl font-bold mt-2 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ${currentPrice?.toFixed(2)}
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-sm ml-2 ${
                  priceChange > 0 ? 'text-green-500' : priceChange < 0 ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                ({priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)})
              </motion.span>
            </div>
          </motion.div>

          {/* Technical Analysis Card */}
          <StockAnalysisPanel 
            indicators={indicators} 
            darkMode={darkMode} 
          />

          {/* Volume Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/50'
            } backdrop-blur-sm shadow-lg transition-all duration-300`}
          >
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center`}>
              Volume
            </div>
            <div className={`text-2xl font-bold mt-2 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {selectedStockData[selectedStockData.length - 1]?.volume.toLocaleString()}
            </div>
          </motion.div>
        </div>

        {/* Price Chart */}
        <PriceChart 
          data={selectedStockData}
          darkMode={darkMode}
        />
      </main>
    </div>
  );
};

export default StockTrader;