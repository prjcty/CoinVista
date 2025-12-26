// Initialize app data
let appData = {
  balance: 3.0,
  invested: 0,
  profit: 0,
  lastClaimDate: null,
  claimsRemaining: 5,
  deposits: [],
  investments: [],
  isLoggedIn: false,
  userEmail: null,
}

// Load data from localStorage
function loadData() {
  const user = localStorage.getItem("coinvistaUser")
  if (!user) {
    document.getElementById("loginModal").classList.add("modal-active")
    return
  }

  const stored = localStorage.getItem("coinvistaData")
  if (stored) {
    appData = { ...appData, ...JSON.parse(stored) }
  }
  appData.isLoggedIn = true
  updateUI()
}

// Save data to localStorage
function saveData() {
  localStorage.setItem("coinvistaData", JSON.stringify(appData))
}

// Update UI displays
function updateUI() {
  document.getElementById("balanceDisplay").textContent = `$${appData.balance.toFixed(2)}`
  document.getElementById("investedDisplay").textContent = `$${appData.invested.toFixed(2)}`
  document.getElementById("profitDisplay").textContent = `$${appData.profit.toFixed(2)}`
  document.getElementById("availableBalance").textContent = `$${appData.balance.toFixed(2)}`
  document.getElementById("daysRemaining").textContent = appData.claimsRemaining

  updateClaimButton()
  renderPlans()
}

// Investment Plans Data
const investmentPlans = [
  {
    id: 1,
    name: "Starter Plan",
    price: 10,
    dailyIncome: 0.1,
    duration: 100,
    icon: "💰",
  },
  {
    id: 2,
    name: "Silver Plan",
    price: 50,
    dailyIncome: 0.6,
    duration: 100,
    icon: "🥈",
  },
  {
    id: 3,
    name: "Gold Plan",
    price: 100,
    dailyIncome: 1.5,
    duration: 100,
    icon: "🥇",
  },
  {
    id: 4,
    name: "Platinum Plan",
    price: 500,
    dailyIncome: 10.0,
    duration: 100,
    icon: "💎",
  },
]

// Render investment plans
function renderPlans() {
  const grid = document.getElementById("plansGrid")
  grid.innerHTML = ""

  investmentPlans.forEach((plan) => {
    const userInvestment = appData.investments.find((inv) => inv.planId === plan.id)
    const planEl = document.createElement("div")
    planEl.className = "plan-card"

    if (userInvestment) {
      // If user has purchased this plan, show countdown
      const endDate = new Date(userInvestment.startDate)
      endDate.setDate(endDate.getDate() + plan.duration)

      planEl.innerHTML = `
        <div class="plan-name">${plan.icon} ${plan.name}</div>
        <div class="plan-price">$${plan.price}</div>
        <div class="plan-daily">Daily Return: $${plan.dailyIncome.toFixed(2)}</div>
        <div class="plan-duration">
          <div class="countdown" id="countdown-${plan.id}"></div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 100%"></div>
          </div>
        </div>
        <button class="btn btn-invest btn-invested" disabled>Invested</button>
      `
      grid.appendChild(planEl)
      updateCountdown(plan.id, endDate)
    } else {
      // If user hasn't purchased, don't show countdown
      planEl.innerHTML = `
        <div class="plan-name">${plan.icon} ${plan.name}</div>
        <div class="plan-price">$${plan.price}</div>
        <div class="plan-daily">Daily Return: $${plan.dailyIncome.toFixed(2)}</div>
        <div class="plan-duration">
          <p style="color: #888; font-size: 14px;">Invest to see countdown</p>
        </div>
        <button class="btn btn-invest" onclick="investPlan(${plan.id})">
          Invest Now
        </button>
      `
      grid.appendChild(planEl)
    }
  })
}

