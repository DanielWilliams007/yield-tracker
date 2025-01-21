# Yield Tracker

Track DeFi yields across multiple protocols

## Features
- Real-time APY monitoring
- Historical data tracking
- Multiple protocol support (Aave, Compound, Curve)
- RESTful API
- Data persistence

## Quick Start
```bash
npm install
cp .env.example .env
npm start
```

## API Endpoints
- GET /health - Health check
- GET /data/:protocol - Get latest protocol data
- GET /protocols - List supported protocols