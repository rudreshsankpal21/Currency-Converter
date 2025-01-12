feather.replace();

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertButton = document.getElementById("convert-btn");
const result = document.getElementById("result");
const baseCurrency = document.getElementById("base-currency");
const getRatesBtn = document.getElementById("get-rates-btn");
const exchangeRates = document.getElementById("exchange-rates");
const convertMode = document.getElementById("convert-mode");
const exchangeMode = document.getElementById("exchange-mode");
const toggleBtns = document.querySelectorAll('.toggle-btn');
const APIKEY = "58c479b2c804fa2dd2c7096f";


// toggles between convert and exchange rates
toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        toggleBtns.forEach((btn) => {
            btn.classList.remove("active");
        });
        btn.classList.add("active");
        const mode = btn.getAttribute("data-mode");
        if (mode == "convert") {
            convertMode.style.display = "flex"
            exchangeMode.style.display = "none";

        } else {
            exchangeMode.style.display = "block";
            convertMode.style.display = "none";
        }
    })
})


// Actual API Request for converting currency
Button.addEventListener("click", () => {
    const amount = amountInput.value;
    const fromCurr = fromCurrency.value;
    const toCurr = toCurrency.value;
    fetch(`https://v6.exchangerate-api.com/v6/${APIKEY}/pair/${fromCurr}/${toCurr}`).then(
        (res) => {
            return res.json();
        }
    ).then(
        (data) => {
            const rate = data.conversion_rate;
            const convertedAmount = (amount * rate).toFixed(2); 
            result.innerHTML = `
            <h3>
                ${convertedAmount} ${toCurr}
            </h3>
            `
        }
    ).catch(
        (err) => {
            console.log(err);

        }
    )

})


// API Request for getting Exchange rates
getRatesBtn.addEventListener("click",()=>{
    const baseCurr = baseCurrency.value;
    fetch(`https://v6.exchangerate-api.com/v6/${APIKEY}/latest/${baseCurr}`).then(
        (res)=>{
            return res.json();
        }
    ).then(
        (data)=>{
            let ratesHTML = "<h3>Exchange rates<h3><ul>"
            for(const [currency,rate]of Object.entries(data.conversion_rates)){
                if (currency !== rate) {
                    ratesHTML += `<li><span>${currency}:</span>${rate.toFixed(
                        4
                    )}</li>`
                }
            }
            ratesHTML += '<ul>'
            exchangeRates.innerHTML = ratesHTML;
        }
    ).catch();
})