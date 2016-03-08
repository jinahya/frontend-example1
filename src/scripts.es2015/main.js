var calculateMonthlyPayment = function (principal, years, rate) {
    let monthlyRate;
    if (rate) {
        monthlyRate = rate / 100 / 12;
    }
    let monthlyPayment = principal * monthlyRate /
            (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
    return {principal, years, rate, monthlyPayment, monthlyRate};
};



