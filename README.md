# 📊 K6 Performance Testing with InfluxDB & Grafana

This guide helps you set up K6 for performance testing with results stored in InfluxDB and visualized using Grafana.

---

## 🚀 Prerequisites

- Docker & Docker Compose installed
- K6 installed ([Install Guide](https://k6.io/docs/getting-started/installation/))
- PowerShell, CMD, or Bash terminal

---

## 📁 Setup Instructions

### 1️⃣ Create Required Files

- Create a `docker-compose.yml` file in your project directory.
- Create your K6 test script file (e.g., `advance-script.js`).

---

## ⚙️ Step 1: Start Docker Services

Run the following command to spin up InfluxDB and Grafana:

```bash
docker compose up -d
```

Verify the containers are running:

```bash
docker ps
```


## ✏️ Step 2: Run K6 Test and Send Output to InfluxDB
```bash
$env:K6_OUT = "influxdb=http://localhost:8086/k6"
k6 run advance-script.js
```

## 📊 Step 3: Configure Grafana Dashboard

🔐 Access Grafana
URL: http://localhost:3000

Login:

    Username: admin

    Password: admin


⚙️ Add InfluxDB as a Data Source
Click ⚙️ (Settings) → Data Sources

Click “Add data source”

Choose InfluxDB

Set:

    Name: k6

    URL: http://influxdb:8086

    Database: k6

    Query Language: InfluxQL

    Leave User/Password empty

Click Save & Test    


## 📈 Import K6 Dashboard
Click + → Import

Enter Dashboard ID: 2587

Click Load

Select the k6 data source

Click Import


## ✅ Done!
Now when you run a K6 test, you can see results live in Grafana under your K6 dashboard.

## 🧼 Clean Up

Stop and remove containers:

```bash
docker compose down
```

## Flip Coin Implementation

### 1. Edit Dashboard
    Click + → Dashboard

    Click Add new visualization

### 2. Choose Visualization Type

From the right panel, select Gauge (or Stat if preferred)

### 3. Select Data Source

Set the data source to InfluxDB


### 4. Edit Query (Click the ✏️ pencil icon) Paste the following queries:

Query A – Total Bets

```bash
SELECT sum("value") FROM "http_reqs" WHERE $timeFilter
```
💡 Set alias to: Total Bets

Query B – Total Wins

```bash
SELECT sum("value") FROM "coin_wins" WHERE $timeFilter
```
💡 Set alias: Total Wins

Query C – Total Losses

```bash
SELECT sum("value") FROM "coin_losses" WHERE $timeFilter
```
💡 Set alias: Total Losses

### 5. (Optional) 🎨 Customize the Panel

Title: Flip Coin Results

Adjust thresholds, colors, and max value if using a gauge.

### 6. ✅ Save the Dashboard


Run your K6 flip coin script:

```bash
$env:K6_OUT = "influxdb=http://localhost:8086/k6"
k6 run flip-coin-test.js
```