// Update countdown timer
function updateCountdown(planId, endDate) {
  const updateTime = () => {
    const now = new Date()
    const diff = endDate - now

    if (diff <= 0) {
      document.getElementById(`countdown-${planId}`).textContent = "Expired"
      return
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    const formatted = `${String(days).padStart(2, "0")}.${String(hours).padStart(2, "0")}.${String(minutes).padStart(2, "0")}.${String(seconds).padStart(2, "0")}`
    const countdownEl = document.getElementById(`countdown-${planId}`)
    if (countdownEl) {
      countdownEl.textContent = formatted
    }
  }

  updateTime()
  setInterval(updateTime, 1000)
}

// Invest in plan
function investPlan(planId) {
  const plan = investmentPlans.find((p) => p.id === planId)

  if (appData.balance < plan.price) {
    alert("Insufficient balance! Minimum deposit required: " + plan.price + " USDT")
    return
  }

  appData.balance -= plan.price
  appData.invested += plan.price
  appData.investments.push({
    planId,
    amount: plan.price,
    dailyIncome: plan.dailyIncome,
    startDate: new Date().toISOString(),
    daysRemaining: plan.duration,
  })

  saveData()
  updateUI()
  alert(`Successfully invested $${plan.price} in ${plan.name}!`)
}

// Daily claim
function claimDaily() {
  const btn = document.getElementById("claimBtn")
  const now = new Date().toDateString()

  if (appData.lastClaimDate === now) {
    showClaimMessage("Already claimed today!", "error")
    return
  }

  if (appData.claimsRemaining <= 0) {
    showClaimMessage("No claims remaining!", "error")
    return
  }

  appData.balance += 0.2
  appData.profit += 0.2
  appData.claimsRemaining -= 1
  appData.lastClaimDate = now

  saveData()
  updateUI()
  showClaimMessage("Claimed $0.20 USDT!", "success")
}

function updateClaimButton() {
  const btn = document.getElementById("claimBtn")
  const now = new Date().toDateString()

  if (appData.lastClaimDate === now || appData.claimsRemaining <= 0) {
    btn.disabled = true
    btn.textContent = appData.claimsRemaining > 0 ? "Claimed Today" : "No Claims Left"
  } else {
    btn.disabled = false
    btn.textContent = "Claim Today"
  }
}

function showClaimMessage(msg, type) {
  const msgEl = document.getElementById("claimMessage")
  msgEl.textContent = msg
  msgEl.className = "claim-message " + type
  setTimeout(() => {
    msgEl.className = "claim-message"
  }, 3000)
}

// Copy wallet address
function copyWallet() {
  const wallet = "TPebgMwRreHYtjTYSApny8mxGbyk3p9Rfu"
  navigator.clipboard.writeText(wallet).then(() => {
    alert("Wallet address copied!")
  })
}

// Submit deposit
function submitDeposit(e) {
  e.preventDefault()

  const amount = Number.parseFloat(document.getElementById("depositAmount").value)
  const proof = document.getElementById("depositProof").files[0]
  const note = document.getElementById("depositNote").value

  if (amount < 7) {
    showMessage("depositMessage", "Minimum deposit is 7 USDT", "error")
    return
  }

  if (!proof) {
    showMessage("depositMessage", "Please upload proof image", "error")
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const deposit = {
      id: Date.now(),
      amount,
      proof: e.target.result,
      note,
      date: new Date().toISOString(),
      status: "pending",
    }

    appData.deposits.push(deposit)
    saveData()

    document.getElementById("depositAmount").value = ""
    document.getElementById("depositProof").value = ""
    document.getElementById("depositNote").value = ""
    document.getElementById("imagePreview").innerHTML = ""

    showMessage("depositMessage", "Deposit proof submitted! Pending admin approval.", "success")
  }
  reader.readAsDataURL(proof)
}

function submitWithdraw(e) {
  e.preventDefault()

  const amount = Number.parseFloat(document.getElementById("withdrawAmount").value)
  const wallet = document.getElementById("walletAddressWithdraw").value

  if (amount < 5) {
    showMessage("withdrawMessage", "Minimum withdrawal is 5 USDT", "error")
    return
  }

  if (amount > appData.balance) {
    showMessage("withdrawMessage", "Insufficient balance", "error")
    return
  }

  appData.balance -= amount
  saveData()
  updateUI()

  document.getElementById("withdrawAmount").value = ""
  document.getElementById("walletAddressWithdraw").value = ""

  showMessage("withdrawMessage", "Withdrawal request submitted! Processing in 24-48 hours.", "success")
}

function showMessage(elementId, msg, type) {
  const msgEl = document.getElementById(elementId)
  msgEl.textContent = msg
  msgEl.className = "message " + type
  setTimeout(() => {
    msgEl.className = "message"
  }, 3000)
}

// Image preview
document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("depositProof")
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const preview = document.getElementById("imagePreview")
          preview.innerHTML = `<img src="${event.target.result}" alt="Deposit proof">`
        }
        reader.readAsDataURL(file)
      }
    })
  }

  loadData()
})

function handleLogin(event) {
  event.preventDefault()
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  if (email && password.length >= 6) {
    appData.isLoggedIn = true
    appData.userEmail = email
    localStorage.setItem("coinvistaUser", JSON.stringify({ email, password }))
    closeLoginModal()
    loadData()
  } else {
    showLoginMessage("Invalid email or password (min 6 chars)", "error")
  }
}

function handleSignup(event) {
  event.preventDefault()
  const name = document.getElementById("signupName").value
  const email = document.getElementById("signupEmail").value
  const password = document.getElementById("signupPassword").value

  if (name && email && password.length >= 6) {
    appData.isLoggedIn = true
    appData.userEmail = email
    localStorage.setItem("coinvistaUser", JSON.stringify({ name, email, password }))
    closeLoginModal()
    loadData()
  } else {
    showSignupMessage("Please fill all fields (password min 6 chars)", "error")
  }
}

function toggleSignup(event) {
  event.preventDefault()
  document.getElementById("loginForm").style.display =
    document.getElementById("loginForm").style.display === "none" ? "block" : "none"
  document.getElementById("signupForm").style.display =
    document.getElementById("signupForm").style.display === "none" ? "block" : "none"
}

function closeLoginModal() {
  document.getElementById("loginModal").classList.remove("modal-active")
}

function handleLogout(event) {
  event.preventDefault()
  appData.isLoggedIn = false
  localStorage.removeItem("coinvistaUser")
  localStorage.removeItem("coinvistaData")
  document.getElementById("loginModal").classList.add("modal-active")
  document.getElementById("loginForm").style.display = "block"
  document.getElementById("signupForm").style.display = "none"
}

function showLoginMessage(msg, type) {
  const msgEl = document.getElementById("loginMessage")
  msgEl.textContent = msg
  msgEl.className = "message " + type
}

function showSignupMessage(msg, type) {
  const msgEl = document.getElementById("signupMessage")
  msgEl.textContent = msg
  msgEl.className = "message " + type
}
